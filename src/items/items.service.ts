import { CreateItemDto, CreateTagDto, UpdateItemDto } from './dto/index';
import { EntityManager, Repository } from 'typeorm';
import { Item, Listing, Tag } from './entities';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(data: CreateItemDto) {
    const listing = new Listing({ ...data.listing });

    const tags = data.tags.map((tag: CreateTagDto) => new Tag(tag));

    const item = new Item({ ...data, comments: [], listing, tags });

    await this.entityManager.save(item);
  }

  async findOne(itemId: number) {
    return this.itemsRepository.findOne({
      where: { id: itemId },
      relations: { listing: true, tags: true, comments: true },
    });
  }

  async findItems(filters: any) {
    const queryBuilder = this.itemsRepository.createQueryBuilder('item');

    if (filters.listingId) {
      queryBuilder.andWhere('item.listingId = :listingId', {
        listingId: filters.listingId,
      });
    }

    if (filters.tagId) {
      queryBuilder.andWhere('item.tagsId = :tagId', {
        tagId: filters.tagId,
      });
    }

    if (filters.isPublic !== undefined) {
      queryBuilder.andWhere('item.isPublic = :isPublic', {
        isPublic: filters.isPublic,
      });
    }

    if (filters.itemName) {
      queryBuilder.andWhere('item.name LIKE :itemName', {
        name: `%${filters.itemName.trim()}%`,
      });
    }

    if (filters.sortBy && filters.sortOrder) {
      queryBuilder.orderBy(
        `item.${filters.sortBy}`,
        filters.sortOrder.toUpperCase(),
      );
    }

    const { page = 1, limit = 10 } = filters;
    queryBuilder.skip((page - 1) * limit).take(limit);

    return queryBuilder.getMany();
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}

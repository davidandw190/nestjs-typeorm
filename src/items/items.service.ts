import { CreateItemDto, CreateTagDto, UpdateItemDto } from './dto/index';
import { Item, Listing, Tag } from './entities';

import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemsService {
  constructor(private readonly entityManager: EntityManager) {}

  async create(data: CreateItemDto) {
    const listing = new Listing({ ...data.listing });

    const tags = data.tags.map((tag: CreateTagDto) => new Tag(tag));

    const item = new Item({ ...data, comments: [], listing, tags });

    await this.entityManager.save(item);
  }

  findAll() {
    return `This action returns all items`;
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}

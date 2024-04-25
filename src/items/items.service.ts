import { CreateItemDto, CreateTagDto, UpdateItemDto } from './dto/index';
import { EntityManager, Repository, SelectQueryBuilder } from 'typeorm';
import { Item, Listing, Tag } from './entities';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DEFAULT_ITEM_FILTERS,
  ItemFilters,
} from './interfaces/item-filter.interface';

/**
 * Service responsible for handling item-related operations.
 */
@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    private readonly entityManager: EntityManager,
  ) {}

  /**
   * Creates a new item.
   * @param data The data to create the item.
   */
  async create(data: CreateItemDto) {
    const listing = new Listing({ ...data.listing });

    const tags = data.tags.map((tag: CreateTagDto) => new Tag(tag));

    const item = new Item({ ...data, comments: [], listing, tags });

    await this.entityManager.save(item);
  }

  /**
   * Finds a single item by ID.
   * @param itemId The ID of the item to find.
   * @returns The found item.
   */
  async findOne(itemId: number) {
    return this.itemsRepository.findOne({
      where: { id: itemId },
      relations: { listing: true, tags: true, comments: true },
    });
  }
  /**
   * Finds items based on specified filters.
   * @param filters Filters to apply to the query (optional, defaults to DEFAULT_ITEM_FILTERS).
   * @returns The list of found items.
   */
  async findItems(filters: ItemFilters = DEFAULT_ITEM_FILTERS) {
    try {
      const queryBuilder = this.itemsRepository.createQueryBuilder('item');

      this.applyFilters(queryBuilder, filters);
      this.applySorting(queryBuilder, filters);
      this.applyPagination(queryBuilder, filters);

      return await queryBuilder.getMany();
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }

  /**
   * Applies the specified filters to the query builder.
   * @param queryBuilder The query builder to apply the filters to.
   * @param filters The filters to apply.
   */
  private applyFilters(
    queryBuilder: SelectQueryBuilder<Item>,
    filters: ItemFilters,
  ) {
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
  }

  /**
   * Applies the specified sorting and pagination to the query builder.
   * @param queryBuilder The query builder to apply the sorting and pagination to.
   * @param filters The filters to apply.
   */
  private applySorting(
    queryBuilder: SelectQueryBuilder<Item>,
    filters: ItemFilters,
  ) {
    if (filters.sortBy && filters.sortOrder) {
      const sortOrder = ['ASC', 'DESC'].includes(
        filters.sortOrder.toUpperCase() as any,
      )
        ? (filters.sortOrder.toUpperCase() as 'ASC' | 'DESC')
        : (DEFAULT_ITEM_FILTERS.sortOrder as 'ASC' | 'DESC');

      queryBuilder.orderBy(`item.${filters.sortBy}`, sortOrder);
    }
  }

  /**
   * Applies pagination to the query builder.
   * @param queryBuilder The query builder to apply pagination to.
   * @param filters The filters containing pagination options.
   */
  private applyPagination(
    queryBuilder: SelectQueryBuilder<Item>,
    filters: ItemFilters,
  ) {
    const { page = 1, limit = 10 } = filters;
    queryBuilder.skip((page - 1) * limit).take(limit);
  }
}

import { CreateItemDto, UpdateItemDto } from './dto/index';

import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(private readonly entityManager: EntityManager) {}

  async create(data: CreateItemDto) {
    const newItem = new Item(data);
    await this.entityManager.save(newItem);
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

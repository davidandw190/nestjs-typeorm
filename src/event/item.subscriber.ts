import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

import { Item } from 'src/items/entities';
import { Logger } from '@nestjs/common';

@EventSubscriber()
export class ItemSubscriber implements EntitySubscriberInterface<Item> {
  private readonly logger = new Logger(ItemSubscriber.name);

  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Item;
  }

  beforeInsert(event: InsertEvent<Item>): void | Promise<any> {
    this.logger.debug(`BEFORE ITEM INSERTED: ${event.entity}`);
  }

  afterInsert(event: InsertEvent<Item>): void | Promise<any> {
    this.logger.debug(`AFTER ITEM INSERTED: ${event.entity}`);
  }
}

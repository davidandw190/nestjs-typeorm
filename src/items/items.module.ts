import { Comment, Item, Listing, Tag } from './entities/index';

import { ItemSubscriber } from 'src/event/item.subscriber';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Listing, Comment, Tag])],
  controllers: [ItemsController],
  providers: [ItemsService, ItemSubscriber],
})
export class ItemsModule {}

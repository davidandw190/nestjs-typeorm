import { Item } from './entities/item.entity';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { Listing } from './entities/listing.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Listing])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}

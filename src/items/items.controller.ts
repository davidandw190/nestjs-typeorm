import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto, UpdateItemDto } from './dto/index';
import { ItemFilters } from './interfaces/item-filter.interface';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') itemId: string) {
    return this.itemsService.findOne(+itemId);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findItems(@Query() filters: ItemFilters) {
    return this.itemsService.findItems(filters);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }
}

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
  async update(@Param('id') itemId: string, @Body() data: UpdateItemDto) {
    return this.itemsService.updateItemDetails(+itemId, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }
}

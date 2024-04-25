import { CreateCommentDto, CreateItemDto } from './index';

import { PartialType } from '@nestjs/mapped-types';

export class UpdateItemDto extends PartialType(CreateItemDto) {
  comments: CreateCommentDto[];
}

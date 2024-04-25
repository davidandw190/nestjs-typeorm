import { CreateListingDto, CreateTagDto } from '.';

export class CreateItemDto {
  name: string;
  isPublic: boolean;
  listing: CreateListingDto;
  tags: CreateTagDto[];
}

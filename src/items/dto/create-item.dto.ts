import { CreateTagDto } from '.';
import { UpdateListingDto } from './update-listing.dto';

export class CreateItemDto {
  name: string;
  isPublic: boolean;
  listing: UpdateListingDto;
  tags: CreateTagDto[];
}

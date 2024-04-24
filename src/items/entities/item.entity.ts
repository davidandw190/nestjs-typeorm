import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'items' })
export class Item {
  @PrimaryGeneratedColumn('identity', { name: 'item_id' })
  itemId: number;

  @Column({ name: 'name', type: 'varchar', length: 50 })
  name: string;

  @Column({ name: 'is_public', type: 'boolean', default: true })
  isPublic: boolean;

  constructor(item: Partial<Item>) {
    Object.assign(this, item);
  }
}

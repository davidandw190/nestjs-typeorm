import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { AbstractEntity } from 'src/database/abstract.entity';
import { Listing } from './listing.entity';

@Entity({ name: 'items' })
export class Item extends AbstractEntity<Item> {
  @Column({ name: 'name', type: 'varchar', length: 50 })
  name: string;

  @Column({ name: 'is_public', type: 'boolean', default: true })
  isPublic: boolean;

  @OneToOne(() => Listing, { cascade: true })
  @JoinColumn()
  listing: Listing;
}

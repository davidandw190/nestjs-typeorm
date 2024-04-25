import { Column, Entity } from 'typeorm';

import { AbstractEntity } from 'src/database/abstract.entity';

@Entity({ name: 'listings' })
export class Listing extends AbstractEntity<Listing> {
  @Column({ name: 'description', type: 'text', nullable: false })
  description: string;

  @Column({ name: 'stock', type: 'integer', default: 0 })
  stock: number;

  @Column({ name: 'rating', type: 'integer', default: 0 })
  rating: number;
}

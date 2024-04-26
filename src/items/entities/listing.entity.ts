import { Column, Entity } from 'typeorm';

import { AbstractEntity } from 'src/database/abstract.entity';

@Entity({ name: 'listings' })
export class Listing extends AbstractEntity<Listing> {
  @Column({ name: 'description', type: 'text', nullable: false })
  description: string;

  @Column({ name: 'price', type: 'float', nullable: false })
  price: number;

  @Column({ name: 'stock', type: 'integer', default: 0 })
  stock: number;

  @Column({ name: 'rating', type: 'float', default: 0.0 })
  rating: number;
}

import { Column, Entity } from 'typeorm';

import { AbstractEntity } from 'src/database/abstract.entity';

@Entity({ name: 'listings' })
export class Listing extends AbstractEntity<Listing> {
  @Column()
  description: string;

  @Column({ name: 'rating', type: 'integer', default: 0 })
  rating: number;
}

import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Comment, Listing, Tag } from './index';

import { AbstractEntity } from 'src/database/abstract.entity';

@Entity({ name: 'items' })
export class Item extends AbstractEntity<Item> {
  @Column({ name: 'name', type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ name: 'is_public', type: 'boolean', default: true })
  isPublic: boolean;

  @OneToOne(() => Listing, { cascade: true })
  @JoinColumn()
  @Column({ nullable: false })
  listing: Listing;

  @OneToMany(() => Comment, (comment) => comment.item, { cascade: true })
  comments: Comment[];

  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable({ name: 'item_tags' })
  tags: Tag[];
}

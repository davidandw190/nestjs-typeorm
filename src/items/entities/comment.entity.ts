import { Column, Entity, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../database/abstract.entity';
import { Item } from './item.entity';

@Entity({ name: 'comments' })
export class Comment extends AbstractEntity<Comment> {
  @Column({ name: 'content', type: 'text', nullable: false })
  content: string;

  @ManyToOne(() => Item, (item) => item.comments, { onDelete: 'CASCADE' })
  item: Item;
}

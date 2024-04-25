import { Column, Entity, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../database/abstract.entity';
import { Item } from './index';

@Entity({ name: 'comments' })
export class Comment extends AbstractEntity<Comment> {
  @Column({ name: 'content', type: 'text', nullable: false })
  content: string;

  @Column({ name: 'num_likes', type: 'int', default: 0 })
  numLikes: number;

  @ManyToOne(() => Item, (item) => item.comments, { onDelete: 'CASCADE' })
  item: Item;
}

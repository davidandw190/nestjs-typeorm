import { Column, Entity } from 'typeorm';

import { AbstractEntity } from 'src/database/abstract.entity';

@Entity({ name: 'tags' })
export class Tag extends AbstractEntity<Tag> {
  @Column({ name: 'content', type: 'varchar', length: 20, nullable: false })
  content: string;
}

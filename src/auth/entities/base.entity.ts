import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { v4 } from 'uuid';

@Entity()
export class BaseEntity {
  @BeforeInsert()
  addId() {
    this.id = v4();
  }
  @PrimaryColumn('uuid', { name: 'id' })
  @ApiProperty({ description: 'unique identifier' })
  id: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({ description: 'When created' })
  createdAt: Date;
}

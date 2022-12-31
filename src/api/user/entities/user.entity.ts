import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../../../auth/entities/base.entity';

@Entity('user', { schema: 'em_u' })
export class User extends BaseEntity {
  @PrimaryColumn()
  @ApiProperty()
  username: string;
  @Column()
  @ApiProperty()
  firstname: string;
  @Column()
  @ApiProperty()
  lastname: string;
  @Column()
  @ApiProperty()
  email: string;
  @Column()
  @ApiProperty()
  password: string;
}

import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardStatus } from './board-status.enum';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  // 중간에 DB connect 에러가 났던 이유 = db에 이미 존재하는 데이터가 있는데 Nullable로 생성이 되어 다음 값들도 null이 아니여야된다
  @Column()
  status: BoardStatus;
}

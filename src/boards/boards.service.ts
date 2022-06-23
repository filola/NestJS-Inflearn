import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository) private boardRepository: BoardRepository,
  ) {}

  async getBoardById(id: any): Promise<Board> {
    const found = await this.boardRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }
  // getAllBoards(): Array<Board> {
  //   return this.boards;
  // }
  // getBoardById(Id: string) {
  //   const found = this.boards.find((board) => board.id === Id);
  //   if (!found) {
  //     throw new NotFoundException(`Can't find board with id ${Id}`);
  //   }
  //   return found;
  // }

  async createBoard(CreateBoardDto: CreateBoardDto) {
    const { title, description } = CreateBoardDto;

    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.boardRepository.save(board);
    return board;
  }
  // createBoard(CreateBoardDto: CreateBoardDto) {
  //   const { title, description } = CreateBoardDto;
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(board);
  //   return board;
  // }
  // updateBoardStatus(id: string, status: BoardStatus) {
  //   const Board = this.getBoardById(id);
  //   Board.status = status;
  //   return Board;
  // }
  // deleteBoard(id: string) {
  //   const found = this.getBoardById(id);
  //   this.boards.filter((board) => board.id === found.id);
  // }
}

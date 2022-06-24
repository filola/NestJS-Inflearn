import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { isRegExp } from 'util/types';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository) private boardRepository: BoardRepository,
  ) {}

  async getBoardById(id: number): Promise<Board> {
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
      title: title,
      description: description,
      // status: BoardStatus.PUBLIC,
    });

    console.log(board);

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

  async updateBoardStatus(id: number, status: BoardStatus): Promise<void> {
    const board = await this.getBoardById(id);

    board.status = status;

    await this.boardRepository.save(board);
  }
  // updateBoardStatus(id: string, status: BoardStatus) {
  //   const Board = this.getBoardById(id);
  //   Board.status = status;
  //   return Board;
  // }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);
    console.log(result);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    console.log('result', result);
  }
  // deleteBoard(id: string) {
  //   const found = this.getBoardById(id);
  //   this.boards.filter((board) => board.id === found.id);
  // }
}

import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Array<Board> {
    return this.boards;
  }

  getBoardById(Id: string) {
    return this.boards.find((board) => board.id === Id);
  }

  createBoard(CreateBoardDto: CreateBoardDto) {
    const { title, description } = CreateBoardDto;
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);

    return board;
  }

  updateBoardStatus(id: string, status: BoardStatus) {
    const Board = this.getBoardById(id);
    Board.status = status;
    return Board;
  }

  deleteBoard(id: string) {
    this.boards.filter((board) => board.id === id);
  }
}

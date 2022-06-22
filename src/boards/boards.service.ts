import { Injectable, NotFoundException } from '@nestjs/common';
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
    const found = this.boards.find((board) => board.id === Id);

    if (!found) {
      throw new NotFoundException(`Can't find board with id ${Id}`);
    }

    return found;
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
    const found = this.getBoardById(id);
    this.boards.filter((board) => board.id === found.id);
  }
}

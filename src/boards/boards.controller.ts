import { Controller, Get } from '@nestjs/common';
import { Board } from './boards.model';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private boardServicer: BoardsService) {}

  @Get()
  getAllBoard(): Array<Board> {
    return this.boardServicer.getAllBoards();
  }
}

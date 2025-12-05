import { CreateBiosecurityLogDto } from '../../dto/create-biosecurity-log.dto';

export class CreateBiosecurityLogCommand {
  constructor(
    public readonly createBiosecurityLogDto: CreateBiosecurityLogDto,
  ) { }
}

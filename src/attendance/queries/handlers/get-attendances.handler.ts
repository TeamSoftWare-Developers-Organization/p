import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetAttendancesQuery } from '../impl/get-attendances.query';
import { Attendance } from '../../../Core Models/Attendance';

@QueryHandler(GetAttendancesQuery)
export class GetAttendancesHandler
  implements IQueryHandler<GetAttendancesQuery> {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
  ) { }

  async execute(query: GetAttendancesQuery) {
    return this.attendanceRepository.find({
      relations: ['Employee'],
    });
  }
}

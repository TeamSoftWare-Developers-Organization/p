import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetAttendanceQuery } from '../impl/get-attendance.query';
import { Attendance } from '../../../Core Models/Attendance';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetAttendanceQuery)
export class GetAttendanceHandler implements IQueryHandler<GetAttendanceQuery> {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
  ) { }

  async execute(query: GetAttendanceQuery) {
    const attendance = await this.attendanceRepository.findOne({
      where: { AttendanceID: query.id },
      relations: ['Employee'],
    });

    if (!attendance) {
      throw new NotFoundException(`Attendance with ID ${query.id} not found`);
    }

    return attendance;
  }
}

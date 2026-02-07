import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemSetting } from 'src/Core Models/SystemSetting';
import { GetSystemSettingsQuery } from '../impl/get-system-settings.query';

@QueryHandler(GetSystemSettingsQuery)
export class GetSystemSettingsHandler implements IQueryHandler<GetSystemSettingsQuery> {
    constructor(
        @InjectRepository(SystemSetting)
        private readonly settingsRepository: Repository<SystemSetting>,
    ) { }

    async execute(query: GetSystemSettingsQuery): Promise<SystemSetting[]> {
        return this.settingsRepository.find();
    }
}

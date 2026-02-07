import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemSetting } from 'src/Core Models/SystemSetting';
import { GetSystemSettingByKeyQuery } from '../impl/get-system-setting-by-key.query';

@QueryHandler(GetSystemSettingByKeyQuery)
export class GetSystemSettingByKeyHandler implements IQueryHandler<GetSystemSettingByKeyQuery> {
    constructor(
        @InjectRepository(SystemSetting)
        private readonly settingsRepository: Repository<SystemSetting>,
    ) { }

    async execute(query: GetSystemSettingByKeyQuery): Promise<SystemSetting | null> {
        return this.settingsRepository.findOneBy({ Key: query.key });
    }
}

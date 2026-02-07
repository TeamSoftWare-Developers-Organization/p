import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { SystemSetting } from 'src/Core Models/SystemSetting';
import { SystemSettingController } from './system-setting.controller';
import { GetSystemSettingsHandler } from './queries/handlers/get-system-settings.handler';
import { GetSystemSettingByKeyHandler } from './queries/handlers/get-system-setting-by-key.handler';
import { SetSystemSettingHandler } from './commands/handlers/set-system-setting.handler';

const QueryHandlers = [GetSystemSettingsHandler, GetSystemSettingByKeyHandler];
const CommandHandlers = [SetSystemSettingHandler];

@Module({
    imports: [TypeOrmModule.forFeature([SystemSetting]), CqrsModule],
    controllers: [SystemSettingController],
    providers: [...QueryHandlers, ...CommandHandlers],
})
export class SystemSettingModule { }

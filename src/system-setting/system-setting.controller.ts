import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetSystemSettingsQuery } from './queries/impl/get-system-settings.query';
import { GetSystemSettingByKeyQuery } from './queries/impl/get-system-setting-by-key.query';
import { SetSystemSettingCommand } from './commands/impl/set-system-setting.command';
import { SetSystemSettingDto } from './dto/set-system-setting.dto';

@Controller('system-settings')
export class SystemSettingController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Get()
    findAll() {
        return this.queryBus.execute(new GetSystemSettingsQuery());
    }

    @Get(':key')
    findByKey(@Param('key') key: string) {
        return this.queryBus.execute(new GetSystemSettingByKeyQuery(key));
    }

    @Post()
    setSetting(@Body() setSystemSettingDto: SetSystemSettingDto) {
        return this.commandBus.execute(new SetSystemSettingCommand(setSystemSettingDto));
    }
}

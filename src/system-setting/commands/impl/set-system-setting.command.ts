import { SetSystemSettingDto } from '../../dto/set-system-setting.dto';

export class SetSystemSettingCommand {
    constructor(public readonly setSystemSettingDto: SetSystemSettingDto) { }
}

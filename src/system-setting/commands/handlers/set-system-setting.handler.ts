import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemSetting } from 'src/Core Models/SystemSetting';
import { SetSystemSettingCommand } from '../impl/set-system-setting.command';

@CommandHandler(SetSystemSettingCommand)
export class SetSystemSettingHandler implements ICommandHandler<SetSystemSettingCommand> {
    constructor(
        @InjectRepository(SystemSetting)
        private readonly settingsRepository: Repository<SystemSetting>,
    ) { }

    async execute(command: SetSystemSettingCommand): Promise<SystemSetting> {
        const { key, value, description } = command.setSystemSettingDto;
        let setting = await this.settingsRepository.findOneBy({ Key: key });

        if (!setting) {
            setting = this.settingsRepository.create({ Key: key, Value: value, Description: description });
        } else {
            setting.Value = value;
            if (description) {
                setting.Description = description;
            }
        }

        return this.settingsRepository.save(setting);
    }
}

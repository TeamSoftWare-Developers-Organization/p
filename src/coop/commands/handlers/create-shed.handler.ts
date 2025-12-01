import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShedCommand } from '../impl/create-shed.command';
import { Shed } from 'src/Core Models/Shed';

@CommandHandler(CreateShedCommand)
export class CreateShedHandler implements ICommandHandler<CreateShedCommand> {
    constructor(
        @InjectRepository(Shed)
        private readonly shedRepository: Repository<Shed>,
    ) { }

    async execute(command: CreateShedCommand): Promise<Shed> {
        const { dto } = command;
        const shed = this.shedRepository.create(dto);
        return this.shedRepository.save(shed);
    }
}

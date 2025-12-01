import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateShedCommand } from '../impl/create-shed.command';
import { Shed } from 'src/Core Models/Shed';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateShedCommand)
export class UpdateShedHandler implements ICommandHandler<UpdateShedCommand> {
    constructor(
        @InjectRepository(Shed)
        private readonly shedRepository: Repository<Shed>,
    ) { }

    async execute(command: UpdateShedCommand): Promise<Shed> {
        const { id, dto } = command;
        const shed = await this.shedRepository.findOne({ where: { id } });
        if (!shed) {
            throw new NotFoundException(`Shed with ID ${id} not found`);
        }

        Object.assign(shed, dto);
        return this.shedRepository.save(shed);
    }
}

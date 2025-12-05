// في ملف: src/mortality/handlers/mortality.handlers.ts
import { CommandHandler, ICommandHandler, QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMortalityCommand, UpdateMortalityCommand, DeleteMortalityCommand } from '../commands/mortality.commands';
import { GetMortalityByIdQuery, GetAllMortalitesQuery } from '../queries/mortality.queries';
import { Mortality } from 'src/Core Models/Mortality';

// Command Handlers
@CommandHandler(CreateMortalityCommand)
export class CreateMortalityHandler implements ICommandHandler<CreateMortalityCommand> {
  constructor(@InjectRepository(Mortality) private readonly mortalityRepository: Repository<Mortality>) { }

  async execute(command: CreateMortalityCommand): Promise<Mortality> {
    const newMortality = this.mortalityRepository.create(command.createMortalityDto);
    return this.mortalityRepository.save(newMortality);
  }
}

@CommandHandler(UpdateMortalityCommand)
export class UpdateMortalityHandler implements ICommandHandler<UpdateMortalityCommand> {
  constructor(@InjectRepository(Mortality) private readonly mortalityRepository: Repository<Mortality>) { }

  async execute(command: UpdateMortalityCommand): Promise<Mortality> {
    const id = command.id;
    await this.mortalityRepository.update(id, command.updateMortalityDto);
    const updatedMortality = await this.mortalityRepository.findOne({ where: { MortalityID: id } });
    if (!updatedMortality) {
      throw new Error(`Mortality with ID ${id} not found after update.`);
    }
    return updatedMortality;
  }
}

@CommandHandler(DeleteMortalityCommand)
export class DeleteMortalityHandler implements ICommandHandler<DeleteMortalityCommand> {
  constructor(@InjectRepository(Mortality) private readonly mortalityRepository: Repository<Mortality>) { }

  async execute(command: DeleteMortalityCommand): Promise<void> {
    await this.mortalityRepository.delete(command.id);
  }
}

// Query Handlers
@QueryHandler(GetMortalityByIdQuery)
export class GetMortalityHandler implements IQueryHandler<GetMortalityByIdQuery> {
  constructor(@InjectRepository(Mortality) private readonly mortalityRepository: Repository<Mortality>) { }

  async execute(query: GetMortalityByIdQuery): Promise<Mortality | null> {
    return this.mortalityRepository.findOne({ where: { MortalityID: query.id } });
  }
}

@QueryHandler(GetAllMortalitesQuery)
export class GetAllMortalitiesHandler implements IQueryHandler<GetAllMortalitesQuery> {
  constructor(@InjectRepository(Mortality) private readonly mortalityRepository: Repository<Mortality>) { }

  async execute(query: GetAllMortalitesQuery): Promise<Mortality[]> {
    return this.mortalityRepository.find();
  }
}

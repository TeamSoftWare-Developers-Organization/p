import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetJournalEntriesQuery } from '../impl/get-journal-entries.query';
import { JournalEntry } from 'src/Core Models/JournalEntry';

@QueryHandler(GetJournalEntriesQuery)
export class GetJournalEntriesHandler implements IQueryHandler<GetJournalEntriesQuery> {
    constructor(
        @InjectRepository(JournalEntry)
        private readonly repository: Repository<JournalEntry>,
    ) { }

    async execute(query: GetJournalEntriesQuery): Promise<JournalEntry[]> {
        return this.repository.find({ relations: ['details'] });
    }
}

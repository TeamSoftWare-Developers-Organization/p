import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExpenseCommand } from '../Impi/CreateExpenseCommand';
import { Expense } from 'src/Core Models/Expense';

@CommandHandler(CreateExpenseCommand)
export class CreateExpenseHandler
  implements ICommandHandler<CreateExpenseCommand> {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
  ) { }

  async execute(command: CreateExpenseCommand): Promise<Expense> {
    const { createExpenseDto } = command;
    const expense = this.expenseRepository.create({
      EmployeeID: createExpenseDto.EmployeeID,
      ExpenseDate: createExpenseDto.ExpenseDate,
      Amount: createExpenseDto.Amount,
      Description: createExpenseDto.Description,
    });
    return this.expenseRepository.save(expense);
  }

}

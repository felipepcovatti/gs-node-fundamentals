import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeAndOutcome = this.transactions.reduce(
      (acc, el) => {
        acc[el.type] += el.value;
        return acc;
      },
      {
        income: 0,
        outcome: 0,
      },
    );

    return {
      ...incomeAndOutcome,
      total: incomeAndOutcome.income - incomeAndOutcome.outcome,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;

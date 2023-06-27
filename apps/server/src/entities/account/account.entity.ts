enum AccountType {
  WALLET = 'WALLET',
  CARD = 'CARD',
}

export class Account {
  #name: string;
  #description: string | null;
  #balance: number;
  #type: AccountType;
  #userId: number;
  #currencyId: number;

  constructor(
    name: string,
    description: string | null,
    balance: number,
    type: AccountType,
    userId: number,
    currencyId: number,
  ) {
    this.#name = name;
    this.#description = description;
    this.#balance = balance;
    this.#type = type;
    this.#userId = userId;
    this.#currencyId = currencyId;
  }

  get name(): string {
    return this.#name;
  }

  get description(): string | null {
    return this.#description;
  }

  get balance(): number {
    return this.#balance;
  }

  get type(): AccountType {
    return this.#type;
  }

  get userId(): number {
    return this.#userId;
  }

  get currencyId(): number {
    return this.#currencyId;
  }
}

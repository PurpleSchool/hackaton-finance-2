export class Category {
  #name: string;
  #limit: number;
  #userId: number;

  constructor(name: string, limit: number, userId: number) {
    this.#name = name;
    this.#limit = limit;
    this.#userId = userId;
  }

  get name(): string {
    return this.#name;
  }

  get limit(): number {
    return this.#limit;
  }

  get userId(): number {
    return this.#userId;
  }
}

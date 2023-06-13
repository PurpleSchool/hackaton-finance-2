import { hash, compare } from 'bcryptjs';

export class User {
  #password: string;
  #email: string;
  #name: string;

  constructor(email: string, name: string) {
    this.#email = email;
    this.#name = name;
  }

  get email(): string {
    return this.#email;
  }

  get name(): string {
    return this.#name;
  }

  get password(): string {
    return this.#password;
  }

  comparePasswords(pass: string, hash: string): Promise<boolean> {
    return compare(pass, hash);
  }

  async hashPassword(password: string, salt: number): Promise<void> {
    this.#password = await hash(password, salt);
  }
}

import { v4 as uuid } from 'uuid';

export class Uuid {
  readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  static random(): Uuid {
    return new Uuid(uuid());
  }
 

  toString(): string {
    return this.value;
  }
}

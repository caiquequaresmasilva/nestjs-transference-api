import { randomUUID } from 'crypto';

export abstract class BaseEntity<T> {
  protected _id: string;
  protected props: T;
  constructor(props: T, id?: string) {
    this._id = id ?? randomUUID();
    this.props = { ...props };
  }

  public get id(): string {
    return this._id;
  }
}

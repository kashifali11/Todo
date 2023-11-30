export interface IEntity {
  id: string;
  updatedAt?: Date;
  createdAt?: Date;
}
export abstract class BaseEntity {
  public id: string;
  public updatedAt: Date;
  public createdAt: Date;

  constructor({ id, updatedAt, createdAt }: IEntity) {
    this.id = id;
    const now = new Date();
    this.createdAt = createdAt || now;
    this.updatedAt = updatedAt || now;
  }
}

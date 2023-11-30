export interface IEntity {
  id: string;
}
export abstract class BaseEntity {
  public id: string;

  constructor({ id }: IEntity) {
    this.id = id;
  }
}

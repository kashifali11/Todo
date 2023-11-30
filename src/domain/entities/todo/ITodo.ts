import { IEntity } from "../base-entity";

export interface ITodo extends IEntity {
  title: string;
  description: string;
}

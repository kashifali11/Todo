import { injectable, singleton } from "tsyringe";

@injectable()
@singleton()
export class Database {
  private data: any = {};
  model: string;
  constructor(model: string) {
    this.model = model;
  }

  createRecord(item: any) {
    console.log(this.data);
    this.data[this.model] = [...(this.data[this.model] || []), item];
  }

  findRecordById(id: string) {
    return this.data[this.model]?.find((item: any) => item.id === id);
  }
}

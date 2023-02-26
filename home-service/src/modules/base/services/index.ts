import { Document } from "mongoose";
import { IUser } from "../../../models/user.model";
import { IBaseRepository } from "../repository";

export interface IBaseService<T extends Document> {
  create(data: Partial<T>, user?: IUser): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(filter: any): Promise<T[]>;
  updateById(id: string, data: Partial<T>, user?: IUser): Promise<T | null>;
  update(filter: any, data: Partial<T>, user?: IUser): Promise<T | null>;
  deleteById(id: string, hardDelete: boolean, user?: IUser): Promise<T | null>;
  delete(filter: any, user?: IUser): Promise<T | null>;
}

export default class BaseService<T extends Document>
  implements IBaseService<T>
{
  private repository: IBaseRepository<T>;

  constructor(repository: IBaseRepository<T>) {
    this.repository = repository;
  }

  async create(item: Partial<T>): Promise<T> {
    const data = await this.repository.create(item);
    return data;
  }

  async findById(id: string): Promise<T | null> {
    const data = await this.repository.findById(id);
    return data;
  }

  async findAll(filter: any = {}): Promise<T[]> {
    const data = await this.repository.findAll(filter);
    return data;
  }

  async updateById(id: string, item: Partial<T>): Promise<T | null> {
    const data = await this.repository.updateById(id, item);
    return data;
  }

  async update(filter: any = {}, item: Partial<T>): Promise<T | null> {
    const data = await this.repository.update(filter, item);
    return data;
  }

  async deleteById(id: string): Promise<T | null> {
    return await this.repository.deleteById(id);
  }

  async delete(filter: any = {}): Promise<T | null> {
    return await this.repository.delete(filter);
  }
}

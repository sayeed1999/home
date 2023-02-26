import { Model, Document } from "mongoose";
import { catchErrors } from "../../../api/middlewares";

/**
 * This is the generic repository that all repositories will inherit from common CRUD methods!
 */

export interface IBaseRepository<T extends Document> {
  create(data: Partial<T>): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(filter: any): Promise<T[]>;
  updateById(id: string, data: Partial<T>): Promise<T | null>;
  update(filter: any, data: Partial<T>): Promise<T | null>;
  deleteById(id: string): Promise<T | null>;
  delete(filter: any): Promise<T | null>;
}

export default class BaseRepository<T extends Document>
  implements IBaseRepository<T>
{
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(item: Partial<T>): Promise<T> {
    const data = await this.model.create(item);
    return data;
  }

  async findById(id: string, populate: any = undefined): Promise<T | null> {
    let query: any = this.model.findById(id);
    if (populate) query = query.populate(populate);
    const data = await query;
    return data;
  }

  async findAll(
    filter: any = {},
    skip: number = 0,
    limit: number = 10,
    populate: any = undefined,
    sort: any = {
      createdAt: -1,
    }
  ): Promise<T[]> {
    let query: any = this.model.find(filter).skip(skip).limit(limit).sort(sort);
    // .populate() must have a path if used..
    if (populate) query = query.populate(populate);
    const data = await query;
    return data;
  }

  async updateById(id: string, item: Partial<T>): Promise<T | null> {
    const data = await this.model.findByIdAndUpdate(id, item, { new: true });
    return data;
  }

  async update(filter: any = {}, item: Partial<T>): Promise<T | null> {
    const data = await this.model.findOneAndUpdate(filter, item, { new: true });
    return data;
  }

  async deleteById(id: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(id);
  }

  async delete(filter: any = {}): Promise<T | null> {
    return await this.model.findOneAndDelete(filter);
  }
}

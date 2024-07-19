import {
  Model,
  FilterQuery,
  QueryOptions,
  Document,
  ProjectionType,
} from 'mongoose';

export class BaseRepository<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async create(doc): Promise<any> {
    const createdEntity = new this.model(doc);
    return await createdEntity.save();
  }

  async findById(id: string, option?: QueryOptions): Promise<T> {
    return this.model.findById(id, option);
  }

  async findByCondition(
    filter: FilterQuery<T>,
    field?: ProjectionType<T> | null,
    option?: QueryOptions | null,
    populate?: any | null,
  ): Promise<T | null> {
    const query = this.model.findOne(filter, field, option);
    if (populate) {
      query.populate(populate);
    }
    return query.exec();
  }

  async getByCondition(
    filter: FilterQuery<T>,
    field?: ProjectionType<T> | null,
    option?: QueryOptions | null,
    populate?: any | null,
  ): Promise<T[]> {
    const query = this.model.find(filter, field, option);
    if (populate) {
      query.populate(populate);
    }
    return query.exec();
  }

  async findAll(): Promise<T[]> {
    return this.model.find();
  }

  async aggregate(option: any) {
    return this.model.aggregate(option);
  }

  async populate(result: T[], option: any) {
    return await this.model.populate(result, option);
  }

  async deleteOne(id: string) {
    return this.model.deleteOne({ _id: id } as FilterQuery<T>);
  }

  async deleteMany(id: string[]) {
    return this.model.deleteMany({ _id: { $in: id } } as FilterQuery<T>);
  }

  async deleteByCondition(filter) {
    return this.model.deleteMany(filter);
  }

  async findByConditionAndUpdate(filter, update) {
    return this.model.findOneAndUpdate(filter as FilterQuery<T>, update);
  }

  async updateMany(filter, update, option?: any | null) {
    return this.model.updateMany(filter, update, option);
  }

  async findByIdAndUpdate(id, update) {
    return this.model.findByIdAndUpdate(id, update);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Upload } from '../models/upload.model';

@Injectable()
export class UploadService {
  constructor(
    @InjectModel('Image') private readonly uploadModel: Model<Upload>,
  ) {}

  async create(filePath: string): Promise<Upload> {
    const createdUpload = new this.uploadModel({ filePath });
    return await createdUpload.save();
  }

  async findAll(): Promise<Upload[]> {
    return await this.uploadModel.find().exec();
  }
}

import { Schema, Document } from 'mongoose';

const UploadSchema = new Schema(
  { filePath: String },
  { timestamps: true, collection: 'uploads' },
);

export { UploadSchema };

export interface Upload extends Document {
  filePath: string;
}

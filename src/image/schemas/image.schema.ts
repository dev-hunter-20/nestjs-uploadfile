import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Image extends Document {
  @Prop({ required: true })
  imagePath: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);

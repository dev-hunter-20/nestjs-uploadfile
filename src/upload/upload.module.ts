import { Module } from '@nestjs/common';
import { UploadController } from './controllers/upload.controller';
import { UploadService } from './services/upload.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadSchema } from './models/upload.model';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Image', schema: UploadSchema }]),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'images'),
    //   serveRoot: '/images',
    // }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}

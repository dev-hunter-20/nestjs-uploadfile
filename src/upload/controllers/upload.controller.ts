import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../services/upload.service';
import { diskStorage } from 'multer';
import { CreateImageDto } from '../dto/upload.dto';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // @Post()
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   const filePath = file.path;
  //   const uploaded = await this.uploadService.create(filePath);
  //   return { uploaded };
  // }

  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images',
        filename: (req, file, callback) => {
          const uniqueSuffix = uuidv4() + extname(file.originalname);
          callback(null, uniqueSuffix);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const filePath = `images/${file.filename}`;
    const createImageDto = new CreateImageDto();
    createImageDto.filePath = filePath;
    return this.uploadService.create(createImageDto.filePath);
  }

  @Get()
  async findAll() {
    return this.uploadService.findAll();
  }
}

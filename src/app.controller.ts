import {
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import * as Minio from 'minio';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  minio = new Minio.Client({
    endPoint: 'play.min.io',
    port: 9000,
    useSSL: true,
    accessKey: 'Q3AM3UQ867SPQQA43P2F',
    secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG',
  });

  bucket = 'eriion';

  @Post('uploadFile2')
  @UseInterceptors(FilesInterceptor('files'))
  async upload2(@UploadedFiles() files) {
    for (const file of files) {
      await this.minio.putObject(this.bucket, 'File2.html', file.buffer);
    }
  }

  @Get('url1')
  async getUrl1() {
    const url = await this.minio.presignedUrl('GET', this.bucket, 'File1.html');
    console.log(url);
    return url;
  }

  @Get('url2')
  async getUrl2() {
    const url = await this.minio.presignedUrl('GET', this.bucket, 'File2.html');
    console.log(url);
    return url;
  }
}

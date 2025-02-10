import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ParseIntPipe,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { FilesService } from './files.service';
import { UploadFileDto } from './dto/upload-file.dto';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post(':id/upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadFileDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  create(@Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File) {
    return this.filesService.create(id, file.buffer);
  }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
  //   return this.filesService.update(+id, updateFileDto);
  // }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }
}

import { Injectable } from '@nestjs/common';
import { UpdateRecordDto } from 'src/records/dto/update-record.dto';
import { RecordsService } from 'src/records/records.service';

@Injectable()
export class FilesService {
  constructor(private readonly recordsService: RecordsService) {}

  create(recordId: number, fileBuffer: Buffer) {
    const recordToUpdate: UpdateRecordDto = new UpdateRecordDto();
    const base64: string = fileBuffer.toString('base64');
    recordToUpdate.image = base64;

    return this.recordsService.update(recordId, recordToUpdate);
  }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  // update(id: number, updateFileDto: UpdateFileDto) {
  //   return `This action updates a #${id} file`;
  // }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}

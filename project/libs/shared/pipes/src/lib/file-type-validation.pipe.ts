import 'multer';
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FileTypeValidationPipe implements PipeTransform {
  constructor(private readonly allowedExtensions: string[]) {}

  async transform(value: Express.Multer.File) {
    const { originalname } = value;

    // Extract file extension from the original name
    const fileExtension = originalname.split('.').pop().toLowerCase();

    // Validate the file extension
    if (!this.allowedExtensions.includes(fileExtension)) {
      const allowedExtensionsStr = this.allowedExtensions.join(', ');
      throw new BadRequestException(
        `The file should have one of the following extensions: ${allowedExtensionsStr}`
      );
    }

    return value;
  }
}

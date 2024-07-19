import { PartialType } from '@nestjs/mapped-types';
import { CreatedDto } from './createdUser.dto';

export class UpdatedDto extends PartialType(CreatedDto) {
    email?: string;
    password?: string;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateGrouptripDto } from './create-grouptrip.dto';

export class UpdateGrouptripDto extends PartialType(CreateGrouptripDto) {}

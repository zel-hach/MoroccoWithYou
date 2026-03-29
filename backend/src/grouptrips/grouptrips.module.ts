import { Module } from '@nestjs/common';
import { GrouptripsService } from './grouptrips.service';
import { GrouptripsController } from './grouptrips.controller';

@Module({
  controllers: [GrouptripsController],
  providers: [GrouptripsService],
})
export class GrouptripsModule {}

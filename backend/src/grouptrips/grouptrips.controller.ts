import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GrouptripsService } from './grouptrips.service';
import { CreateGrouptripDto } from './dto/create-grouptrip.dto';
import { UpdateGrouptripDto } from './dto/update-grouptrip.dto';

@Controller('grouptrips')
export class GrouptripsController {
  constructor(private readonly grouptripsService: GrouptripsService) {}

  @Post()
  create(@Body() createGrouptripDto: CreateGrouptripDto) {
    return this.grouptripsService.create(createGrouptripDto);
  }

  @Get()
  findAll() {
    return this.grouptripsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.grouptripsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGrouptripDto: UpdateGrouptripDto) {
    return this.grouptripsService.update(+id, updateGrouptripDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.grouptripsService.remove(+id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateGrouptripDto } from './dto/create-grouptrip.dto';
import { UpdateGrouptripDto } from './dto/update-grouptrip.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GrouptripsService {
  constructor(private prisma: PrismaService) {}
  create(createGrouptripDto: CreateGrouptripDto) {
    return this.prisma.groupTrip.create({data:createGrouptripDto});
  }

  findAll() {
    return this.prisma.groupTrip.findMany();
  }

  findOne(id: number) {
    return this.prisma.groupTrip.findUnique({where:{id}});
  }

  update(id: number, updateGrouptripDto: UpdateGrouptripDto) {
    return this.prisma.groupTrip.update({where:{id},data:updateGrouptripDto});
  }

  remove(id: number) {
    return this.prisma.groupTrip.delete({where:{id}});
  }
}

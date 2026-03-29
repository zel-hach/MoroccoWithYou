import { Injectable } from '@nestjs/common';
import { CreateItineraryDto } from './dto/create-itinerary.dto';
import { UpdateItineraryDto } from './dto/update-itinerary.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ItinerariesService {
  constructor(private prisma: PrismaService) {}
  create(createItineraryDto: CreateItineraryDto) {
    return this.prisma.itinerary.create({data:createItineraryDto});
  }

  findAll() {
    return this.prisma.itinerary.findMany();
  }

  findOne(id: number) {
    return this.prisma.itinerary.findUnique({where:{id}});
  }

  update(id: number, updateItineraryDto: UpdateItineraryDto) {
    return this.prisma.itinerary.update({where:{id},data:updateItineraryDto});
  }

  remove(id: number) {
    return this.prisma.itinerary.delete({where:{id}});
  }
}

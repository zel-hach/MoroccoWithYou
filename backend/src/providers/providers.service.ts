import { Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProvidersService {
  constructor(private prisma: PrismaService) {}
  create(createProviderDto: CreateProviderDto) {
    return this.prisma.provider.create({data:createProviderDto});
  }

  findAll() {
    return this.prisma.provider.findMany();
  }

  findOne(id: number) {
    return this.prisma.provider.findUnique({where:{id}});
  }

  update(id: number, updateProviderDto: UpdateProviderDto) {
    return this.prisma.provider.update({where:{id},data:updateProviderDto});
  }

  remove(id: number) {
    return this.prisma.provider.delete({where:{id}});
  }
}

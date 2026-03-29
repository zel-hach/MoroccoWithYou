import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateFeedbackDto) {
    return this.prisma.feedback.create({
      data: {
        userId: dto.userId ?? null,
        rating: dto.rating ?? null,
        message: dto.message,
      },
    });
  }

  findAll() {
    return this.prisma.feedback.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { id: true, email: true, name: true } } },
    });
  }
}

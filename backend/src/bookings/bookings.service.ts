import { Injectable } from '@nestjs/common';
import { BookingStatus } from '@prisma/client';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  create(createBookingDto: CreateBookingDto) {
    const {
      userId,
      serviceId,
      status,
      totalPrice,
      commissionTotal,
      paymentIntent,
    } = createBookingDto;

    return this.prisma.booking.create({
      data: {
        userId,
        serviceId,
        status: status ?? BookingStatus.pending,
        totalPrice,
        commissionTotal: commissionTotal ?? 0,
        paymentIntent: paymentIntent ?? `pending_${Date.now()}`,
      },
      include: {
        service: { include: { provider: true } },
      },
    });
  }

  findAll() {
    return this.prisma.booking.findMany({
      include: { service: { include: { provider: true } }, user: true },
    });
  }

  findByUser(userId: number) {
    return this.prisma.booking.findMany({
      where: { userId },
      include: { service: { include: { provider: true } } },
      orderBy: { bookingDate: 'desc' },
    });
  }

  findOne(id: number) {
    return this.prisma.booking.findUnique({
      where: { id },
      include: { service: { include: { provider: true } }, user: true },
    });
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return this.prisma.booking.update({
      where: { id },
      data: updateBookingDto,
      include: { service: { include: { provider: true } } },
    });
  }

  remove(id: number) {
    return this.prisma.booking.delete({ where: { id } });
  }
}

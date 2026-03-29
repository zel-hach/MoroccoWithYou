import { BookingStatus } from '@prisma/client';

export class CreateBookingDto {
  userId: number;
  serviceId: number;
  status?: BookingStatus;
  totalPrice: number;
  commissionTotal?: number;
  paymentIntent?: string;
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProvidersModule } from './providers/providers.module';
import { ServicesModule } from './services/services.module';
import { BookingsModule } from './bookings/bookings.module';
import { ItinerariesModule } from './itineraries/itineraries.module';
import { GrouptripsModule } from './grouptrips/grouptrips.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, ProvidersModule, ServicesModule, BookingsModule, ItinerariesModule, GrouptripsModule, FeedbackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weather } from 'src/entities/weather.entity';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { WeatherResponseInterceptor } from './weather.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([Weather])],
  controllers: [WeatherController],
  providers: [WeatherService, WeatherResponseInterceptor],
})
export class WeatherModule {}

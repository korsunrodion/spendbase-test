import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import ProcessWeatherDto from 'src/dto/process-weather.dto';
import { WeatherService } from './weather.service';
import { Weather } from 'src/entities/weather.entity';
import { WeatherResponseInterceptor } from './weather.interceptor';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Get()
  @UseInterceptors(WeatherResponseInterceptor)
  async getWeather(@Body() data: ProcessWeatherDto): Promise<Weather> {
    const { lat, lon, part } = data;
    const item = await this.weatherService.getWeather(lat, lon, part);
    if (!item) {
      throw new NotFoundException('Info for these params not found');
    }
    return item;
  }

  @Post()
  async processWeather(@Body() data: ProcessWeatherDto): Promise<void> {
    const { lat, lon, part } = data;
    await this.weatherService.processWeather(lat, lon, part);
  }
}

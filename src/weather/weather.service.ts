import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Weather } from 'src/entities/weather.entity';
import { Repository } from 'typeorm';
import { WeatherPart, getExcludeQuery } from './weather.helper';

@Injectable()
export class WeatherService {
  private static API_URL = 'https://api.openweathermap.org/data/3.0/onecall';

  constructor(
    @InjectRepository(Weather)
    private weatherRepository: Repository<Weather>,
  ) {}

  async getWeather(lat: number, lon: number, part: WeatherPart) {
    return await this.weatherRepository.findOne({
      where: {
        lat,
        lon,
        part,
      },
      order: {
        created_at: -1,
      },
    });
  }

  async processWeather(lat: number, lon: number, part: WeatherPart) {
    const entry = await this.weatherRepository.findOne({
      where: {
        lat,
        lon,
        part,
      },
    });

    if (entry) {
      await this.weatherRepository.remove(entry);
    }

    const exclude = getExcludeQuery(part);
    const response = await axios.get(
      `${WeatherService.API_URL}?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${process.env.OPENWEATHER_API_KEY}`,
    );

    const newEntry = this.weatherRepository.create({
      lat,
      lon,
      part,
      data: response.data,
    });

    await this.weatherRepository.save(newEntry);
  }
}

import { WeatherPart } from 'src/weather/weather.helper';

class ProcessWeatherDto {
  lat: number;
  lon: number;
  part: WeatherPart;
}

export default ProcessWeatherDto;

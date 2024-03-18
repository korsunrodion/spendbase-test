export enum WeatherPart {
  CURRENT = 'current',
  HOURLY = 'hourly',
  DAILY = 'daily',
}

export const getExcludeQuery = (part: WeatherPart) => {
  return [...Object.values(WeatherPart), 'minutely']
    .filter((item) => item !== part)
    .join(',');
};

interface IWeatherApiResponseItem {
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  uvi: number;
  wind_speed: number;
}

interface IWeatherApiResponse {
  current?: IWeatherApiResponseItem;
  hourly?: IWeatherApiResponseItem[];
  daily?: IWeatherApiResponseItem[];
}

const formatResponseDataItem = (data: IWeatherApiResponseItem) => {
  return {
    sunrise: data.sunrise,
    sunset: data.sunset,
    temp: data.temp,
    feels_like: data.feels_like,
    pressure: data.pressure,
    humidity: data.humidity,
    uvi: data.uvi,
    wind_speed: data.wind_speed,
  };
};

export const formatResponse = (data: IWeatherApiResponse) => {
  if (data.current) {
    data.current = formatResponseDataItem(data.current);
  }
  if (data.daily) {
    data.daily = data.daily.map((item) => formatResponseDataItem(item));
  }
  if (data.hourly) {
    data.hourly = data.hourly.map((item) => formatResponseDataItem(item));
  }
  return data;
};

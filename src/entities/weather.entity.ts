import { WeatherPart } from 'src/weather/weather.helper';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Weather {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lat: number;

  @Column()
  lon: number;

  @Column({ enum: WeatherPart })
  part: string;

  @Column('jsonb')
  data: object;

  @CreateDateColumn()
  created_at: Date;
}

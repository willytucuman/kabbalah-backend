import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

enum OrderBy {
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

export class PaginationArgs {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page: number = 1;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  perPage: number = 10;

  @IsOptional()
  @IsEnum(OrderBy)
  orderBy?: string = 'createdAt';

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsDate()
  date: Date;

  @IsOptional()
  @IsDate()
  startDate: Date;

  @IsOptional()
  @IsDate()
  endDate: Date;

  get skip(): number {
    return (this.page - 1) * this.perPage;
  }

  get take(): number {
    return this.perPage;
  }
}

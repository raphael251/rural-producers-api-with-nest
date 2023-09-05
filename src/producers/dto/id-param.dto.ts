import { IsOptional, IsUUID } from 'class-validator';

export class IdParamDTO {
  @IsUUID()
  @IsOptional()
  id?: string;
}

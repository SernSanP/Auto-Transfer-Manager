import { IsBoolean, IsString } from "class-validator";

export class CreateSourceSystemDto {
  @IsString()
  source_system_name: string;

  @IsString()
  token: string;
}
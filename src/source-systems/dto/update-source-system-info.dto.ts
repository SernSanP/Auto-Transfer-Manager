import { IsBoolean, IsString } from "class-validator";

export class UpdateSourceSystemInfoDto {
  @IsString()
  token: string;

  @IsBoolean()
  is_disabled: boolean;
}
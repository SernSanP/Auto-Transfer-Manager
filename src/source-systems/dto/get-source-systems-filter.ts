import { IsBoolean, IsString } from "class-validator";

export class GetSourceSystemsFilterDto {
  @IsString()
  token: string;

  @IsBoolean()
  is_disabled: boolean;
}
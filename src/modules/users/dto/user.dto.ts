export class UserDto {
  readonly first_name: string;
  readonly last_name: string;
  readonly password: string;
  readonly email: string;
  readonly role: string;
  readonly is_blocked: boolean;
  readonly created_at: string;
}

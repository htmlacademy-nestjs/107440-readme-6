import { Controller } from '@nestjs/common';

import { AuthenticationService } from './authentication.service';

@Controller('auth')
export class AuthenticationController {
  private readonly authService: AuthenticationService;
}

import { Controller } from '@nestjs/common';
import { MiddlewareService } from './middleware.service';

@Controller('middleware')
export class MiddlewareController {
  constructor(private readonly middlewareService: MiddlewareService) {}
}

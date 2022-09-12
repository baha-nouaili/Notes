import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

import { RequestService } from '../../shared/Auth/request.service';
import { ListParam } from './../dto/listIdParam.dto';
import { AuthorizationService } from '../services/authorization.service';
@Injectable()
export class isAuthorGuard implements CanActivate {
  constructor(
    private requestService: RequestService,
    private authorizationService: AuthorizationService,
  ) {}
  async canActivate(context?: ExecutionContext): Promise<boolean> {
    const requestParam = context.switchToHttp().getRequest<Request>()
      .params as ListParam;
    const listId = requestParam.listId;
    const userId = this.requestService.getUserId();
    return await this.authorizationService.checkIsAuthor(listId, userId);
  }
}

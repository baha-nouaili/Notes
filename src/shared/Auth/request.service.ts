import { Injectable, Scope } from '@nestjs/common';

// Each coming request in the application will get a requestService
// To easily retrieve and set the userID

@Injectable({ scope: Scope.REQUEST })
export class RequestService {
  private userId: string;

  setUserId(userId: string) {
    this.userId = userId;
  }

  getUserId() {
    return this.userId ?? null;
  }
}

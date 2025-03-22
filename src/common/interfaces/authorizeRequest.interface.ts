import { Request } from 'express';
import { ITokenPayload } from 'src/auth/interfaces';

export interface IAuthorizedRequest extends Request {
  readonly user: ITokenPayload;
}
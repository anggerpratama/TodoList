import ExpressValidator from 'express-validator'
import { Request } from 'express';

export interface RequestWithValidators extends ExpressValidator.RequestValidation , Request {}
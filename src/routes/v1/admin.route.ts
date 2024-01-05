import express from 'express';
import { auth } from '../../middlewares';

import { ROLES } from '../../constants';
import { templateRouter } from './template.route';

export const adminRouter = express.Router();

adminRouter.use('/templates',auth(ROLES.ADMIN), templateRouter);
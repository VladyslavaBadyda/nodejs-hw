import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import {
  registerUser,
  loginUser,
  refreshUserSession,
  logoutUser,
  requestResetEmail,
  resetPassword,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../controllers/authController.js';

import {
  registerUserSchema,
  loginUserSchema,
} from '../validations/authValidation.js';

const router = Router();

router.post(
  '/register',
  celebrate({ [Segments.BODY]: registerUserSchema }),
  registerUser,
);

router.post(
  '/login',
  celebrate({ [Segments.BODY]: loginUserSchema }),
  loginUser,
);

router.post('/refresh', refreshUserSession);

router.post('/logout', logoutUser);

export default router;
router.post(
  '/request-reset-email',
  celebrate({
    [Segments.BODY]: requestResetEmailSchema,
  }),
  requestResetEmail,
);

router.post(
  '/reset-password',
  celebrate({
    [Segments.BODY]: resetPasswordSchema,
  }),
  resetPassword,
);

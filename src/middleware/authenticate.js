import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';

export const authenticate = async (req, res, next) => {
  const { accessToken, sessionId } = req.cookies;

  if (!accessToken) {
    next(createHttpError(401, 'Missing access token'));
    return;
  }

  if (!sessionId) {
    next(createHttpError(401, 'Session not found'));
    return;
  }

  const session = await Session.findOne({
    _id: sessionId,
    accessToken,
  });

  if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
  }

  if (session.accessTokenValidUntil < new Date()) {
    next(createHttpError(401, 'Access token expired'));
    return;
  }

  const user = await User.findById(session.userId);

  if (!user) {
    next(createHttpError(401));
    return;
  }

  req.user = user;
  next();
};

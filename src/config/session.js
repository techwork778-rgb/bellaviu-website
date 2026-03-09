import session from 'next-session';
import expressSession from 'express-session';

// Use in-memory session storage
const sessionOptions = {
  secret: 'Bellaviu@rabs.support', // Replace with a strong secret
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: 'auto', // Use secure cookies in production
    maxAge: 10 * 60 * 1000, // 10 minutes
  },
};

export const getSession = session({
  expressSession: expressSession(sessionOptions),
});

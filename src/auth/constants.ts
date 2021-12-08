const { JWTKEY, TOKEN_EXPIRATION } = process.env;

export const jwtConstants = {
  secret: 'holiday',
  expiresIn: '3600s',
};

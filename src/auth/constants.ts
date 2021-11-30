const { JWTKEY, TOKEN_EXPIRATION } = process.env;

export const jwtConstants = {
  secret: 'holiday',
  expiresIn: TOKEN_EXPIRATION,
};

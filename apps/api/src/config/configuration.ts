export default () => ({
  http: {
    host: 'localhost',
    port: parseInt(process.env.PORT) || 3333,
  },
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    databaseName: process.env.DATABASE_NAME || 'basic-auth',
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'example',
  },
  auth: {
    jwt: {
      secret:
        process.env.AUTH_JWT_SECRET ||
        'this is the auth jwt secret that you have to change',
      expiresIn: '1d',
    },
  },
});

const env = {
  appPort: Number(process.env.PORT_DEV),
  dbHost: process.env.DB_SQL_HOST,
  dbUserName: process.env.DB_SQL_USERNAME as string,
  dbPort: Number(process.env.DB_SQL_PORT),
  dbPassword: process.env.DB_SQL_PASSWORD,
  dbDatabaseName: process.env.DB_SQL_DATABASENAME as string,
  dbDialect: process.env.DB_SQL_DIALECT,
  clientAppUrl: process.env.CLIENT_DOMAIN,
};

if (process.env.NODE_ENV === 'test') {
  env.appPort = Number(process.env.PORT_TEST);
  env.dbDatabaseName = process.env.DB_SQL_DATABASENAME_TEST as string;
}

export default env;

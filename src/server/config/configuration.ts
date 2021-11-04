import crypto from 'crypto';

type ConfigType = {
  isProduction: boolean;
  playground: boolean;
  logLevel: string;
  jwtSecret: string;
};

export default (): ConfigType => {
  const isProduction = process.env.NODE_ENV === 'production';

  const jwtSecret = isProduction
    ? crypto.randomBytes(64).toString('hex')
    : '123456789';

  console.log(
    `Getting ${isProduction ? 'production' : 'development'} env variables.`
  );

  const config: ConfigType = {
    isProduction,
    playground: !isProduction,
    logLevel: process.env.LOG_LEVEL,
    jwtSecret,
  };

  if (!isProduction) {
    console.log(config);
  }

  return config;
};

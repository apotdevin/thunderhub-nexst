import crypto from 'crypto';

type SSOConfig = {
  serverUrl: string;
  certPath: string;
  macaroonPath: string;
};

type Throttler = {
  ttl: number;
  limit: number;
};

type ConfigType = {
  isProduction: boolean;
  playground: boolean;
  logLevel: string;
  jwtSecret: string;
  cookiePath: string;
  accountConfigPath: string;
  sso: SSOConfig;
  throttler: Throttler;
};

export default (): ConfigType => {
  const isProduction = process.env.NODE_ENV === 'production';

  const jwtSecret = isProduction
    ? crypto.randomBytes(64).toString('hex')
    : '123456789';

  console.log(
    `Getting ${isProduction ? 'production' : 'development'} env variables.`
  );

  const sso = {
    serverUrl: process.env.SSO_SERVER_URL || '',
    certPath: process.env.SSO_CERT_PATH || '',
    macaroonPath: process.env.SSO_MACAROON_PATH || '',
  };

  const throttler = {
    ttl: Number(process.env.THROTTLE_TTL) || 10,
    limit: Number(process.env.THROTTLE_LIMIT) || 10,
  };

  const config: ConfigType = {
    isProduction,
    playground: !isProduction,
    logLevel: process.env.LOG_LEVEL,
    cookiePath: process.env.COOKIE_PATH || '',
    accountConfigPath: process.env.ACCOUNT_CONFIG_PATH || '',
    throttler,
    sso,
    jwtSecret,
  };

  if (!isProduction) {
    console.log(config);
  }

  return config;
};

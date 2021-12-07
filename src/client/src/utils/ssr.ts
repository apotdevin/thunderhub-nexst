import { NextPageContext } from 'next';
import { parseCookies } from '../utils/cookies';
import getConfig from 'next/config';
import { appConstants } from './appConstants';

const { publicRuntimeConfig } = getConfig();
const { logoutUrl, basePath } = publicRuntimeConfig;

const cookieProps = (
  context: NextPageContext,
  noAuth?: boolean
): {
  theme: string;
  authenticated: boolean;
  hasToken: boolean;
  authToken: string;
} => {
  if (!context?.req)
    return {
      theme: 'dark',
      authenticated: false,
      hasToken: false,
      authToken: '',
    };

  const cookies = parseCookies(context.req);

  const hasToken = !!cookies[appConstants.tokenCookieName];

  if (!cookies[appConstants.cookieName] && !noAuth) {
    context.res?.writeHead(302, { Location: logoutUrl || `${basePath}/login` });
    context.res?.end();

    return { theme: 'dark', authenticated: false, hasToken, authToken: '' };
  }

  return {
    theme: cookies?.theme ? cookies.theme : 'dark',
    authenticated: true,
    hasToken,
    authToken: cookies[appConstants.cookieName] || '',
  };
};

export const getProps = async (context: NextPageContext, noAuth?: boolean) => {
  const { theme, authenticated, hasToken, authToken } = cookieProps(
    context,
    noAuth
  );

  return {
    props: { initialConfig: { theme }, hasToken, authenticated, authToken },
  };
};

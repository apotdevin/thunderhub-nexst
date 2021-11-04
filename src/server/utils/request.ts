import { Ipware } from '@fullerstack/nax-ipware';
const ipware = new Ipware();

export const getIp = (req: any) => {
  const ip_info = ipware.getClientIP(req);
  return ip_info.ip;
};

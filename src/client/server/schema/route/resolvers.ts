import { probeForRoute } from 'ln-service';
import { logger } from '../../../server/helpers/logger';
import { toWithError } from '../../../server/helpers/async';
import {
  LndObject,
  ProbeForRouteType,
} from '../../../server/types/ln-service.types';

type RouteParent = {
  lnd: LndObject;
  destination: string;
  tokens: number;
};

export const routeResolvers = {
  ProbeRoute: {
    route: async (parent: RouteParent) => {
      const { lnd, destination, tokens } = parent;

      if (!lnd) {
        logger.debug('ExpectedLNDToProbeForRoute');
        return null;
      }

      if (!destination) {
        logger.debug('ExpectedDestinationToProbeForRoute');
        return null;
      }

      const [info, error] = await toWithError(
        probeForRoute({ lnd, destination, tokens })
      );

      if (!info || error) {
        logger.debug(
          `Error probing route to destination ${destination} for ${tokens} tokens`
        );
        return null;
      }

      if (!(info as ProbeForRouteType).route) {
        logger.debug(
          `No route found to destination ${destination} for ${tokens} tokens`
        );
        return null;
      }

      const hopsWithNodes =
        (info as ProbeForRouteType).route?.hops.map(h => ({
          ...h,
          node: { lnd, publicKey: h.public_key },
        })) || [];

      return { ...(info as ProbeForRouteType).route, hops: hopsWithNodes };
    },
  },
};

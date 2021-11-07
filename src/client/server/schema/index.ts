import { merge } from 'lodash';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { generalTypes, queryTypes, mutationTypes } from './types';
import { peerTypes } from './peer/types';
import { peerResolvers } from './peer/resolvers';
import { routeResolvers } from './route/resolvers';
import { chainTypes } from './chain/types';
import { chainResolvers } from './chain/resolvers';
import { chatTypes } from './chat/types';
import { chatResolvers } from './chat/resolvers';
import { widgetResolvers } from './widgets/resolvers';
import { widgetTypes } from './widgets/types';
import { invoiceResolvers } from './invoice/resolvers';
import { channelResolvers } from './channel/resolvers';
import { transactionResolvers } from './transactions/resolvers';
import { channelTypes } from './channel/types';
import { invoiceTypes } from './invoice/types';
import { networkTypes } from './network/types';
import { transactionTypes } from './transactions/types';
import { healthResolvers } from './health/resolvers';
import { healthTypes } from './health/types';
import { routeTypes } from './route/types';
import { macaroonResolvers } from './macaroon/resolvers';
import { networkResolvers } from './network/resolvers';
import { bosResolvers } from './bos/resolvers';
import { bosTypes } from './bos/types';
import { lnUrlResolvers } from './lnurl/resolvers';
import { lnUrlTypes } from './lnurl/types';
import { lnMarketsResolvers } from './lnmarkets/resolvers';
import { lnMarketsTypes } from './lnmarkets/types';
import { boltzResolvers } from './boltz/resolvers';
import { boltzTypes } from './boltz/types';
import { forwardsResolver } from './forwards/resolvers';
import { macaroonTypes } from './macaroon/types';
import { ambossTypes } from './amboss/types';
import { ambossResolvers } from './amboss/resolvers';

const typeDefs = [
  generalTypes,
  queryTypes,
  mutationTypes,
  peerTypes,
  chainTypes,
  chatTypes,
  widgetTypes,
  channelTypes,
  invoiceTypes,
  networkTypes,
  transactionTypes,
  healthTypes,
  routeTypes,
  bosTypes,
  lnUrlTypes,
  lnMarketsTypes,
  boltzTypes,
  macaroonTypes,
  ambossTypes,
];

const resolvers = merge(
  peerResolvers,
  routeResolvers,
  chainResolvers,
  chatResolvers,
  widgetResolvers,
  invoiceResolvers,
  channelResolvers,
  transactionResolvers,
  healthResolvers,
  macaroonResolvers,
  networkResolvers,
  bosResolvers,
  lnUrlResolvers,
  lnMarketsResolvers,
  boltzResolvers,
  forwardsResolver,
  ambossResolvers
);

export const schema = makeExecutableSchema({ typeDefs, resolvers });

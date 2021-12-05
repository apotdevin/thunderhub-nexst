import { merge } from 'lodash';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { generalTypes, queryTypes, mutationTypes } from './types';
import { routeResolvers } from './route/resolvers';
import { chatTypes } from './chat/types';
import { chatResolvers } from './chat/resolvers';
import { invoiceResolvers } from './invoice/resolvers';
import { invoiceTypes } from './invoice/types';
import { routeTypes } from './route/types';
import { bosResolvers } from './bos/resolvers';
import { bosTypes } from './bos/types';
import { lnMarketsResolvers } from './lnmarkets/resolvers';
import { lnMarketsTypes } from './lnmarkets/types';
import { boltzResolvers } from './boltz/resolvers';
import { boltzTypes } from './boltz/types';

const typeDefs = [
  generalTypes,
  queryTypes,
  mutationTypes,
  chatTypes,
  invoiceTypes,
  routeTypes,
  bosTypes,
  lnMarketsTypes,
  boltzTypes,
];

const resolvers = merge(
  routeResolvers,
  chatResolvers,
  invoiceResolvers,
  bosResolvers,
  lnMarketsResolvers,
  boltzResolvers
);

export const schema = makeExecutableSchema({ typeDefs, resolvers });

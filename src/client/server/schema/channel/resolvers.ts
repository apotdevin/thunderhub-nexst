import { updateFees } from './resolvers/mutation/updateFees';
import { updateMultipleFees } from './resolvers/mutation/updateMultipleFees';

export const channelResolvers = {
  Mutation: {
    updateFees,
    updateMultipleFees,
  },
};

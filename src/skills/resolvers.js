import { merge } from 'lodash';

import mutations from './mutations';
import queries from './queries';
import subscriptions from './subscriptions';

export default merge(mutations, queries, subscriptions);
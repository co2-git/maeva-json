import count from './actions/count';
import emitter from './emitter';
import findById from './actions/findById';
import findByIds from './actions/findByIds';
import findMany from './actions/findMany';
import findOne from './actions/findOne';
import insertMany from './actions/insertMany';
import insertOne from './actions/insertOne';
import removeById from './actions/removeById';
import removeByIds from './actions/removeByIds';
import removeMany from './actions/removeMany';
import removeOne from './actions/removeOne';
import updateById from './actions/updateById';
import updateByIds from './actions/updateByIds';
import updateOne from './actions/updateOne';
import updateMany from './actions/updateMany';

const maevaJSONConnector = () => ({
  name: 'json',
  actions: {
    connect: () => {
      setTimeout(() => emitter.emit('connected'));
    },
    count,
    findById,
    findByIds,
    findMany,
    findOne,
    insertMany,
    insertOne,
    removeById,
    removeByIds,
    removeMany,
    removeOne,
    updateById,
    updateByIds,
    updateOne,
    updateMany,
  },
  idName: 'id',
  emitter,
});

export default maevaJSONConnector;

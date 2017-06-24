'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';

export default function* (...args) {
  let [source, count] = args;
  if (this !== undefined && this !== null && args.length < 2) {
    count = source;
    source = this;
  }

  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }

  if (count == null || count == undefined) {
    throw new Error('count is null or undefined');
  }
  if (typeof count !== 'number') {
    throw new Error('count must be a number');
  }

  let next = source.next();
  let cnt = 0;
  while (true) {
    yield next.value;
    if (++cnt >= count) {
      break;
    }
    next = source.next();
  }
};

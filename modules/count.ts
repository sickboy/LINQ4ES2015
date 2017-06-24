'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';

export default function (...args) {
  let [source, predicate] = args;
  if (this !== undefined && this !== null && args.length < 2 && (!source || utils.isFunc(source))) {
    predicate = source;
    source = this;
  }

  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }

  if (!utils.isFunc(predicate)) {
    predicate = undefined;
  }

  let count = 0;
  let next = source.next();
  while (!next.done) {
    if (!predicate || predicate(next.value)) {
      count++;
    }
    next = source.next();
  }
  return count;
};

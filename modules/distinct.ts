'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';

export default function* (...args) {
  let [source, comparer] = args;
  if (this !== undefined && this !== null && args.length < 2 && (!source || utils.isFunc(source))) {
      comparer = source;
      source = this;
  }
  
  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }

  if (!utils.isFunc(comparer)) {
    comparer = (a, b) => a == b;
  }

  let next = source.next();
  let result = [];
  while (!next.done) {
    if (utils.safePush(result, next.value, comparer)) {
      yield next.value;
    }
    next = source.next();
  }
};

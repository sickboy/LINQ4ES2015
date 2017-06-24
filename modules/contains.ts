'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';

export default function (...args) {
  let [source, value, comparer] = args;
  if (this !== undefined && this !== null && args.length < 3 && (!value || utils.isFunc(value))) {
    comparer = value;
    value = source;
    source = this;
  }

  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }

  if (!utils.isFunc(comparer)) {
    comparer = (a, b) => a == b;
  }

  let next = source.next();
  while (!next.done) {
    if (comparer(value, next.value)) {
      return true;
    }
    next = source.next();
  }
  return false;
}

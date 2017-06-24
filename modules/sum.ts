'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';

export default function (...args) {
  let [source, selector] = args;
  if (this !== undefined && this !== null && args.length < 2 && (!source || utils.isFunc(source))) {
    selector = source;
    source = this;
  }

  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }

  if (!utils.isFunc(selector)) {
    selector = a => a;
  }

  let sum = 0;
  let next = source.next();
  while (!next.done) {
    sum += selector(next.value);
    next = source.next();
  }
  return sum;
};

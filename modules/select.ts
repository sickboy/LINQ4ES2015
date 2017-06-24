'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';

export default function* (...args) {
  let [source, selector] = args;
  if (this !== undefined && this !== null && args.length < 2) {
    selector = source;
    source = this;
  }

  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }

  if (selector == null || selector == undefined) {
    throw new Error('selector is null or undefined');
  }
  if (!utils.isFunc(selector)) {
    throw new Error('selector must be a function');
  }

  let index = 0;
  let next = source.next();
  while (!next.done) {
    yield selector(next.value, index);
    next = source.next();
    index++;
  }
};

/* global describe, it, expect, spyOn, jasmine */

"use strict";

import linq from "../../src/linq";
import toArray from "../../src/modules/toArray";
import orderBy from "../../src/modules/orderBy";

describe("orderBy", () => {

	let simpleArr = [3, 2, 6, 4];
	let complexArr = [{ FirstName: 'C' }, { FirstName: 'A' }, { FirstName: 'B' }];

	it("must retrn ordered items", () => {
		let orderedItems = simpleArr.asEnumerable().orderBy(num => num).toArray();
		expect(orderedItems.length).toBe(4);
		expect(orderedItems[0]).toBe(2);
		expect(orderedItems[1]).toBe(3);
		expect(orderedItems[2]).toBe(4);
		expect(orderedItems[3]).toBe(6);
	});

	it("must retrn ordered set of complex items", () => {
		let orderedItems = complexArr.asEnumerable().orderBy(item => item.FirstName).toArray();
		expect(orderedItems.length).toBe(3);
		expect(orderedItems[0].FirstName).toBe('A');
		expect(orderedItems[1].FirstName).toBe('B');
		expect(orderedItems[2].FirstName).toBe('C');
	});

	it("must throws an exception when the source is null or undefined", () => {
		expect(() => toArray(orderBy(null, item => item))).toThrowError("source is null or undefined");
		expect(() => toArray(orderBy(undefined, item => item))).toThrowError("source is null or undefined");
	});

	it("must throws an exception when the source is not an enumerable", () => {
		expect(() => toArray(orderBy({}, item => item))).toThrowError("source must be an enumerable");
	});

	it("must throws an exception when the order by column is not a function", () => {
		expect(() => toArray(orderBy([], {}))).toThrowError("order by column must be a function");
	});
});
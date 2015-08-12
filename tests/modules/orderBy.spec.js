/* global describe, it, expect, spyOn, jasmine */

"use strict";

import linq from "../../src/linq";
import toArray from "../../src/modules/toArray";
import orderBy from "../../src/modules/orderBy";

describe("orderBy", () => {

	let simpleArr = [3, 2, 6, 4];
	let complexArr = [{ FirstName: 'C' }, { FirstName: 'A' }, { FirstName: 'B' }];

	it("should retrn ordered items", () => {
		let orderedItems = simpleArr.asEnumerable().orderBy(num => num).toArray();
		expect(orderedItems.length).toBe(4);
		expect(orderedItems[0]).toBe(2);
		expect(orderedItems[1]).toBe(3);
		expect(orderedItems[2]).toBe(4);
		expect(orderedItems[3]).toBe(6);
	});

	it("should retrn ordered set of complex items", () => {
		let orderedItems = complexArr.asEnumerable().orderBy(item => item.FirstName).toArray();
		expect(orderedItems.length).toBe(3);
		expect(orderedItems[0].FirstName).toBe('A');
		expect(orderedItems[1].FirstName).toBe('B');
		expect(orderedItems[2].FirstName).toBe('C');
	});

	it("should call order by function correctly because of where method", () => {
		let fakeObject = { fakeOrderBy: num => num };
		spyOn(fakeObject, 'fakeOrderBy').and.callThrough();
		let result = simpleArr.asEnumerable().where(num => num % 2 == 0).orderBy(fakeObject.fakeOrderBy).toArray();
		expect(fakeObject.fakeOrderBy).toHaveBeenCalledWith(2);
		expect(fakeObject.fakeOrderBy).toHaveBeenCalledWith(4);
		expect(fakeObject.fakeOrderBy).toHaveBeenCalledWith(6);
		expect(fakeObject.fakeOrderBy).not.toHaveBeenCalledWith(3);
		expect(fakeObject.fakeOrderBy.calls.count()).toBe(6);
		expect(result[0]).toBe(2);
		expect(result[1]).toBe(4);
		expect(result[2]).toBe(6);
		expect(result.length).toBe(3);
	});

	it("should call order by function correctly because of take method", () => {
		let fakeObject = { fakeOrderBy: num => num };
		spyOn(fakeObject, 'fakeOrderBy').and.callThrough();
		let result = simpleArr.asEnumerable().take(2).orderBy(fakeObject.fakeOrderBy).toArray();
		expect(fakeObject.fakeOrderBy).toHaveBeenCalledWith(3);
		expect(fakeObject.fakeOrderBy).toHaveBeenCalledWith(2);
		expect(fakeObject.fakeOrderBy).not.toHaveBeenCalledWith(6);
		expect(fakeObject.fakeOrderBy).not.toHaveBeenCalledWith(4);
		expect(fakeObject.fakeOrderBy.calls.count()).toBe(2);
		expect(result[0]).toBe(2);
		expect(result[1]).toBe(3);
		expect(result.length).toBe(2);
	});

	it("should throws an exception when the source is null or undefined", () => {
		expect(() => toArray(orderBy(null, item => item))).toThrowError("source is null or undefined");
		expect(() => toArray(orderBy(undefined, item => item))).toThrowError("source is null or undefined");
	});

	it("should throws an exception when the source is not an enumerable", () => {
		expect(() => toArray(orderBy({}, item => item))).toThrowError("source must be an enumerable");
	});

	it("should throws an exception when the order by column is not a function", () => {
		expect(() => toArray(orderBy([], {}))).toThrowError("order by column must be a function");
	});
});
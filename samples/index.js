import Linq from 'linq4es2015/linq';
Linq.setExtensions();

let count = 0;
let result = [0, 1, 2, 2, 3, 4, 5, 6, 7, 8, 9].asEnumerable()
  .where(num => { count++; return num % 2 == 0; })
  .take(3)
  .orderByDescending(num => num)
  .select(num => '[' + num + ']')
  .distinct()
  .toArray();

console.log(result);
console.log(count);
/* Where
One of the main tasks of a LINQ query is to restrict the results from a larger
collection based on some criteria. This is achieved using the Where operator,
which tests each element within a source collection and returns only those
elements that return a true result when tested against a given predicate
expression. A predicate is simply an expression that takes an element of the
same type of the items in the source collection and returns true or false.*/

let animals = ['Koala', 'Kangaroo', 'Spider', 'Wombat', 'Snake', 'Emu', 'Shark', 'Sting-Ray', 'Jellyfish'];
let q = animals.asEnumerable()
  .where(a=> a.indexOf('S') === 0 && a.length > 5)
  .toArray();

console.log('using where clause ...');

for (let index = 0; index < q.length; index++)
  console.log(q[index]);
  
/*Select
The process of transforming the results of a query is called projection.
You can project the results of a query after any filters have been applied 
to change the type of the collection that is returned. For example, you can 
select a single property or field from the source data or project multiple 
properties into an type. You can also add calculations and other 
operations to the projection to generate information that is based upon the 
source data but not directly retrieved from it.*/

let employees = [
  { name: 'Bob', title: 'Senior Developer', salary: 40000 },
  { name: 'Sam', title: 'Developer', salary: 32000 },
  { name: 'Mel', title: 'Developer', salary: 29000 },
  { name: 'Jim', title: 'Junior Developer', salary: 20000 },
];

let names = employees.asEnumerable()
  .select(emp => emp.name)
  .toArray();

console.log('*** using select method to project name property ...');
for (let index = 0; index < names.length; index++)
  console.log(names[index]);


let salaryIncrease = employees.asEnumerable()
  .select(emp =>
    'Employee : ' + emp.name +
    ' Salary : ' + emp.salary +
    ' New salary : ' + emp.salary * 1.05)
  .toArray();

console.log('*** projection with calculation ... ');

for (let index = 0; index < salaryIncrease.length; index++)
  console.log(salaryIncrease[index]);
  
/*Select Many
  This method `s parameter is used to extract a child collection from each parent item.
  Finally all of the child collection are combined , or flattened , into a single array.
  Let`s extend above sample empployees list that employee objects include a collection of strings
  holding the skills. When the SelectMany method is used to read the Skills collections , the four 
  set of skills are extracted and the combined into a single array.
*/

let employeesIncudeSkills = [
  { name: 'Bob', title: 'Senior Developer', salary: 40000, skills: ['ASP.NET', 'C#', 'JavaScript', 'SQL', 'XML'] },
  { name: 'Sam', title: 'Developer', salary: 32000, skills: ['ASP.NET', 'C#', 'Oracle', 'XML'] },
  { name: 'Mel', title: 'Developer', salary: 29000, skills: ['C#', 'C++', 'SQL'] },
  { name: 'Jim', title: 'Junior Developer', salary: 20000, skills: ['HTML', 'Visual Basic'] }
];

let skills = employeesIncudeSkills.asEnumerable()
  .selectMany(emp => emp.skills)
  .toArray();

console.log('*** using selectMany method to combine skills ...');
for (let index = 0; index < skills.length; index++)
  console.log(skills[index]);
  
  
/*Grouping
Grouping operators return collections of the source elements grouped by some algorithm.
This method provides the ability to organise information into groups.
you can specify a key based on the data held in a collection. The source data is then 
segregated into several enumerable lists, each containing all of the items with a matching key.
For example, you may group a collection of stock items by their categories. The result is a 
group of collections, one for each unique category, each containing all of the products in 
that category.
Grouping of data has many uses. You may decide to group a large data set and display one group 
at a time through the user interface. The user may be able to change the visible group using a 
combo box or selection of radio buttons. You may also group the information so that you can aggregate 
the data, obtaining sums, averages or other aggregations for each group.
 */

let stock = [
  { name: 'Apple', category: 'Fruit', price: 0.30 },
  { name: 'Banana', category: 'Fruit', price: 0.35 },
  { name: 'Orange', category: 'Fruit', price: 0.29 },
  { name: 'Cabbage', category: 'Vegetable', price: 0.49 },
  { name: 'Carrot', category: 'Vegetable', price: 0.29 },
  { name: 'Lettuce', category: 'Vegetable', price: 0.30 },
  { name: 'Milk', category: 'Dairy', price: 1.12 }
];

let groups = stock.asEnumerable()
  .groupBy(
    s => s.category, //key selector
    s => s.name, //element selector
    (key, elements) => key + ' : ' + '[' + elements.join(',') + ']')//result selector
  .toArray();

console.log('*** using groupBy method to group category property ...');
for (let index = 0; index < groups.length; index++)
  console.log(groups[index]);
  
/*Join
A join can be achieved on any data as long as both data sources share a common column value.
Although the concept of joining in-memory collections isn’t a common pattern today.
We add to above stock list category list which has common property 
 */

let categories = [
  { name: 'Dairy', majorCategory: 'Chilled' },
  { name: 'Fruit', majorCategory: 'Fresh' },
  { name: 'Vegetable', majorCategory: 'Fresh' }
];

let joints = stock.asEnumerable()
  .join(
    categories.asEnumerable(),
    stockItem => stockItem.category,
    cat => cat.name,
    (stockItem, cat) =>
      '[' +
      'Name = ' + stockItem.name + ',' +
      'Price = ' + stockItem.price + ',' +
      'Category = ' + cat.name + ',' +
      'MajorCategory = ' + cat.majorCategory +
      ']'
    ).toArray();

console.log('*** using join method for joining stockItems and categories');

for (let index = 0; index < joints.length; index++)
  console.log(joints[index]);
   
/*GroupJoin
These allow two collections to be combined in a join operation based on matching key values. 
The results are then grouped into keyed collections that may be aggregated.
A grouped join provides similar functionality to grouping and joining. An outer list and 
an inner list are joined into a single entity and then grouped so that each outer element 
is paired with the list of matching inner items
 */

let groupJoins = categories.asEnumerable()
  .groupJoin(
    stock.asEnumerable(),
    cat => cat.name,
    stock => stock.category,
    (cat, stocks) => ({
      category: cat.name,
      major: cat.majorCategory,
      stocks: stocks
    })
    ).toArray();

console.log('*** using groupJoin method to show each category and its stocks related ...');

for (let index = 0; index < groupJoins.length; index++) {
  let cat = groupJoins[index];
  console.log('Category name : ' + cat.category + ' , Major : ' + cat.major);
  for (let stockIndex = 0; stockIndex < cat.stocks.length; stockIndex++) {
    let stock = cat.stocks[stockIndex];

    console.log('[' +
      'Name = ' + stock.name + ',' +
      'Price = ' + stock.price +
      ']');
  }
}

/*Take
Take returns a number from the beginning of the source collection.The number is specified 
as the only parameter to the method.In the sample code below, the first five elements of 
the array of fruit names are extracted.
 */

let fruits = ['Apple', 'Banana', 'Cherry', 'Damson', 'Elderberry', 'Grape', 'Kiwi', 'Lemon', 'Melon', 'Orange'];

let takePartitioned = fruits.asEnumerable().take(5).toArray();

console.log('*** Extracting the first five elements of the array by take method ...');
for (let index = 0; index < takePartitioned.length; index++)
  console.log(takePartitioned[index]);
    
/*Skip
The Skip method returns all of the items that the Take method would not return 
when used with the same argument. In the case of Skip, a number of items from the start of the 
source sequence are ignored and the remaining items are returned. In the following example, 
the first five elements of the string array are skipped and the remaining items are included in 
the results.
 */

let skipPartitioned = fruits.asEnumerable().skip(5).toArray();
console.log('*** The first five elements of the strings array are skipped and the remaining items extacted ...');
for (let index = 0; index < skipPartitioned.length; index++)
  console.log(skipPartitioned[index]);
    
/*TakeWhile
As the name may suggest, this method retrieves items from the start of a sequence. Instead of specifying 
a fixed number of results, a predicate is provided using a function. This condition is evaluated for each 
item in the collection until the first time that it returns false. The items up to but not including the false 
result are returned.
The following sample code retrieves items from the start of the array until a string with a length of ten 
or more characters is encountered.Even though further items exist in the array that pass the condition, 
these are not returned.
 */

console.log('TakeWhile method continues retrieving items unti string length be bigger or equal than 10 ...');
let takeWhilePartitioned = fruits.asEnumerable().takeWhile(f => f.length < 10).toArray();
for (let index = 0; index < takeWhilePartitioned.length; index++)
  console.log(takeWhilePartitioned[index]);
    
/*SkipWhile
SkipWhile is the opposite of TakeWhile. Again a predicate is specified but this time items that meet 
the condition are skipped. When an item is encountered that causes the predicate to return false, 
this item and all that follow it are returned.
 */

console.log('SkipWhile method continues skiping items unti string length be bigger or equal than 10 then return remaining items ...');
let skipWhilePartitioned = fruits.asEnumerable().skipWhile(f => f.length < 10).toArray();
for (let index = 0; index < skipWhilePartitioned.length; index++)
  console.log(skipWhilePartitioned[index]);
    
/*Concat
Concatenation is the act of combining the elements from two sequences into one larger set of data
 */

fruits = ['Apple', 'Orange', 'Grape'];
let vegs = ['Broccoli', 'Carrot', 'Potato'];

let fruitsAndVegs = fruits.asEnumerable().concat(vegs).toArray();

console.log('*** Cancat method combines both fruits and vegs into one array ...');
for (let index = 0; index < fruitsAndVegs.length; index++)
  console.log(fruitsAndVegs[index]);
  
/*Distinct 
This method is used to generate a list of unique items from a single collection, filtering out any 
duplicate data.
The sample code below finds all of the distinct values from the first example array. Note that the 
duplicated D has been removed but the two A's are still present because one is lower case and the 
other is capitalised.
*/

let set1 = ['A', 'a', 'B', 'C', 'D', 'D', 'E'];
let distinct1 = set1.asEnumerable().distinct().toArray();

console.log('Distinct method remove duplicated items ...');

for (let index = 0; index < distinct1.length; index++)
  console.log(distinct1[index]);
    
/*The above sample uses the default comparer for the data type being processed. You can use an alternative 
comparer by providing it as a second parameter.Below the comparison is case-insensitive and the lower case
 letter A has been removed from the results accordingly.
 */

let distinct2 = set1.asEnumerable().distinct((a, b) => a.toLowerCase() === b.toLowerCase())
  .toArray();

console.log('Distinct method remove duplicated items using comparer ...');
for (let index = 0; index < distinct2.length; index++)
  console.log(distinct2[index]);
  
/*Union
The Union operator allows the contents of two collections to be combined into a single resultant list. 
If any duplicated items are identified, they are removed. This gives the same results
Distinct method and Concat method.
 */

let set2 = ['a', 'B', 'C', 'D', 'E', 'e', 'F'];
let union = set1.asEnumerable().union(set2, (a, b) => a.toLowerCase() === b.toLowerCase()).toArray();

console.log('Union method combines two list set1 and set2 as a unique list using comparer ...');
for (let index = 0; index < union.length; index++)
  console.log(union[index]);
   
   
/*Intersect
This method using 2 collections as an argument, It returns items whiche exists in both collections.
If an element is present in only one of the them method then it will be removed.
 */

let intersectionWithoutComparer = set1.asEnumerable().intersect(set2).toArray();

console.log('Intersect method without comparer');

for (let index = 0; index < intersectionWithoutComparer.length; index++)
  console.log(intersectionWithoutComparer[index]);

console.log('Intersect method with comparer');

let intersectWithComparer = set1.asEnumerable().intersect(set2, (a, b) => a.toLowerCase() === b.toLowerCase())
  .toArray();

for (let index = 0; index < intersectWithComparer.length; index++)
  console.log(intersectWithComparer[index]);
  
/*Except
This method compares the elements of two collections. It returns all elements of first collection 
which are not present in the second collection. The following example return all elements of set1 
which is not present in set2.
 */

let exceptWithoutComparer = set1.asEnumerable().except(set2).toArray();


console.log('Except method without comparer ...');

for (let index = 0; index < exceptWithoutComparer.length; index++)
  console.log(exceptWithoutComparer[index]);

let exceptWithComparer = set1.asEnumerable().except(set2, (a, b) => a.toLowerCase() === b.toLowerCase()).toArray();

console.log('Except method with comparer ...');

console.log('Result is empty');

/*AsEnumerable
  This method convert an array to generator for to execute  deferred query
   */
let enumerable = [1, 2, 3, 4, 5, 6, 7, 8].asEnumerable();
/*ToArray
This method extracts all of items from source (enumerable) and returns an array.
Query of this method will be excuted immediately and result copied into the new array.
 */

let array = enumerable.toArray();

console.log('*** array after executing toArray method ...');

for (let index = 0; index < array.length; index++)
  console.log(array[index]);
  
 
/*First
This method returns the first item from sequence. We can use this method without argument.

 */

let items = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];


let first = items.asEnumerable().first();

console.log('*** return first element of the array');

console.log(first);

/*
if there are no items in the in the sequence the method throws an exception.
 */

let empty = [];
try {
  first = empty.asEnumerable().first();
}
catch (err) {
  console.error(err.message);
}

 
/*
You can use argument as a predicate. The returned value is the first item of the 
list that the condition returns true. 
*/

first = items.asEnumerable().first(item => item.length == 5);

console.log('first item is equals 5 length => ' + first);

/*FirstOrDefault
This method is similar to first method , However if no item exists , it does not throw an exception.
It returns null.
 */

first = items.asEnumerable().firstOrDefault();

console.log(first);

first = empty.asEnumerable().firstOrDefault();
console.log(first);

/*Last
This method is similar to first. However instead of returning the first item in a sequence it return last item.
 */

let last = items.asEnumerable().last();

console.log(last);

last = items.asEnumerable().last(item => item.length == 5);

console.log(last);
 
 
/*LastOrDefault
this method is similar to FirstOrDefault . if last item of sequence or last items which predicate condition is true 
be empty, it returns null.
 */

console.log(items.asEnumerable().lastOrDefault());
console.log(empty.asEnumerable().lastOrDefault());
console.log(items.asEnumerable().lastOrDefault(item => item.lenght == 5));
console.log(items.asEnumerable().lastOrDefault(item => item.lenght == 2));


/*Single
This method retuen single result. When you expect sequence contains one item . 
If sequence has more than one element or is empty the method throws an exception.
*/

let singleList = ['one'];

let single = singleList.asEnumerable().single();

console.log(single);

try {
  single = empty.asEnumerable().single();
}
catch (err) {
  console.error(err.message);
}

single = items.asEnumerable().single(item => item.indexOf('O') === 0);

try {
  single = items.asEnumerable().single(item => item.indexOf('F') === 0);
}
catch (err) {
  console.error(err.message);
}


/*SingleOrDefault
This method similar to single method . However if the sequence or result 
predicate fucntion is empty returns null instead of throwing exception
 */

let singleOrDefault = singleList.asEnumerable().singleOrDefault();
console.log(singleOrDefault);

try {
  singleOrDefault = items.asEnumerable().singleOrDefault();
}
catch (err) {
  console.error(err.message);
}

singleOrDefault = items.asEnumerable().singleOrDefault(item => item.indexOf('E') === 0);
console.log(singleOrDefault);

singleOrDefault = items.asEnumerable().singleOrDefault(item => item.indexOf('X') === 0);
console.log(singleOrDefault);

try {
  singleOrDefault = items.asEnumerable().singleOrDefault(item => item.indexOf('F') === 0);
}
catch (err) {
  console.error(err.message);
}


/*ElementAt
This method takes an index as an argument then return an item related to its index.
 */

let elementAt = items.asEnumerable().elementAt(5);
console.log(elementAt);
  
/*
If collection is empty or index is out of range an exception will be thrown.
 */

try {
  elementAt = empty.asEnumerable().elementAt(5);
}
catch (err) {
  console.error(err.message);
}
 
/*ElementAtOrDefault
This method is similar to elementAt . However if an collection is empty or index is invalid instead of 
throwing an exception return value will be null. 
 */

let elementAtOrDefault = items.asEnumerable().elementAtOrDefault(5);
console.log(elementAtOrDefault);

elementAtOrDefault = empty.asEnumerable().elementAtOrDefault(5);
console.log(elementAtOrDefault);
  
/*DefaultIfEmpty
This method return takes default value as an argument and checks if collection is empty returns defaul value 
otherwise returns new instance of souce list.
 */

let defaultIfEmptyResult = items.asEnumerable().defaultIfEmpty().toArray();
console.log(defaultIfEmptyResult);
   
/*
If source colllection is empty , a new collection will be generated and new item will be added to it.
if default value argument is not null new item is default value otherwise new item is undefined.
 */
defaultIfEmptyResult = empty.asEnumerable().defaultIfEmpty('default value').toArray();
console.log(defaultIfEmptyResult);

defaultIfEmptyResult = empty.asEnumerable().defaultIfEmpty().toArray();
console.log(defaultIfEmptyResult);
     
/* Range
This method creates a set of squential integers. This method receives 2 arguments , 
the first value will be first item of sequence and the second determines the number of integers. 
 */

let range = Linq.range(12, 20).toArray();
for (let index = 0; index < range.length; index++)
  console.log(range[index]);
     
/* Return is enumerable and you can execute another query on it. 
 */
console.log("*** number bigger than 15 and * 1000 ...");
range = Linq.range(12, 20)
  .where(n => n > 15)
  .select(n => n * 1000)
  .toArray();
for (let index = 0; index < range.length; index++)
  console.log(range[index]);
     
    
/*Repeat
This method receives 2 arguments the first is value which should be repeated and the second is number of repeat.
The result is enumerable and you can execute another query on it.
 */

let repeated = Linq.repeat('Hello', 5).toArray();

for (let index = 0; index < repeated.length; index++)
  console.log(repeated[index]);
  
/*Empty
This method returns an empty or zero length sequence.
 */

let emptyList = Linq.empty().toArray();
console.log('Is seauence is empty => ' + (emptyList.lenght == 0).toString());
      
/*
Left Join
*/

let authorsData = [
  { authorId: 1, name: "John Smith" },
  { authorId: 2, name: "Harry Gold" },
  { authorId: 3, name: "Ronald Schwimmer" },
  { authorId: 4, name: "Jerry Mawler" }
];

let booksData =
  [
    { authorId: 1, title: "Little Blue Riding Hood" },
    { authorId: 3, title: "The Three Little Piggy Banks" },
    { authorId: 1, title: "Snow Black" },
    { authorId: 2, title: "My Rubber Duckie" },
    { authorId: 2, title: "He Who Doesn't Know His Name" },
    { authorId: 3, title: "Hanzel and Brittle" }
  ];

let leftJoinResults = authorsData.asEnumerable().groupJoin(booksData, author => author.authorId, book => book.authorId,
  (author, booksByAuthor) => ({ authorName: author.name, books: booksByAuthor }))
  .selectMany(authorBooks => authorBooks.books.asEnumerable().defaultIfEmpty(authorBooks.books, { title: 'None' }), (book, author) => ({ authorName: author.authorName, title: book.title }))
  .toArray();

console.warn(leftJoinResults);

/*
Contains
This mehtod returns true if a collection contains specific value 
 */

names = ['Art', 'Bob', 'Cath', 'Dan', 'Ian'];
console.log('has Cath => ' + names.asEnumerable().contains('Cath'));
console.log('has Jim => ' + names.asEnumerable().contains('Jim'));

/*
With comaparer 
*/

console.log('has Cath => ' + names.asEnumerable().contains('cath'));
console.log('has cath => ' + names.asEnumerable().contains('cath', (a, b) => a.toLowerCase() == b.toLowerCase()));

/*
Any
This method returns true if collection has one or more items, The first overload has no arguments
 */

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 19];

console.log(numbers.asEnumerable().any());
console.log(empty.asEnumerable().any());

/*
The second overload takes an arguments as an predicate. 
This starts to evaluate for each items. The  first item that the predicate 
returns true then evaluating will be stoped and returns true.
*/

let over10 = numbers.asEnumerable().any(n=> n > 10);
let over20 = numbers.asEnumerable().any(n=> n > 20);

console.log('over 10 => ' + over10);
console.log('over 20 => ' + over20);

/*
All
This method returns true if all elements in a sequence pass the predicate.
*/

let under20 = numbers.asEnumerable().all(n => n < 20);
let under10 = numbers.asEnumerable().all(n=> n < 10);

console.log('under 20 => ' + under20);
console.log('under 10 => ' + under10);

/*Count
This method returns the numbers of item in the collection in the first overload.
 */

console.log('stock item count => ' + stock.asEnumerable().count());
 
/*
The second overload has a predicate argument and returns number of items in the 
collection which pass the predicate.
 */

console.log('Number of stockItems which are Fruit => ' +
  stock.asEnumerable().count(item => item.category == 'Fruit'));
  
  
/*Sum
This method returns total of the value in a sequence, The first overload (no arguments) is used for a colletion that contains 
only numeric valus.
 */

let sum = numbers.asEnumerable().sum();
console.log('sum => ' + sum);
   
/*
The second overload accepts an argument as selector that the selected property should be numeric
 */

sum = stock.asEnumerable().sum(item => item.price);
console.log('total of stock items price => ' + sum);
   
   
/*Min
This method returns the smallest values in a sequence.
The default overload which has no arguments can be used for numeric sequence
 */

let min = numbers.asEnumerable().min();
console.log('Smallest value in numbers collection => ' + min);
    
/*
The second overload accepts an argument as selector that the selected property should be numeric
 */

min = stock.asEnumerable().min(item => item.price);
console.log('Smellest price in stockitems => ' + min);
     
/*Max
This method returns the Largest values in a sequence.
The default overload which has no arguments can be used for numeric sequence
 */

let max = numbers.asEnumerable().max();
console.log('Smallest value in numbers collection => ' + max); 

/*
The second overload accepts an argument as selector that the selected property should be numeric
 */

max = stock.asEnumerable().max(item => item.price);
console.log('Largest price in stockitems => ' + max);

/*Average
This method finds the mean of the values in a squence.
 */

let average = numbers.asEnumerable().average();
console.log('Avrage value in numbers collection => ' + average); 

/*
The second overload accepts an argument as selector that the selected property should be numeric
 */

average = stock.asEnumerable().average(item => item.price);
console.log('Aletge price in stockitems => ' + average);


/*Aggregate
 You can create your own calculations using the Aggrigate method.
 This method is similar to the other aggrigate methods like 
 Avrage , Count and ... . However it allows you specify a custom function.
 The basic overload accepts a function that has 2 paramters and return a value
*/

numbers = [1, 2, 3, 4, 5];
let aggregate = numbers.asEnumerable().aggregate(0, (acc, next) => acc * 10 + next);

console.log('The basic aggrerage => ' + aggregate);

/*
Sometimes it is necessary to execute the function for every item in a collection, 
rather than skipping the first value. In such cases you can provide a seed value for the accumulator 
as the first argument of the Aggregate method
 */

let value = ['A', 'B', 'C', 'D'];
aggregate = value.asEnumerable().aggregate('Z', (acc, next) => acc + ',' + next);

console.log(aggregate);

/*
You can add a result selector. The result selector is executed after the entire process is completed.
 */

aggregate = value.asEnumerable().aggregate('Z', (acc, next) => acc + ',' + next, s => s.toLowerCase());

console.log(aggregate);

/*SequenceEqual
This method accepts 2 collecion as arguments and detemine whether are exact duplicates,
The basic overload use default comparer
 */

let value1 = ['A', 'B', 'C', 'D'];
let value2 = ['A', 'B', 'C', 'D'];

console.log('Is value1 and value2 Equal => ' + value1.asEnumerable().sequenceEqual(value2));

/*
You can add comprere as an argument.
 */

value1 = ['A', 'B', 'C', 'D'];
value2 = ['a', 'b', 'c', 'd'];

console.log('Is value1 and value2 array Equal => ' + value1.asEnumerable()
  .sequenceEqual(value2, (val1, val2) => val1.toLowerCase() == val2.toLowerCase()));
  
  
/*ToLookup
 This method is similar to group by. When executed it extracts a set of key / value pairs from the source sequence.
  Each element in the resultant collection is a generic Lookup object, which holds the key and 
  a subsequence containing all of the items that matched the key. Unlike GroupBy, ToLookup 
  does not use deferred execution.
 */

let emplist = [
  { name: 'Bob', department: 'IT', salary: 30000 },
  { name: 'Dan', department: 'Finance', salary: 22000 },
  { name: 'Jim', department: 'IT', salary: 32000 },
  { name: 'Jon', department: 'Finance', salary: 24000 },
  { name: 'Ken', department: 'Sales', salary: 37000 },
  { name: 'Liz', department: 'Finance', salary: 24000 },
  { name: 'Mel', department: 'IT', salary: 40000 },
  { name: 'Sam', department: 'Sales', salary: 34000 },
  { name: 'Tim', department: 'Finance', salary: 45000 }
];



let lookup = emplist.asEnumerable().toLookup(e => e.department, e => e);
// debugger;

/*Zip
Zip cycles through two sequences using deferred execution.
The items at the same index are paired and each pair is transformed by resulSelector.
This continues until all of the items in either sequence have been processed.
If one sequence has more elements than the other, the extra elements are not projected into the new sequence. 
 */

let integers1 = [1, 2, 3, 4, 5];
let integers2 = [10, 20, 30, 40, 50, 60];

let zip = integers1.asEnumerable().zip(integers2, (item1, item2) => item1 + item2).toArray();

console.log('zip ....');
for (let index = 0; index < zip.length; index++)
  console.log(zip[index]);
# react-recycled-scrolling

[![npm package][npm-badge]][npm]
[![Build Status](https://travis-ci.org/sarons/react-recycled-scrolling.svg?branch=master)](https://travis-ci.org/sarons/react-recycled-scrolling)
[![Coverage Status](https://coveralls.io/repos/github/sarons/react-recycled-scrolling/badge.svg?branch=master)](https://coveralls.io/github/sarons/react-recycled-scrolling?branch=master)

> Simulate normal scrolling by using only fixed number of DOM elements for large lists of items

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

## Install

```bash
npm install --save react-recycled-scrolling
```

## Usage

All that is required is 
* **attrList**: A list of items
* **itemFn**: A React functional component or even just a function that returns jsx for each element

```javascript
const numberList = []
for (let i = 1; i <= 20000; i++) numberList.push(i)
const SheepRow = (no) => (<div> {no} Sheep </div>)
```

Then just drop in your RecycledList wherever you need it

```javascript
<RecycledList
itemFn = {SheepRow}
attrList = {numberList}
/>
```

Additional parameters are
* **itemHeight**: Height of each item, Default: 50
* **rowOffset**: How many buffer rows you need outside the viewable screen, Default: 6
* **className**: custom CSS for the outer scroll wrapper. You must have {position: relative} for recycled scroll to work

```javascript
<RecycledList
  itemFn = {SheepRow}
  attrList = {numberList}
  itemHeight={120}
  rowOffset = {10}
  className = {'CustomContainer'}
/>
```

## License

MIT
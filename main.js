// Array.flat Polyfill: Implement a polyfill for the Array.flat method. This method should flatten an array up to the specified depth, handling cases where the depth is not provided (default to 1) or when it's an infinite depth.

Array.prototype.myFlat = function (depth = 1) {
  let res = [];

  if (Number.isInteger(depth) && depth > 0) {
    depth--;

    for (const item of this) {
      if (Array.isArray(item)) {
        res = res.concat(depth ? item.myFlat(depth) : item);
      } else {
        res.push(item);
      }
    }
  }

  return res;
};

// Array.reduce Polyfill: Write a polyfill for the Array.reduce method. Ensure your implementation handles all the functionalities of the native reduce method, including the accumulator and current value parameters, as well as the optional initial value.

Array.prototype.myReduce = function (callback, res) {
  let i = 0;
  if (res === undefined) {
    res = this[0];
    i++;
  }
  for (; i < this.length; i++) {
    res = callback(res, this[i], i);
  }
  return res;
};

// String Repeater: Create a method that extends the String prototype to repeat a given string a specified number of times. For example, calling 'hello world'.repeating(3) should return 'hello world hello world hello world'. The method should handle edge cases like non-integer repeat times and negative numbers.

String.prototype.myRepeater = function (n) {
  return Number.isInteger(n) && n > 0 ? new Array(n + 1).join(this) : '';
};

// String.prototype.padStart Polyfill: Write a polyfill for the String.prototype.padStart method. It should pad the current string from the start with another string (multiple times if necessary) until the resulting string reaches the given length.

String.prototype.myPadStart = function (len, padStr = ' ') {
  if (padStr === '' || !Number.isInteger(len) || len <= this.length) {
    return this.valueOf();
  }

  const padLen = Math.max(0, len - this.length);
  const padTimes = Math.ceil(padLen / padStr.length);
  return padStr.repeat(padTimes).substring(0, padLen) + this;
};

// Custom setTimeout Implementation: Implement a custom version of setTimeout using only Date and a while loop, without using the native setTimeout function.

function mySetTimeout(callback, ms) {
  const start = Date.now();
  while (true) {
    if (Date.now() - start >= ms) {
      break;
    }
  }
  callback();
}

// Memoization Function: Create a function that implements memoization to cache and return the results of expensive function calls.

function myMemoize(callback) {
  const valKey = Symbol();
  const cache = new Map();

  return (...args) => {
    let curr = cache;
    for (const arg of args) {
      if (!curr.has(arg)) {
        curr.set(arg, new Map());
      }
      curr = curr.get(arg);
    }
    if (curr.has(valKey)) {
      return curr.get(valKey);
    }
    const val = callback(...args);
    curr.set(valKey, val);
    return val;
  };
}

// Currying Logger: Develop a curryLogger function that takes a logging function and returns a curried version of this function.

function curryLogger(callback, ...rest) {
  return (...args) => {
    return callback(...rest, ...args);
  };
}

// Arguments Reverser: Implement a function that reverses the order of arguments it receives, returning a new function with reversed arguments.

function myReverser(callback) {
  return (...args) => {
    args.reverse();
    return callback(...args);
  };
}

// Private Counter Closure: Craft a function that uses closures to create a private counter, which can only be modified through specific methods.

function myCounter(callback) {
  let count = 0;

  const handler = (...args) => {
    count++;
    return callback(...args);
  };
  handler.counterReset = () => {
    count = 0;
  };
  handler.counterGet = () => {
    return count;
  };
  return handler;
}

// Rest Parameters Sum: Write a function that uses rest parameters to calculate and return the sum of an indefinite number of arguments.

function myRestSum(...args) {
  return args.reduce((acc, arg) => acc + arg);
}

// Object Freeze Deep: Create a function that deeply freezes an object, ensuring all nested objects are also frozen.

Object.prototype.deepFreeze = function (obj) {
  if (typeof obj === 'object') {
    if (obj !== null) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key) && typeof obj[key] === 'object') {
          Object.deepFreeze(obj[key]);
        }
      }
    }
    Object.freeze(obj);
  }
};

// Array Chunker: Develop a function that divides an array into chunks of a specified size and returns them.

Array.prototype.myChunker = function (size = this.length) {
  const res = [];
  for (let i = 0; i < this.length; i += size) {
    res.push(this.slice(i, i + size));
  }
  return res;
};

// Custom Array Filter: Implement your own version of the array filter function without using the built-in Array.prototype.filter method.

Array.prototype.myFilter = function (check) {
  const res = [];
  for (const val of this) {
    if (check(val)) {
      res.push(val);
    }
  }
  return res;
};

// DOM Element Selector: Write a function for selecting DOM elements with a specific data attribute and applying a given callback function to them.

HTMLElement.prototype.getByDataAttribute = function (attr, callback) {
  document.querySelectorAll(`*[data-${attr}]`).forEach((el) => callback(el));
};

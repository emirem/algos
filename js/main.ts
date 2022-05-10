interface Array<T> {
  myMap<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
  myFilter<U>(cb: (value: T, index: number, array: T[]) => boolean, thisArg?: any): U[];
  myForEach(cb: (value: T, index: number) => void): void;
  myReduce(cb: (curr: T, prev: T, index: number, arr: T[]) => T, initialVal?: T): T
}

Array.prototype.myMap = function (cb) {
  const mapped = [];

  for (let i = 0; i < this.length; i++) {
    mapped.push(cb(this[i], i, this))
  }

  return mapped;
}

Array.prototype.myFilter = function (cb) {
  const filtered = [];

  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) {
      filtered.push(this[i])
    }
  }

  return filtered;
}

Array.prototype.myForEach = function (cb) {
  for (let i = 0; i < this.length; i++) {
    cb(this[i], i)
  }
}

Array.prototype.myReduce = function (cb, initialVal) {
  let total = initialVal || this[0];
  const start = initialVal == undefined ? 1 : 0;

  for (let i = start ?? 1; i < this.length; i++) {
    total = cb(total, this[i], i, this)
  }

  return total;
}

const nums = [1, 2, 3]

const mapped = nums.myMap((el) => el + 1)

console.log(mapped.myFilter(el => el != 2))

mapped.myForEach(el => console.log("el", el));

const val1 = mapped.myReduce((prev, curr) => prev + curr, 5)
const val = mapped.reduce((prev, curr) => prev + curr, 5)

console.log({ val, val1 })

function debounce(cb: (...params: any) => any, delay: number) {
  let to: ReturnType<typeof setTimeout>;

  return function (this: any, ...stuff: any[]) {
    const ctx = this;
    const args = stuff;

    if (to) {
      clearTimeout(to)
    }

    to = setTimeout(() => cb.apply(ctx, args), delay)
  }
}

function throttle(cb: (...params: any[]) => any, delay: number) {
  let inThrottle = false;

  return function (this: any, ...prms: any[]) {
    const ctx = this;
    const args = prms;

    if (inThrottle) return;

    inThrottle = true;

    setTimeout(() => {
      cb.apply(ctx, args);
    }, delay)
  }
}

function doIt(name: string, num: number) {
  console.log(name, num)
}

const lol = debounce(doIt, 300)
const lolThrottled = throttle(doIt, 300)

lol("Debounce: ", 1);
lol("Debounce: ", 2);
lol("Debounce: ", 3);
lol("Debounce: ", 4);
lol("Debounce: ", 5);

lolThrottled("Throttle: ", 1);
lolThrottled("Throttle: ", 2);
lolThrottled("Throttle: ", 3);
lolThrottled("Throttle: ", 4);
lolThrottled("Throttle: ", 5);

function cloneDeep<T extends Object>(obj: T): T {
  const result = {} as T;

  for (let key in obj) {
    if (typeof obj[key] === "object") {
      result[key] = cloneDeep(obj[key]);
    } else if (typeof obj[key] === "function") {
      result[key as keyof typeof obj] = (obj[key] as unknown as Function).bind(
        result
      );
    } else {
      result[key as keyof typeof result] = obj[key as keyof typeof result];
    }
  }

  return result;
}

interface MyObj {
  smth: number;
  someFn: () => void;
  someObj: { another: number };
}

const original: MyObj = {
  smth: 1,
  someFn: function () {
    console.log("here", this.smth);
  },
  someObj: { another: 1 },
};
// const cloned = cloneDeep(original);
// original.someFn();
// cloned.someFn();
// console.log("Should be false ", original === cloned, cloned);

interface Array<T> {
  mapAsync<U>(
    cb: (value: T, index: number, arr: U[]) => Promise<T>
  ): Promise<U[]>;
}

Array.prototype.mapAsync = async function (cb) {
  const result = new Array(this.length);

  for (let i = 0; i < this.length; i++) {
    result[i] = await cb(this[i], i, this);
  }

  return result;
};

const data = [1, 2, 3, 4];

const dataMapped = data.mapAsync(
  (val) => new Promise((resolve, reject) => resolve(val * val))
);
dataMapped.then((d) => console.log(d));

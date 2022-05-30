interface Subject {
  subscriberCallbacks: Function[];
  subscribe: (cb: Function) => void;
  unsubscribe: (cb: Function) => void;
  doStuff: () => void;
}

interface Observer {
  count: number;

  updateMe: () => void;
}

const subject: Subject = {
  subscriberCallbacks: [],

  subscribe: function (cb) {
    this.subscriberCallbacks.push(cb);
  },

  unsubscribe: function (callback) {
    const newSubs = this.subscriberCallbacks.filter((cb) => cb !== callback);
    this.subscriberCallbacks = newSubs;
  },

  doStuff: function () {
    this.subscriberCallbacks.forEach((cb) => {
      cb();
    });
  },
};

const observer = {
  count: 0,

  updateMe: function () {
    this.count++;
  },
};

const fn = observer.updateMe.bind(observer);

subject.subscribe(fn);

console.log("obs", observer.count);

subject.doStuff();
subject.doStuff();

subject.unsubscribe(fn);
subject.doStuff();
console.log("obs", observer.count);


class Test {
  #private1;
  #private2;

  /**
   * 
   * @param {number} public1 
   * @param {number} public2 
   */
  constructor(public1,public2) {
    this.#private1 = public1;
    this.#private2 = public2;
    this.public1 = public1;
  }

  get private2() {
    return this.#private2;
  }

  get private1() {
    return this.#private1
  }

}

class MyClass {
  #data={};

  constructor(args={}) {
    this.#data = {...this.#data, ...args}
  }

  get data() {
    return this.#data;
  }

  get key1() {
    return this.#data.key1;
  }

  get key2() {
    return this.#data.key2;
  }

  setKey(key, val) {
    switch (key) {
      case 1:
        this.#data.key1 = val;
        break;
      case 2:
        this.#data.key2 = val;
        break;
      default:
        console.error(`first argument of setKey must be 1 or 2`);
    }
  }

  toJson() {
    return JSON.stringify(this.data, null, 2);
  }

  [Symbol.for('nodejs.util.inspect.custom')]() {
    const [depth, options, inspect] = arguments;
    options.showHidden = true;
    options.getters = true;
    let foo = new Test(4,5);
    foo.public1 = 'test'
    return inspect(foo,options)
  }
}

console.log(new MyClass({key1: [1,2,[3,4,[5,6]]]}))



function log(obj) {
  Object.keys(obj).forEach((key) => {
    console.log(key, obj[key]);
  })
}
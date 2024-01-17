
function createEnum(arr=['a','b','c']) {
  const copyArr = arr.map(x => x)
  const enumObj = {
    *[Symbol.iterator]() {
      yield* arr
    }
  };
  arr.forEach((key,index) => {
    Object.defineProperty(enumObj,key,{
      enumerable: true,
      value: index,
      writable: false,
    })
  });

  Object.defineProperty(enumObj,'keys', {
    get: () => copyArr
  })

  return Object.create(enumObj)
}

const test = {
  /** number three */key0: 3 
}


function* gen() {
  yield* ["key0",'key1','key2','key3'];
}

test[Symbol.iterator] = gen

const numberArr = ['zero','one','two','three']

/**
 * @enum {number}
 * @type {Object<string,number>}
 */
const count = createEnum(numberArr);


for (let key of test) {
  console.log(key)
}

numberArr[0] = 'five'
count.keys[3] = 'six'

count.bob = 'bob'

console.log('count.keys',count.keys)

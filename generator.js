`use strict`
let range = {
    from: 1,
    to: 5,
  
    // for..of range вызывает этот метод один раз в самом начале
    [Symbol.iterator]() {
      // ...он возвращает перебираемый объект:
      // далее for..of работает только с этим объектом, запрашивая следующие значения
      return {
        current: this.from,
        last: this.to,
  
        // next() вызывается при каждой итерации цикла for..of
        next() {
          // нужно вернуть значение как объект {done:.., value :...}
          if (this.current <= this.last) {
            return { done: false, value: this.current++ };
          } else {
            return { done: true };
          }
        }
      };
    }
  };
  
  // при переборе объекта range будут выведены числа от range.from до range.to
  console.log([...range]); // 1,2,3,4,5
//////////////////////////////////////////////////////////////////////////
let range2 = {
    from: 1,
    to: 5,
  
    *[Symbol.iterator]() { // краткая запись для [Symbol.iterator]: function*()
      for(let value = this.from; value <= this.to; value++) {
        yield value;
      }
    }
  };
  
  console.log( [...range2] ); // 1,2,3,4,5
//////////////////////////////////////////////////////////////////////////
function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) yield i;
  }
  
  function* generatePasswordCodes() {
  
    // 0..9
    yield* generateSequence(48, 57);
  
    // A..Z
    yield* generateSequence(65, 90);
  
    // a..z
    yield* generateSequence(97, 122);
  
  }
  
  let str = '';
  
  for(let code of generatePasswordCodes()) {
    str += String.fromCharCode(code);
  }
  
  console.log(str); // 0..9A..Za..z
//////////////////////////////////////////////////////////////
function* generateSequence2(start, end) {
    for (let i = start; i <= end; i++) yield i;
  }
  
  function* generateAlphaNum() {
  
    // yield* generateSequence(48, 57);
    for (let i = 48; i <= 57; i++) yield i;
  
    // yield* generateSequence(65, 90);
    for (let i = 65; i <= 90; i++) yield i;
  
    // yield* generateSequence(97, 122);
    for (let i = 97; i <= 122; i++) yield i;
  
  }
  
  let str2 = '';
  
  for(let code of generateAlphaNum()) {
    str2 += String.fromCharCode(code);
  }
  
  console.log(str2); // 0..9a..zA..Z
////////////////////////////////////////////////////////////////////
function* gen() {
    let ask1 = yield "2 + 2 = ?";
  
    console.log(ask1); // 4
  
    let ask2 = yield "3 * 3 = ?"
  
    console.log(ask2); // 9
  }
  
  let generator = gen();
  
  console.log( generator.next().value ); // "2 + 2 = ?"
  
  console.log( generator.next(4).value ); // "3 * 3 = ?"
  
  console.log( generator.next(9).done ); // true
  //////////////////////////////////////////////////////////////////
//   function* generate() {
//     let result = yield "2 + 2 = ?"; // Ошибка в этой строке
//   }
  
//   let generator1 = generate();
  
//   let question = generator1.next().value;
  
//   try {
//     generator1.throw(new Error("Ответ не найден в моей базе данных"));
//   } catch(e) {
//     console.log(e); // покажет ошибку
//   }
//////////////////////T///A///S///K/////////////////////////////////


function* pseudoRandom(seed){
    let value = seed;

    while(true){
    value = value * 16807 % 2147483647
    yield value;
    }
}
let generator3 = pseudoRandom(1);

console.log(generator3.next().value); // 16807
console.log(generator3.next().value); // 282475249
console.log(generator3.next().value); // 1622650073
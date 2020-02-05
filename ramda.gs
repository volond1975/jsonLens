var map = function(arr, callback, thisArg) {
  var i, length = arr.length, results = [];
  for (i = 0; i < length; i = i + 1) {
    results.push(callback.call(thisArg, arr[i], i, arr));
  }
  return results;
};


var curryIt = function(uncurried) {
  var parameters = Array.prototype.slice.call(arguments, 1);
  return function() {
    return uncurried.apply(this, parameters.concat(
      Array.prototype.slice.call(arguments, 0)
    ));
  };
};

function testCurryIt(){
  
 var greeter = function(greeting, separator, emphasis, name) {
  Logger.log(greeting + separator + name + emphasis);
};
var greetHello = curryIt(greeter, "Hello", ", ", ".");
greetHello("Heidi"); //"Hello, Heidi."
greetHello("Eddie"); //"Hello, Eddie." 
}

/**
Давайте напишем свой собственный функтор “MyFunctor”.
Это просто JS-класс (функция-конструктор). 
Метод map применяет функцию к хранимым значениям и возвращает новый экземпляр MyFunctor.

var add1 = function(a) {return a + 1};
var MyFunctor {
  constructor(value) {
    this.val = value;
  }
  map(fn) {   // Применяет функцию к this.val + возвращает новый экземпляр Myfunctor
   return new Myfunctor(fn(this.val));
  }
}
// temp --- это экземпляр Functor, хранящий значение 1
var temp = new MyFunctor(1); 
temp.map(add1) // -> temp позволяет нам применить add1
*/
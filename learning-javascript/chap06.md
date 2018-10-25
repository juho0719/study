# 함수
```javascript
function sayHello() {
    // 함수 바디는 여는 중괄호로 시작
    
    console.log("Hello world!");

    // 닫는 중괄호로 끝
}
```

## 반환 값
- 함수 호출에 대한 응답 값
- 함수 바디 안에 return 키워드를 사용하면 함수를 즉시 종료하고 값을 반환
```javascript
function getGreeting() {
    return "Hello world!";
}
```
```javascript
getGreeting()   // Hello world!
```
- return을 명시적으로 호출하지 않으면 반환 값은 `undefined`

## 호출과 참조
- 함수도 객체
- 함수 식별자 뒤에 괄호를 쓰면 자바스크립트는 함수를 호출하려 한다고 이해
- 괄호를 쓰지 않으면 함수를 참조하는 것이며, 그 함수는 실행되지 않음
```javascript
getGreeting();  // "Hello, world!"
getGreeting;    // function getGreeting()
```
- 함수를 변수에 할당하면 다른 이름으로 함수를 호출 할 수 있음
```javascript
const f = getGreeting;
f();    // "Hello, world!"
```
- 함수를 객체 프로퍼티에 할당할 수도 있음
```javascript
const o = {};
o.f = getGreeting;
o.f();  // "Hello, World!"
```
- 배열 요소로 할당할 수도 있음
```javascript
const arr = [1, 2, 3];
arr[1] = getGreeting;   // arr은 이제 [1, function getGreeting(), 2]입니다.
arr[1]();               // "Hello, World!"
```
- 함수가 아닌 값에 괄호를 붙이면 에러 발생 (TypeError: "xxx" is not a function)

## 함수와 매개변수
- 함수에 정보를 전달할 때는 매개변수 이용
```javascript
function avg(a, b) {
    return (a+b+/2;
}
```
- a,b는 정해진 매개변수(formal argument), 함수를 호출하면 정해진 매개변수를 받아 실제 매개변수(actual argument)가 됨
- 실제 매개변수는 변수와 비슷하지만, 함수 안에서만 존재
- 함수를 호출하면 함수 매개변수는 변수 자체가 아니라 그 값을 전달 받음
```javascript
function f(x) {
    console.log(`f 내부: x=${x}`);
    x = 5;
    console.log(`f 내부: x=${x} (할당 후)`);
}
let x = 3;
console.log(`f를 호출하기 전: x=${x}`);
f(x);
console.log(`f를 호출한 다음: x=${x}`);
```
```
// 실행결과
f를 호출하기 전: x=3
f 내부: x=3
f 내부: x=5 (할당 후)
f를 호출한 다음: x=3
```
- 함수안에서 x에 값을 할당하더라도 함수 바깥의 변수 x에는 아무 영향도 없음
```javascript
function f(o) {
    o.message = `f 안에서 수정함 (이전 값: '${o.message}')`;
}
let o = {
    message: "초기 값"
};
console.log(`f를 호출하기 전: o.message="${o.message}"`);
f(o);
console.log(`f를 호출한 다음: o.message="${o.message}"`);
```
```
// 실행결과
f를 호출하기 전: o.message="초기 값"
f를 호출한 다음: o.message="f 안에서 수정함 (이전 값: '초기 값')"
```

#### 매개변수가 함수를 결정하는가?
- 자바스크립트는 매개변수에 따라 함수를 다르게 호출하지 않음. 매개변수가 한개든 두개든 같은 함수를 호출하는 것
- 정해진 매개변수에 값을 제공하지 않으면 암시적으로 `undefined`가 할당됨
```javascript
function f(x) {
    return `in f: x=${x}`;
}
f();    // "in f: x=undefined"
```

#### 매개변수 해체
- 해체 할당과 마찬가지로 매개변수도 해체할 수 있음
```javascript
function getSentence({subject, verb, object}) {
    return `${subject} ${verb} ${object}`;
}

const o = {
    subject: "I",
    verb: "love",
    object: "JavaScript",
};

getSentence(o);     // "I love JavaScript"
```
- 프로퍼티 이름은 반드시 유효한 식별자여야 하고, 들어오는 객체에 해당 프로퍼티가 없는 변수는 `undefined`할당
- 배열 역시 해체 가능
```javascript
function getSentence([subject, verb, object]) {
    return `${subject} ${verb} ${object}`;
}

const arr = [ "I", "love", "JavaScript" ];
getSentence(o);     // "I love JavaScript"
```
- 확장 연산자(...)를 써서 남은 매개변수를 이용할 수도 있음
```javascript
function addPrefix(prefix, ...words) {
    const prefixedWords = [];
    for(let i=0; i<words.length; i++) {
        prefixedWords[i] = prefix + words[i];
    }
    return prefixedWords;
}
addPrefix("con", "verse", "vex");   // ["converse", "convex"]
```
- 확장 연산자는 반드시 마지막 매개변수이어야 함

#### 매개변수 기본값
- ES6에서는 매개변수에 기본값을 지정하는 기능이 추가
```javascript
function f(a,b = "default", c = 3) {
    return `${a} - ${b} - ${c}`;
}
f(5, 6, 7);     // "5 - 6 - 7"
f(5, 6);        // "5 - 6 - 3"
f(5);           // "5 - default - 3"
f();            // "undefined - default - 3"
```

## 객체의 프로퍼티인 함수
- 객체의 프로퍼티인 함수를 메서드라 부름
- 객체 리터럴에서도 메서드를 추가할 수 있음
```javascript
const o = {
    name: 'Wallace',                        // 원시 값 프로퍼티
    bark: function() {return 'Woof!';},     // 함수 프로퍼티(메서드)
}
```
- ES6에서는 간편하게 메서드를 추가할 수 있는 문법이 새로 생김
```javascript
const o = {
    name: 'Wallace',              // 원시 값 프로퍼티
    bark() {return 'Woof!';},     // 함수 프로퍼티(메서드)
}
```

## this 키워드
- 함수 바디안에는 특별한 읽기 전용 값인 `this`가 있음
- 메서드를 호출하면 `this`는 호출한 메서드를 소유하는 객체가 됨
```javascript
const o = {
    name: 'Wallace',
    speak() {return 'My name is ${this.name}!';},
}
```
```javascript
o.speak();  // "My name is Wallace!"
```
- this는 o에 묶임
- this가 o에 묶인 이유는 speak가 o의 프로퍼티여서가 아니라, o에서 speak를 호출했기 때문
```javascript
const speak = o.speak;
speak === o.speak;  // true; 두 변수는 같은 함수를 가르킴
speak();            // "My name is undefined!"
```
- 함수를 이렇게 호출하면 자바스크립트는 이 함수가 어디에 속하는지 알 수 없으므로 this는 undefined에 묶임
- 메서드는 객체 인스턴스에서 호출할 의도로 만든 함수
- 중첩된 함수 안에서 this를 사용하려다 보면 혼란스러움
```javascript
const o = {
    name: 'Julie',
    greetBackwards: function() {
        function getReverseName() {
            let nameBackwards = '';
            for (let i=this.name.length-1; i>=0; i--) {
                nameBackwards += this.name[i];
            }
            return nameBackwards;
        }
        return `${getReverseName()} si eman ym ,olleH`;
    },
};
o.greetBackwards();
```
- `o.greetBackwards()`를 호출할 때는 this를 o에 연결하지만, `getReverseName()`을 호출하면 this는 o가 아닌 undefined에 묶이게 됨
- 이런 문제를 해결하기 위해 널리 사용하는 방법은 다른 변수에 this를 할당하는 방법
```javascript
const o = {
    name: 'Julie',
    greetBackwards: function() {
        const self = this;
        function getReverseName() {
            let nameBackwards = '';
            for(let i=self.name.length-1; i>=0; i--) {
                nameBackwards += self.name[i];
            }
            return nameBackwards;
        }
        return `${getReverseName()} si eman ym ,olleH`;
    },
};
o.greetBackwards();
```
- this를 self나 that에 할당하는 코드를 많이 봤을 것이다.

## 함수 표현식과 익명 함수
- 함수를 선언하면 함수에 바디와 식별자가 주어짐
- 익명 함수는 함수에 식별자가 주어지지 않음
- 함수 표현식으로 호출. 함수 표현식은 함수 이름을 생략할 수 있음
```javascript
const f = function() {
    ...
};
```
- 식별자 f가 함수를 카르킴
- 함수 이름을 생략하지 않고 이름을 작성하고 변수에 할당하면?
```javascript
const g = function f() {
    ...
}
```
- g에 우선순위가 있음
- 함수 바깥에서 함수에 접근할 때는 g를 써야 하며, f로 접근하려 하면 변수가 정의되지 않았다는 에러 생김
```javascript
const g = function f(stop) {
    if(stop) console.log('f stopped');
    f(true);
};
g(false);
```
- 함수안에서는 f를 써서 자기 자신을 참조하고 바깥에서는 g를 써서 함수를 호출

## 화살표 표기법
- ES6에서 새로 만든 화살표 표기법(arrow notation)도 환영받는 문법
- function이라는 단어와 중괄호 숫자를 줄이려고 고안된 단축 문법
- 화살표 함수에는 세 가지 단축 문법이 있음
    - function을 생략해도 됨
    - 함수에 매개변수가 단 하나 뿐이라면 괄호()를 생략해도 됨
    - 함수 바디가 표현식 하나라면 중괄호와 return문도 생략 가능
```javascript
const f1 = function() { return "hello"; }
// 또는
const f1 = () => "hello";

const f2 = function(name) { return `Hello, ${name}!`;}
// 또는
const f2 = name => `Hello, ${name}!`

const f3 = function(a,b) { return a+b ;}
// 또는
const f3 = (a,b) => a + b;
```
- this가 다른 변수와 마찬가지로 정적으로 묶임
```javascript
const o = {
    name: 'Julie',
    greetBackwards: function() {
        const getReverseName = () => {
            let nameBackwards = '';
            for(let i=this.name.length-1; i>=0; i--) {
                nameBackwards += this.name[i]
            }
            return `${getReverseName()} si eman ym ,olleH`;
        };
        return `${getReverseName()} si eman ym ,olleH`;
    },
};
o.greetBackwards();
```

## call과 apply,bind
- 자바스크립트에서는 일반적인 방법 외에도, 함수를 어디서, 어떻게 호출했느냐와 관계없이 `this`가 무엇인지 지정할 수 있음
```javascript
const bruce = { name: "Bruce" };
const madeline = { name: "Madeline" };

// 이 함수는 어떤 객체에도 연결되지 않았지만 this를 사용
function greet() {
    return `Hello, I'm ${this.name}!`;
}

greet();                // "Hello, I'm undefined!" - this는 어디에도 묶이지 않았음
greet.call(bruce);      // "Hello, I'm Bruce!" - this는 bruce
greet.call(madeline);   // "Heelo, I'm Madeline!" - this는 madeline
```
- call을 사용하고 this로 객체를 넘기면 해당 함수가 주어진 객체의 메서드인 것처럼 사용할 수 있음
- call의 첫번째 매개변수는 this로 사용할 값이고, 매개변수가 더 있으면 호출하는 함수의 매개변수로 전달
```javascript
function update(birthYear, occupation) {
    this.birthYear = birthYear;
    this.occupation = occupation;
}

update.call(bruce, 1949, 'singer');     
// bruce는 {name: "bruce", birthYear: 1949, occupation: "singer"}로 변경

update.call(madeline, 1942, 'actress'); 
// Madeline은 {name: "Madeline", birthYear: 1942, occupation: "actress"}로 변경
```
- apply는 함수 매개변수 처리 방법을 제외하면 call과 같음
- apply는 매개변수를 배열로 받음
```javascript
update.call(bruce, [1955, "actor"]);     
// bruce는 {name: "bruce", birthYear: 1949, occupation: "singer"}로 변경

update.call(madeline, [1918, "writer"]); 
// Madeline은 {name: "Madeline", birthYear: 1942, occupation: "actress"}로 변경
```
- apply는 배열 요소를 함수 매개변수로 사용해야 할 때 유용
- 배열의 최대값, 최소값 구하는 것처럼 여러 데이터를 한꺼번에 넘겨 무언가를 처리할 때 좋음
```javascript
const arr = [2, 3, -5, 15, 7];
Math.min.apply(null, arr);  // -5
Math.max.apply(null, arr);  // 15
```
- 내장함수 Math는 this오 관계없이 동작하기 때문에 `null`을 넘겨도 상관없음
- ES6의 확산 연산자(...)을 사용해도 apply와 같은 결과를 얻을 수 있음
```javascript
const newBruce = [1940, "martial artist"];
update.call(bruce, ...newBruce);    // apply(bruce, newBruce)와 같음
Math.min.apply(...newBruce);        // -5
Math.max.apply(...newBruce);        // 15
```
- this의 값을 바꿀 수 있는 마지막 함수는 `bind`
- bind를 사용하면 함수의 this값을 영구히 바꿀 수 있음
- this의 값을 항상 `bruce`, call이나 apply, 다른 bind와 함께 호출하더라도 this 값이 항상 bruce가 되도록 하려면 bind사용
```javascript
const updateBruce = update.bind(bruce);

updateBruce(1904, "actor");                 // bruce는 저 값으로 변경
updateBruce.call(madeline, 1274, "king");   // madeline은 변하지 않음
```
- bind는 함수의 동작을 영구적으로 바꾸므로 찾기 어려운 버그의 원인이 될 수 있음
- bind에 매개변수를 넘기면 항상 그 매개변수를 받으면서 호출되는 새 함수를 만드는 효과가 있음
```javascript
const updateBruce1949 = update.bind(bruce, 1949);
updateBruce1949("singer, songwriter");
// bruce는 {name: "bruce", birthYear: 1949, occupation: "singer, songwriter"} 임
```

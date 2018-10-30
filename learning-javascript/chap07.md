# 스코프
- 변수와 상수, 매개변수가 언제 어디서 정의되는지 결정
```javascript
function f(x) {
    return x + 3;
}
f(5);   // 8
x;      // ReferenceError: x is not defined
```
- 함수를 벗어나면 x가 존재 하지 않는 것처럼 보임. 이럴 때 x의 스코프는 함수 f라 말함
- 함수를 실제 호출할 때까지는 함수 바디의 정해진 매개변수가 존재하지 않음
- 함수를 호출할 때마다 매개변수가 나타나고, 함수가 제어권을 반환하면 스코프 밖으로 사라짐
- let이나 const로 선언하기 전에는 스코프 안에 존재하지 않음

## 스코프와 존재
- 가시성(visibility)라 불리는 스코프는 실행 컨텍스트에서 현재 보이고 접근할 수 있는 식별자들을 말함
- 반면 존재한다는 말은 그 식별자가 메모리에 할당된 무언가를 가르키고 있다는 뜻
- 존재하지만 스코프에 없는 ...

## 정적 스코프와 동적 스코프
```javascript
const x = 3;

function f() {
    console.log(x);
    console.log(y);
}

{   // 새 스코프
    const y = 5;
    f();
}
```
- 변수 x는 함수 f를 정의할 때 존재하지만, y는 그렇지 않음
- 다른 스코프에서 y를 선언하고 그 스코프에서 f를 호출하더라도, f를 호출하면 x는 그 바디안의 스코프에 있지만 y는 없음
- 이것이 정적 스코프
- 자신이 정의될 때 접근할 수 있었던 식별자에는 여전히 접근할 수 있지만 호출할 때 스코프에 있는 식별자에는 접근할 수 없음

## 전역 스코프
- 프로그램이 시작할 때 암시적으로 주어지는 스코프
- 전역 스코프에서 선언한 것은 전역 변수
- 전역 변수를 남용하는 것이 나쁜 것. 원래 꼭 필요한 요소
```javascript
let name = "Irena";     // 전역
let age = 25;           // 전역

function greet() {
    console.log(`Hello, ${name}!`);
}
function getBirthYear() {
    return new Date().getFullYear() - age;
}
```
- 함수가 호출하는 컨텍스트(스코프)에 의존적
- 어디에서든 상관없이 name값을 바굴 수 있어 버그 유발 확률 높음
```javascript
let user = {
    name = "Irena",
    age = 25,
}
function greet() {
    console.log(`Hello, ${user.name}!`);
}
function getBirthYear() {
    return new Date().getFullYear() - userage;
}
```
- 위와 같이 단일 객체에 정보를 저장하는 것이 조금 더 낫지만 전역 객체를 사용한다는 점에선 변수와 크게 다르지 않음
```javascript
function greet(user) {
    console.log(`Hello, ${user.name}!`);
}
function getBirthYear(user) {
    return new Date().getFullYear() - userage;
}
```
- 명시적으로 `user`를 받음으로써 전역 객체를 사용하지 않게 됨

## 블록 스코프
- 그 블록의 스코프에서만 보이는 식별자
```javascript
console.log('before block');
{
    console.log('inside block');
    const x = 3;
    console.log(x);     // 3
}
console.log(`outside block; x=${x}`);   // ReferenceError: x는 정의되지 않았습니다.
```
- 독립 블록을 사용한 예제이지만 많이 사용되진 않음

## 변수 숨기기
```javascript
{
    // 외부 블록
    let x = 'blue';
    console.log(x);     // "blue"
    {
        // 내부 블록
        let x = 3;      // 외부 블록의 x는 가려짐
        console.log(x); // "3"
    }
    console.log(x);     // "blue"
}
console.log(typeof x);  // "undefined"; x는 스코프에 있지 않음
```
- 내부 블록의 x는 이름만 같을 뿐 외부 블록의 x와 다름
```javascript
{
    // 외부 블록
    let x = { color: "blue" };
    let y = x;
    let z = 3;
    {
        // 내부 블록
        let x = 5;              // 외부 블록의 x는 가려짐 (내부 x와는 별개)
        console.log(x);         // 5
        console.log(y.color);   // "blue"; y가 가르키는 x객체는 가려지지 않음
        y.color = "red"; 
        console.log(z);         // 3
    }
    console.log(x.color);       // "red"; 객체는 내부 스코프에서 수정
    console.log(y.color);       // "red"; x와 y는 같은 객체
    console.log(z);             // 3
}
```
- 스코프의 계층적인 성격때문에 어떤 변수가 스코프에 있는지 확인하는 스코프 체인이란 개념이 생김

## 함수, 클로저, 정적스코프
- 최신 자바스크립트에서는 함수가 필요한 곳에서 즉석으로 정의할 때가 많음
- 함수를 변수나 객체 프로퍼티에 할당하고, 배열에 추가하고, 다른 함수에 전달하고, 함수가 함수를 반환하고, 심지어 이름이 없을 때도 있음
- 함수가 특정 스코프에 접근할 수 있도록 의도적으로 그 스코프에서 정의하는 것을 클로저라 함
```javascript
let globalFunc;             // 정의되지 않은 전역 함수
{
    let blockVer = 'a';     // 블록 스코프에 있는 변수
    globalFunc = function() {
        console.log(blockVar);
    }
}
globalFunc();               // "a"
```
- globalFunc는 블록 안에서 값을 할당 받았음
- 이 블록 스코프와 그 부모인 전역 스코프가 클로저를 형성함
- globalFunc를 어디서 호출하든, 이 함수는 클로저에 들어있는 식별자에 접근할 수 있음
- globalFunc를 호출하면, 이 함수는 스코프에서 빠져나왔음에도 blockVar에 접근할 수 있음
- 일반적으로 스코프에서 빠져나가면 해당 스코프에서 선언한 변수는 메모리에서 제거해도 되지만, 여기서는 스코프안에서 정의했고, 해당 함수는 스코프 밖에서도 참조할 수 있으므로 스코프를 계속 유지함
- 스코프안에서 함수를 정의하면 더 오래 유지
```javascript
let f;      // 정의되지 않은 함수
{
    let o = { note: 'Safe' };
    f = function() {
        return o;
    }
}
let oRef = f();
oRef.note = "Not so safe after all!";
```
- 일반적으로는 스코프 바깥쪽에 있는 것들에는 접근할 수 없지만 클로저를 만들면 접근할 수 없었던 것들에 접근할 방법이 생김

## 즉시 호출하는 함수 표현식
```javascript
(function() {
    // IIFE 바디
})();
```
- 함수 표현식으로 익명 함수를 만들고, 그 함수를 즉시 호출함
- `IIFE`의 장점은 내부에 있는 것들이 자신만의 스코프를 가지지만, IIFE 자체는 함수이므로 스코프 밖 무언가를 내보낼 수 있음
```javascript
const message = (function() {
    const secret = "I'm a secret!";
    return `The secret is ${secret.length} characters long.`;
})();
console.log(message);
```
- 변수 secret은 IIFE 스코프 안에서 안전하게 보호되며 외부에서 접근할 수 없음
```javascript
const f = (function() {
    let count = 0;
    return function() {
        return `I have been called ${++count} time(s).`;
    }
})();
f();    // "I have been called 1 time(s)."
f();    // "I have been called 2 time(s)."
```

## 함수 스코프와 호이스팅
- ES6에서 let을 도입하기 전에는 var를 써서 변수 선언
- 이렇게 선언된 변수들은 함수 스코프라 불림 (var로 선언한 전역 변수는 명시적인 함수 안에 있지는 않지만 함수 스코프와 동일하게 동작)
- let으로 변수를 선언하면, 그 변수는 선언하기 전에는 존재하지 않음
- var로 선언한 변수는 현재 스코프 안이라면 어디서든 사용할 수 있으며, 선언하기도 전에 사용할 수도 있음
```javascript
let var1;
let var2 = undefined;
var1;           // undefined
var2;           // undefined
undefineVar;    // ReferenceError: notDefined는 정의 되지 않았음
```
```javascript
x;          // undefined
var x = 3;  
x;          // 3
```
- 위와 같이 변수 선언을 나중에 해도 var로 선언한 변수는 위로 끌어올림 (호이스팅)
- 선언만 끌어올려지고, 할당은 끌어올려지지 않음
```javascript
// 원래 코드                          // 자바 스크립트가 해석한 코드
                                    var x;
                                    var y;
if(x !== 3) {                       if(x !== 3) {
    console.log(y);                     console(y);
    var y = 5;                          y = 5;
    if(y === 5) {                       if(y === 5) {
        var x = 3;                          x = 3;
    }                                   }
    console.log(y);                     console.log(y);
}                                   }
if(x === 3) {                       if(x === 3) {
    console.log(y);                     console.log(y);
}                                   }
```
- var를 이용해 같은 변수를 여러번 정의하더라도 한번만 적용 나머지 무시
- var의 이런 점이 혼란스럽고 쓸모없는 코드가 생길 수 있는 가능성이 높아 ES6에서 let을 새로 만든 것임
- 함수 선언 역시 끌어올려짐

## 함수 호이스팅
- var로 선언된 변수와 마찬가지로 함수 선언도 스코프 맨 위로 끌어올려 짐
```javascript
f();    // 'f'
function f() {
    console.log('f');
}
```
- 변수에 할당한 함수 표현식은 끌어올려지지 않음
```javascript
f();        // ReferenceError: f는 정의 되지 않았습니다.
```

## 사각지대
- let으로 선언하는 변수는 선언하기 전까지 존재하지 않는다는 개념을 표현한 것
- typeof 연산자는 변수가 선언됐는지 알아 볼때 많이 쓰임
- let 키워드가 도입되고 변수의 사각지대가 생기면서 항상 안전하지 않음
```javascript
if(typeof x === "undefined") {
    console.log("x doesn't exist or is undefined");
} else {
    // x를 사용해도 안전한 코드
}
let x = 5;
```

## 스트릭트 모드
- ES5에서는 암시적 전역 변수(implicit global)가 생길 수 있었음
- var로 변수 선언하지 않으면 자바스크립트는 전역 변수를 참조하려 함
- 이런 이유로 스트릭트 모드(strict mode) 도입
- 스트릭 모드는 암시적 전역 변수를 허용 하지 않음
- "use strict"를 코드 맨앞에 사용하면 적용


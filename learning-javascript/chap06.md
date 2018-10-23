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

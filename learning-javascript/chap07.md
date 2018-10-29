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


# 예외와 에러 처리

- 에러 처리라고 하지 않고 예외 처리라고 하는 이유는 예상치 못한 상황에 대처하는 방식
- 예상한 에러와 예상치 못한 에러(예외)를 구분하는 기준은 불명확하고 상황에 따라 달라짐
- 예상할 수 있는 에러는 잘못된 이메일 주소를 입력하는 경우같은 것이고, 예상치 못한 에러라면 디스크에 남은 공간이 없어진다던가 서비스가 갑자기 정지된다거나 하는 경우가 있음

## Error 객체
- 내장된 Error 객체가 있음
- Error 인스턴스를 만들면서 에러 메시지를 지정할 수 있음
```javascript
const err = new Error('invalid email');
```
- 인스턴스를 만드는 것만으로는 아무 일도 일어나지 않음
- 해당 인스턴스를 반환해야 에러 처리
```javascript
function validateEmail(email) {
    return email.match(/@/) ?
        email : 
        new Error(`invalid email: ${email}`);
}
```
- 이 함수를 사용할 때는 instanceof 연산자를 써서 Error 인스턴스가 반환됐는지 확인
- 에러 메시지는 message 프로퍼티에 있음
```javascript
const email = "jane@doe.com";

const validateEmail = validateEmail(email);
if(validateEmail instanceof Error) {
    console.error(`Error: ${validatedEmail.message}`);
} else {
    console.log(`Valid Email: ${validatedEmail}`);
}
```
- 이 방법도 Error 인스턴스를 활용하고 유용한 방법이지만 예외 처리에 더 자주 사용됨

## try/catch와 예외 처리
- 예외 처리는 try...catch문을 사용
```javascript
const email = null;

try {
    const validatedEmail = validateEmail(email);
    if(validatedEmail instanceof Error) {
        console.error(`Error: ${validatedEmail.message}`);
    } else {
        console.log(`Valid email: ${validatedEmail}`);
    }
} catch(err) {
    console.error(`Error: ${err.message}`);
}
```
- email이 null이기 때문에 validateEmail()실행 시 오류가 발생하여 catch문으로 이동함

## 에러 일으키기
- 예외 처리 기능이 있는 다른 언어와는 달리 자바스크립트는 에러를 일으킬 때 꼭 객체만이 아니라 숫자나 문자열 등 어떤 값이든 catch문에 넘길 수 있음
- 하지만 Error 인스턴스를 넘기는 것이 가장 편리
- 대부분 catch블록은 Error 인스턴스를 받을 것이라고 간주하고 만들기 때문
- 은행 애플리케이션에 사용할 현금 인출 기능을 만든다고 하고, 계좌의 잔고가 요청받은 금액보다 적다면 예외를 일으켜야 함
```javascript
function billPay(amount, payee, account) {
    if(amount > account.balance)
        throw new Error("insufficient funds");
    account.transfer(payee, amount);
}
```
- throw를 호출하면 현재 함수는 즉시 실행을 멈춤

## 예외 처리와 호출 스택
- 프로그램이 함수를 호출하고, 그 함수는 다른 함수를 호출하고.. 이런 일이 반복되면서 완료되지 않은 함수가 쌓이는 것을 호출 스택이라 부름
- 에러는 캐치될 때까지 호출 스택을 따라 올라감
- 에러는 호출 스택 어디에서든 캐치할 수 있음
- 에러를 캐치하지 않으면 자바스크립트 인터프리터는 프로그램을 멈춤
- 에러를 캐치하면 호출 스택에서 문제 해결에 유용한 정보를 얻을 수 있음
- Error 인스턴스에는 스택을 문자열로 표현한 stack 프로퍼티가 있음
```javascript
function a() {
    console.log('a: calling b');
    b();
    console.log('a: done');
}
function b() {
    console.log('b: calling c');
    c();
    console.log('b: done');
}
function c() {
    console.log('c: throwing error');
    throw new Error('c error');
    console.log('c: done');
}
function d() {
    console.log('d: calling c');
    c();
    console.log('d: done');
}

try {
    a();
} catch(err) {
    console.log(err.stack);
}

try {
    d();
} catch(err) {
    console.log(err.stack);
}
```
- 결과
```
a: calling b
b: calling c
c: throwing error
c@debugger eval code:13:1
b@debugger eval code:8:4
a@debugger eval code:3:4
@debugger eval code:23:4

d: calling c
c: throwing error
c@debugger eval code:13:1
d@debugger eval code:18:4
@debugger eval code:29:4
```
- @기호가 있는 행은 스택 추적이며 `가장 깊은`함수(c)에서 시작하고 함수가 남지 않았을 때 끝남

## try...catch...finally
- try 블록의 코드가 HTTP 연결과 같은 일종의 `자원`을 처리할 때 에러가 있든 없든 자원을 해제 해야할 경우가 있음
- 이런 상황에서 finally 블록을 사용. finally블록은 에러가 발생해도 실행
```javascript
try {
    console.log("this line is executed...");
    throw new  Error("whoops");
    console.log("this line is not...");
} catch(err) {
    console.log("threr was an error...");
} finally {
    console.log("...always executed");
    console.log("perform cleanup here");
}
```

# 이터레이터와 제너레이터
- '지금 어디 있는지' 파알할 수 있도록 돕는다는 면에서 책갈비와 비슷한 개념
- 배열의 경우 이터러블 객체의 좋은 예
```javascript
const book = [
    "Twinkle. twinkle, little bat!",
    "How I wonder what you're at!",
    "Up above the world you fly,",
    "Like a tea tray in the sky.",
    "Twinkle, twinkle, little bat!",
    "How I wonder what you're at!"
];
```
- 이 배열에 values메서드를 사용하여 이터레이터를 만들 수 있음
```javascript
const it = book.values();
```
- 이터레이터를 시작하려면 next메서드를 호출해야 함
- 이 메서드가 반환하는 객체에는 `value`프로퍼티와 `done`프로퍼티가 있음
```javascript
it.next(); // { value: "Twinkle. twinkle, little bat!", done: false }
it.next(); // { value: "How I wonder what you're at!", done: false }
it.next(); // { value: "Up above the world you fly,", done: false }
it.next(); // { value: "Like a tea tray in the sky.", done: false }
it.next(); // { value: "Twinkle, twinkle, little bat!", done: false }
it.next(); // { value: "How I wonder what you're at!" done: false }
it.next(); // { value: undefined, done: true}
it.next(); // { value: undefined, done: true}
it.next(); // { value: undefined, done: true}
```
- 더 진행할 것이 없으면 `value`는 `undefined`가 되지만 `next`는 계속 호출 할 수 있음 
- 이터레이터가 끝까지 진행하면 뒤로 돌아가서 다른 데이터를 제공할 수 없음
- 배열의 요소를 나열하는 것이 목적이라면, for루프나 for...of를 사용할 수 있음
- 이터레이터와 `while`를 사용하면 `for...of`와 비슷하게 동작하게 만들 수 있음
```javascript
const it = book.values();
let current = it.next();
while(!current.done) {
    console.log(current.value);
    current = it.next();
}
```
- 이터레이터는 모두 독립적
- 새 이터레이터를 만들 때마다 처음에서 시작
- 각각 다른 요소를 가리키는 이터레이터 여러 개를 동시에 사용할 수도 있음
```javascript
const it1 = book.values();
const it2 = book.values();

// it1으로 두 페이지를 읽음
it1.next(); // { value: "Twinkle. twinkle, little bat!", done: false }
it1.next(); // { value: "How I wonder what you're at!", done: false }

// it2로 한 페이지 읽음
it2.next(); // { value: "Twinkle. twinkle, little bat!", done: false }

// it1로 한 페이지 더 읽음
it1.next(); // { value: "Up above the world you fly,", done: false }
```

## 이터레이션 프로토콜
- 이터레이터는 그 자체보다는 더 쓸모 있는 동작이 가능해지도록 한다는 데 의미가 있음
- 이터레이터 프로토콜은 모든 객체를 이터러블 객체로 바꿀 수 있음
- 메시지에 타임스탬프를 붙이는 로그 클래스
```javascript
class Log {
    constructor() {
        this.messages = [];
    }
    add(message) {
        this.messages.push({ message, timestamp: Date.now() });
    }
}
```
- 로그를 기록한 항목을 순회(iterate)하고 싶다면 어떻게?
- `log.messages`에 접근할 수 있지만, log를 배열 조작하듯 할 수 있다면 더 좋을 것임
- 이터레이션 프로토콜은 클래스에 심볼 메서드 `Symbol.iterator`가 있고 이 메서드가 이터레이터처럼 동작하는 객체를 반환한다면 그 클래스의 인스턴스는 이터러블 객체라는 뜻
- `Log`클래스에 `Symbol.iterator` 메서드를 추가
```javascript
class Log {
    constructor() {
        this.messages = [];
    }
    add(message) {
        this.messages.push({ message, timestamp: Date.now() });
    }
    [Symbol.iterator]() {
        return this.messages.values();
    }
}
```
- 이제 `Log`인스턴스를 배열처럼 순회할 수 있음
```javascript
const log = new Log();
log.add("first day at sea");
log.add("spotted whale");
log.add("spotted another vessel");

// 로그를 배열처럼 순회
for(let entry of log) {
    console.log(`${entry.message} @ ${entry.timestamp}`);
}
```
- 직접 이터레이터를 만들 수도 있음
```javascript
class Log {
    constructor() {
        this.messages = [];
    }
    add(message) {
        this.messages.push({ message, timestamp: Date.now() });
    }
    [Symbol.iterator]() {
        let i = 0;
        const messages = this.messages;
        return {
            next() {
                if(i >= messages.length)
                    return { value: undefined, done: true };
                return { value: messages[i++], done: false };
            }
        };
    }
}
```
- 피보나치 수열처럼 무한한 데이터에도 사용할 수 있음
- 단지 이터레이터의 `done`이 절대 `true`를 반환하지 않는 것일 뿐
```javascript
class FibonacciSequence {
    [Symbol.iterator]() {
        let a = 0, b = 1;
        return {
            next() {
                let rval = { value: b, done: false };
                b += a;
                a = rval.value;
                return rval;
            }
        };
    }
}
```
- `for...of`를 사용하여 `FibonacciSequence`를 계산하면 무한 루프에 빠지므로 `break`문을 사용
```javascript
const fib = new FibonacciSequence();
let i = 0;
for(let n of fib) {
    console.log(n);
    if(++i > 9) break;
}
```

## 제너레이터
- 제너레이터란 이터레이터를 사용해 자신의 실행을 제어하는 함수
- 일반적인 함수는 매개변수를 받고 값을 반환하지만, 호출자는 매개변수 외에는 함수의 실행을 제어할 방법이 없음
- 함수를 호출하면 종료될 때까지 제어권을 넘기는 것이지만 제너레이터에서는 그렇지 않음
- 제너레이터는 두 가지 새로운 개념을 도입
    - 함수의 실행을 개별적 단계로 나눔으로써 함수의 실행을 제어
    - 실행 중인 함수와 통신
- 제너레이터는 두 가지 예외를 제외하면 일반적인 함수와 같음
    - 제너레이터는 언제든 호출자에게 제어권을 넘길(yield) 수 있음
    - 제너레이터는 호출한 즉시 실행되지 않음. 대신 이터레이터를 반환하고, 이터레이터의 `next`메서드를 호출
- 무지개 색깔을 반환하는 제너레이터 에제
```javascript
function* rainbow() {   // * 기호는 제너레이터 문법
    yield 'red';
    yield 'orange';
    yield 'yellow';
    yield 'green';
    yield 'blue';
    yield 'indigo';
    yield 'violet';
}
```
- 제너레이터를 호출하면 이터레이터를 얻음
```javascript
const it = rainbow();
it.next();      // { value: "red", done: false }
it.next();      // { value: "orange", done: false }
it.next();      // { value: "yellow", done: false }
it.next();      // { value: "green", done: false }
it.next();      // { value: "blue", done: false }
it.next();      // { value: "indigo", done: false }
it.next();      // { value: "violet", done: false }
it.next();      // { value: undefined, done: true }
```

#### yield 표현식과 양방향 통신
- 호출자와의 통신은 `yield`표현식을 통함
- 표현식은 값으로 평가되고 `yield`는 표현식으므로 반드시 어떤 값으로 평가
- `yield` 표현식의 값은 호출자가 제너레이터의 이터레이터에서 `next`를 호출할 때 제공하는 매개변수
```javascript
function* interrogate() {
    const name = yield "What is your name?";
    const color = yield "What is your favorite color?";
    return `${name}'s favorite color is ${color}.`;
}
```
- `next`를 호출하면 첫 번째행에 `yield`표현식이 들어 있으므로 제너레이터는 반드시 제어권을 호출자에게 넘겨야 함
- 제너레이터의 첫 번째 행이 완료(resolve)되려면 호출자가 `next`를 다시 호출해야 함
- 그러면 `name`은 `next`에서 전달하는 값을 받음
```javascript
const it = interrogate();
it.next();          // { value: "What is your name?", done: false }
it.next('Ethan');   // { value: "What is your favorite color?", done: false }
it.next('orange');  // { value: "Ethan's favorite color is orange.", done: false }
```
- 제너레이터는 화살표 표기법으로 만들 수 없으면 반드시 `function*`을 써야 함

#### 제너레이터와 return
- `yield`문은 제너레이터의 마지막 문이더라도 제너레이터를 끝내지 않음
- 제너레이터에서 `return`문을 사용하면 그 위치와 상관없이 `done`은 `true`가 되고, `value` 프로퍼티는 `return`이 반환하는 값이 됨
```javascript
function* abc() {
    yield 'a';
    yield 'b';
    return 'c';
}

const it = abc();
it.next();      // { value: 'a', done: false }
it.next();      // { value: 'b', done: false }
it.next();      // { value: 'c', done: true }
```
- 제너레이터를 사용할 때는 보통 `done`이 `true`이면 `value`프로퍼티에 주의를 기울이지 않음
- 예를 들어 이 제너레이터를 `for...of`에서 사용하면 `c`는 절대 출력되지 않음
- 제너레이터에서 중요한 값을 `return`으로 반환하려 하면 안됨
- 제너레이터가 반환하는 값을 사용하려 할 때는 `yield`를 써야 하고, `return`은 제너레이터 중간에 종료하는 목적으로만 사용해야 함

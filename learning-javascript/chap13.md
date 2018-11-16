# 함수와 추상적 사고

## 서브루틴으로서의 함수
- 서브루틴은 복잡한 코드를 간단하게 만드는 기초적인 수단
- 서브루틴은 반복되는 작업의 일부를 떼어내서 이름을 붙이고, 그 이름을 부르기만 하면 실행
- 서브루틴은 어떤 알고리즘을 나타내는 형태
- 윤년(leap year) 판단 알고리즘
```javascript
const year = new Date().getFullYear();
if(year % 4 !== 0) console.log(`${year} is NOT a leap year.`);
else if(year % 100 != 0) console.log(`${year} IS a leap year.`);
else if(year % 400 != 0) console.log(`${year} is NOT a leap year.`);
else console.log(`${year} IS a leap year.`);
```
- 프로그램안에서 이 코드를 여러번 실행하야 한다면? 그 후에 특정 부분을 추가하거나 수정해야 한다면?
- 자바스크립트에서는 함수를 사용하여 해당 문제 해결
```javascript
function printLeapYearStatus() {
    const year = new Date().getFullYear();
    if(year % 4 !== 0) console.log(`${year} is NOT a leap year.`);
    else if(year % 100 != 0) console.log(`${year} IS a leap year.`);
    else if(year % 400 != 0) console.log(`${year} is NOT a leap year.`);
    else console.log(`${year} IS a leap year.`);
}
```
- 함수의 이름은 다른 사람, 또는 나중에 이 코드를 다시 볼 당신을 위해 정하는 것
- 너무 길지 않게, 그렇다고 의미를 알아채기 어렵도록 너무 짧게 하지 않는 수준에서 이름을 정해야 함

## 값을 반환하는 서브루틴으로서의 함수
- `printLeapYearStatus` 함수는 잘 동작하지만, 프로그램이 커지면 콘솔에 기록하는 것은 곧 쓸모 없어짐
- HTML에 출력하거나, 파일에 저장하거나, 다른 계산에 사용해야 할 수도 있는데 지금 가진 함수는 그렇게 활용할 수 없음
- 값을 반환하도록 변경해야 함
```javascript
function isCurrentYearLeapYear() {
    const year = new Date().getFullYear();
    if(year % 4 !== 0) return false;
    else if(year % 100 != 0) return true;
    else if(year % 400 != 0) return false;
    else return true;
}
```
- 함수의 반환값을 활용하는 예
```javascript
const daysInMonth = 
    [31, isCurrentYearLeapYear() ? 29 : 28, 31, 30, 31, 30, 
        31, 31, 30, 31, 30, 31];
if(isCurrentYearLeapYear()) console.log('It is a leap year.');
```

## 함수로서의 함수
- 입력은 모두 어떤 결과와 관계되어 있음
- 이렇게 함수의 수학적인 정의에 충실한 함수를 순수한 함수(pure function)라 부름
- 순수한 함수에서는 입력이 같으면 결과도 반드시 같음
```javascript
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
let colorIndex = -1;
function getNextRainbowColor() {
    if(++colorIndex >= colors.length) colorIndex = 0;
    return colors[colorIndex];
}
```
- `getNextRainbowColor` 함수는 호출할 때마다 무지개의 일곱 가지 샊갈을 하나씩 반환
- 이 함수는 순수한 함수의 두 가지 정의를 모두 어김
- 입력이 같아도 결과가 항상 다르고, 변수 `colorIndex`를 바꾸는 부수 효과도 있음
- 윤년 문제로 돌아가서 이 함수를 순수한 함수로 고치려면?
```javascript
function isLeapYear(year) {
    if(year % 4 !== 0) return false;
    else if(year % 100 != 0) return true;
    else if(year % 400 != 0) return false;
    else return true;
}
```
- `getNextRainbowColor`함수를 순수한 함수로 고치려면?
```javascript
const getNextRainbowColor = (function() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    let colorIndex = -1;
    return function() {
        if(++colorIndex >= colors.length) colorIndex = 0;
        return colors[colorIndex];
    };
})();
```
- 부수 효과는 없어졌지만, 아직은 입력이 같아도 결과가 다를 수 있음
- 이터레이터를 사용한다면 해당 결과값이 이터레이터로 반환되므로 항상 같은 것을 반환함
```javascript
function getRainbowIterator() {
    onst colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    let colorIndex = -1;
    return {
        next() {
            if(++colorIndex >= colors.length) colorIndex = 0;
            return { value: colors[colorIndex], done: false };
        }
    };
}
```
- 결국 `next()` 메서드는 매번 다른 값을 반환할 테니, 문제를 뒤로 미뤘을 뿐 아니냐고 생각할 수 있지만 `next()`는 함수가 아니라 메서드임. 메서드는 자신이 속한 객체라는 컨텍스트 안에서 동작하므로 메서드의 동작은 그 객체에 의해 좌우됨
- 프로그램의 다른 부분에서 `getRainbowIterator`를 호출하더라도 독립적인 이터레이터가 생성되므로 다른 이터레이터를 간섭하지 않음

## 그래서?
- 왜 함수를 사용할까? 반복을 없애기 위해..
- 자주 사용하는 동작을 하나로 묶을 수 있다
- 순수한 함수를 권장

#### 함수도 객체다
- typeof를 사용하면 "function"이 반환

## IIFE와 비동기적 코드
- IIFE (즉시 호출하는 함수 표현식)
- IIFE를 이용해서 클로저를 만들 수 있음
- IIFE를 사용하는 사례 중 하나는 비동기적 코드가 정확히 동작할 수 있도록 새 변수를 새 스코프에 만드는 것
- 5초에서 시작하고 카운트다운이 끝나면 "go"를 표시하는 타이머 예제
```javascript
var i;
for(i=5; i>=0 i--) {
    setTimeout(function() {
        console.log(i===0 ? "go" : i);
    }, (5-i)*1000);
}
```
- `let`대신 `var`를 쓴 이유는 IIFE가 중요하던 시점으로 돌아가서 왜 중요했는지 이해하기 위함
- `5,4,3,2,1, go`가 출력될 거라 예상했다면 틀렸음. `-1`만 6번 출력됨
- `setTimeout`에 전달된 함수가 루프 안에서 실행되지 않고 루프가 종료된 뒤에 실행됐기 때문
- `let`을 사용해 블록 수준 스코프를 만들면 해결되지만, 비동기적 프로그래밍에 익숙하지 않다면 정확히 이해해야 함
- 블록 스코프 변수가 도입되기 전에는 이런 문제를 해결하기 위해 함수 하나 더 썼음
- 함수를 하나 더 쓰면 스코프가 새로 만들어지고 각 단계에서 i의 값이 클로저에 캡처됨
```javascript
function loopBody(i) {
    setTimeout(function() {
        console.log(i===0 ? "go" : i);
    }, (5-i)*1000);
}
var i;
for(i=5; i>=0; i--) {
    loopBody(i);
}
```
- 루프의 각 단계에서 `loopBody`함수가 호출됨
- 자바스크립트는 매개변수를 값으로 넘김
- 따라서 루프의 각 단계에서 함수에 전달되는 것은 변수 i가 아니라 i의 값
- 스코프가 7개 만들어졌고, 변수도 7개 만들어졌다는 부분이 중요
- 루프에 한 번 쓰고 말 함수에 일일이 이름을 붙이는 건 성가신 일
- 익명 함수를 만들어 즉시 호출하는 IIFE를 사용하는 게 더 나음
```javascript
var i;
for(i=5; i>=0; i--) {
    (function() {
        setTimeout(function() {
            console.log(i===0 ? "go" : i);
        }, (5-i)*1000);
    })(i);
}
```
- 블록 스코프 변수를 사용하면 스코프 하나 때문에 함수를 새로 만드는 번거로운 일을 하지 않아도 됨
```javascript
for(let i=5; i>=0; i--) {
    setTimeout(function() {
        console.log(i===0 ? "go" : i);
    }, (5-i)*1000);
}
```
- `let`키워드를 for루프 바깥에 썼다면 똑같은 문제가 발생했을 것
- `let`키워드를 이렇게 사용하면 루프의 단계마다 변수 i의 복사본을 새로 만듬
- 따라서 `setTimeout`에 전달된 함수가 실행될 때는 독립 스코프에서 변수를 받음
  
## 변수로서의 함수

- 함수를 가리키는 변수를 만들어 별명을 정할 수 있음
- 배열에 함수를 넣을 수 있음(다른 타입의 데이터와 섞일 수 있음)
- 함수를 객체의 프로퍼티로 사용할 수 있음
- 함수를 함수에 전달할 수 있음
- 함수를 매개변수로 받는 함수를 반환하는 것도 가능
```javascript
function addThreeSquareAddFiveTakeSquareRoot(x) {
    return Math.sqrt(Math.pow(x+3, 2)+5);
}

// 별명 쓰기 전
const answer = (addThreeSquareAddFiveTakeSquareRoot(5) + 
    addThreeSquareAddFiveTakeSquareRoot(2)) /
    addThreeSquareAddFiveTakeSquareRoot(7);

// 별명 사용
const f = addThreeSquareAddFiveTakeSquareRoot;
const answer = (f(5) + f(2)) / f(7);
```
- 별명 붙일 때 `addThreeSquareAddFiveTakeSquareRoot`뒤에 괄호를 붙이지 않았음
- 괄호를 붙이면 함수를 호출하고, f에 함수 결과가 저장됨

```javascript
const Money = require('math-money');    // require는 라이브러리를 불러오는 노드 함수
const oneDollar = Money.Dollar(1);

// Money.Dollar도 길게 느껴지면
const Dollar = Money.Dollar;
const twoDollars = Dollar(2);
// Dollar와 twoDollars는 같은 타입의 인스턴스
```

#### 배열 안의 함수
- 자주하는 일을 한 셋으로 묶는 파이프라인 예제
- 배열을 사용하면 작업 단계를 언제든 쉽게 바꿀 수 있다는 장점
- 그래픽 변형을 예로 들어보면 시각화 소프트웨어를 만들 때는 변형을 파이프라인으로 묶어서 적용할 때가 많음
```javascript
const sin = Math.sin;
const cos = Math.cos;
const theta = Math.PI/4;
const zoom = 2;
const offset = [1, -3];

const pipeline = [
    function rotate(p) {
        return {
            x: p.x * cos(theta) - p.y * sin(theta),
            y: p.x * sin(theta) - p.y * cos(theta),
        };
    },
    function scale(p) {
        return { x: p.x * zoom, y: p.y * zoom };
    },
    function translate(p) {
        return { x: p.x + offset[0], y: p.y + offset[1]; };
    },
];

// pipeline은 2D변형에 필요한 함수의 배열
// 점 하나를 변형해 보면
const p = { x: 1, y: 1 };
let p2 = p;
for(let i=0; i<pipeline.length; i++) {
    p2 = pipeline[i][p2];
}

// p2는 이제 P1을 좌표 원점 기준으로 45도 회전하고
// 원점에서 2 단위만큼 떨어뜨린 후
// 1단위 오른쪽, 3단위 아래쪽으로 움직인 점입니다.
```
- 파이프라인의 각 함수를 호출할 때 사용한 문법을 보면 pipeline[i]는 파이프라인의 i번째 요소에 접근하고, 그 요소는 함수로 평가
- 각 함수에 점을 전달하고, 반환값을 다시 그 점에 할당

#### 함수에 함수 전달

- 함수에 함수를 전달하는 다른 용도는 비동기적 프로그래밍
- 이런 용도로 전달하는 함수를 보통 콜백이라 부르며 약자로 cb라 씀
- 콜백 함수는 자신을 감싼 함수가 실행을 마쳤을 때 호출됨
- 함수는 동작이고, 함수를 받은 함수는 그 동작을 활용할 수 있음
```javascript
function sum(arr, f) {
    // 함수가 전달되지 않았으면 매개변수를 그대로 반환하는 null 함수를 씀
    if(typeof f != 'function') f = x => x;

    return arr.reduce((a, x) => a += f(x), 0);
}
sum([1, 2, 3]);                         // (6)
sum([1, 2, 3], x => x*x);               // 제곱을 합해서 반환하는 함수 (14)
sum([1, 2, 3], x => Math.pow(x, 3));    // 세제곱을 합해서 반환하는 함수 (36)
```
- 함수를 넘기지 않고 `sum`을 호출했을 때 `if`문이 없다면 매개변수 `f`의 값은 undefined이므로 에러가 발생
- 에러를 방지하기 위해 위의 예제처럼 `if`문을 사용하면 함수가 아닌 것은 `null 함수`. 즉, 아무 일도 하지 않는 것으로 변경 함(null함수 f에 5를 넘기면 그대로 5를 반환)

#### 함수를 반환하는 함수

- `sum`함수를 다시 보면 이 함수는 각 요소를 더하기 전에 해당 요소를 바꾸는 함수를 받음
- 배열과 함수를 받는 함수로는 만족스런 결과를 얻을 수 없고, 배열 하나만 받아서 제곱의 합을 반환하는 함수가 필요하다고 하면
- 이미 만들어 둔 `sum`함수를 활용하여 아래와 같은 함수를 생성
```javascript
function sumOfSquares(arr) {
    return sum(arr, x => x*x);
}
```
- 필요한 것이 함수 하나라면 위와 같이 해도 됨
- 하지만 제곱근의 합을 구하는 함수, 세제곱의 합을 구하는 함수, 이런식으로 패턴이 반복 된다면 필요한 함수를 반환하는 함수를 만들어 문제를 해결할 수 있음
```javascript
function newSummer(f) {
    return arr => sum(arr, f);
}
```
```javascript
const sumOfSquares = newSummer(x => x*x);
const sumOfCubes = newSummer(x => Math.pow(x, 3));
sumOfSquares([1, 2, 3]);        // 14
sumOfCubes([1, 2, 3]);          // 36
```
- 위 예제처럼 매개변수 여러 개를 받는 함수를 매개변수 하나만 받는 함수로 바꾸는 것을 `커링`이라 부름

## 재귀

- 재귀란 자기 자신을 호출하는 함수
- 같은 일을 반복하면서 그 대상이 점차 줄어드는 상황에서 유용하게 쓰임
- 건초 더미에서 바늘을 찾는 예제를 살펴보면
    1. 건초 더미에서 바늘이 보이면 3단계로 이동한다.
    2. 건초 더미에서 건초를 하나 덜어낸다. 1단계로 이동한다.
    3. 찾았다.
- 바늘을 찾을 때까지 건초 더미에서 건초를 하나씩 제외하는 소거법이며, 재귀이다.
```javascript
function findNeedle(haystack) {
    if(haystack.length == 0) return "no haystack here!";
    if(haystack.shift() === 'needle') return "found it!";
    return findNeedle(haystack);    // 건초더미에 들어있는 건초가 하나 줄어듬
}

findNeedle(['hay', 'hay', 'hay', 'hay', 'needle', 'hay', 'hay']);
```
- 이 함수는 모든 가능성을 전부 고려
- 경우의 수는 haystack이 비어있거나, 배열의 첫 번째 요소가 바늘이거나, 바늘이 아닌 경우
- 마지막은 배열의 어딘가에 바늘이 들어있을 테니 `Array.prototype.shift`로 배열의 첫 번째 요소를 제거하고 함수를 반복
- 재귀 함수에는 종료 조건이 있어야 함
- `findNeedle`에는 두가지 종료 조건이 있음
    - 바늘을 찾거나
    - 배열이 비어 있거나
- 호출할 때마다 배열의 길이가 줄어들므로 언젠가는 두 조건 중 하나를 만족하게 됨
- 숫자의 계승(factorial)을 찾는 예제
```javascript
function fact(n) {
    if(n === 1) return 1;
    return n * fact(n-1);
}
```
- 이 함수의 종료 조건은 `n === 1`이고, 재귀 호출할 때마다 숫자 n은 1씩 줄어 들다가 결국 1이 됨

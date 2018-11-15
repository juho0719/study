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


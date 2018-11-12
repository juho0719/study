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




# 리터럴과 변수, 상수, 데이터 타입

## 변수와 상수
- 언제든 바뀔 수 있는 값 (let은 ES6에서 생김, 그전에는 var키워드만 가능)
```javascript
let currentTempC = 22;  // 섭씨온도
```
- `let`은 변수 선언에만 쓰이고, 한 번만 선언할 수 있음. 값 변경 시 `let`없이 사용
```javacript
currentTempC = 22.5;
```
- 변수 선언시 초기값이 필수는 아니지만, 선언하지 않으면 `undefined` 할당
```javascript
let targetTempC;    // let targetTempC = undefined; 와 같음
```
- `let`문 하나에 여러개 변수 선언 가능
```javascript
// targetTempC = undefined
let targetTempC, room1 = "conference_room_a", room2 = "lobby";
```
- ES6에서 상수 생김. 값을 할당 받을 수 있지만, 한번 할당한 값을 변경할 수 없음
```javascript
const ROOM_TEMP_C = 21.5, MAX_TEMP_C = 30;
```
- 보통 상수는 대문자와 밑줄만 사용

## 변수와 상수 중 어떤 것을 써야 할까요?
- 상수는 실수로라도 값을 바꾸면 안되는 데이터
- 값이 자주 변경되거나, 시간이 지나면서 값이 바뀌는 경우에는 변수 사용

## 식별자 이름
- 변수, 상수, 함수 이름을 식별자(identifier)라 부름
- 식별자 규칙
    - 식별자는 반드시 글자나 달러 기호($), 밑줄(_)로 시작해야 한다.
    - 식별자에는 글자와 숫자, 달러 기호, 밑줄만 쓸 수 있다.
    - 유니코드 문자도 쓸 수 있다.
    - 예약어는 식별자로 쓸 수 없다.
- 자바스크립트는 특이하게 $를 식별자로 사용
- 식별자 표기법은 크게 두가지
    - 카멜 케이스 : 첫글자를 소문자로 시작하여 새로운 단어의 시작을 대문자로 작성 (예: currentTempC)
    - 스네이크 케이스 : 단어와 단어 사이에 밑줄(_)을 넣어 완성 (예: current_temp_c)
- 무엇을 쓰든 상관없으나, 하나만 사용하여 일관성이 지켜야 함
- 식별자 생성시 고려사항
    - 식별자를 대문자로 시작해서는 안됨. (예외: 클래스)
    - 밑줄 한 개 또는 두 개로 시작하는 식별자는 특별한 상황, 또는 '내부'변수에서만 사용
    - 제이쿼리를 사용할 경우, 달러 기호로 시작하는 식별자는 보통 제이쿼리 객체라는 의미

## 리터럴

- 앞서 설명에서 사용한 `currentTempC = 22` 중 `22`를 숫자형 리터럴, 값이 문자형일땐 문자형 리터럴
- 쉽게 말해 값을 담는 곳은 식별자, 값은 리터럴을 의미
```javascript
let roo1 = "conference_room_a";     // "conference_room_a"가 리터럴
let currentRoom = room1;            // currentRoom값은 room1의 값과 같음
currentRoom = conference_room_a     // 에러, conference_room_a라는 식별자 x
```

## 원시타입과 객체
- 자바스크립트의 값은 원시 값(primitive), 또는 객체(object)이다.
- 원시 타입은 불변(immutable)
- "alpha" + "omega" 와 "alphaomega"는 서로 다른 문자열
- 원시 타입 종류
    - 숫자
    - 문자열
    - 불리언
    - null
    - undefined
    - 심볼(symbol)
- 불변이란 말이 변수의 값이 바뀔 수 없다는 건 아님
```javascript
let str = "hello";  // str의 값에 hello 할당
str = "world";      // str의 값을 wolrd로 변경
```
- 객체 타입 종류
    - Array
    - Date
    - RegExp
    - Map과 WeekMap
    - Set과 WeakSet

## 숫자


# 날짜와 시간

- 자바스크립트의 `Date`객체는 잘 만들어졌다고 볼 수 없음
- 여기서는 `Moment.js`를 사용

## 날짜, 타임존, 타임스탬프, 유닉스 시간
- 자바스크립트에서 Date인스턴스는 모두 유닉스 시간 원점(Unix Epoch)으로부터 몇 밀리초가 지났는지 나타내는 숫자
- 보통 이 숫자를 사람이 읽기 편한 그레고리력 날짜로 변환
- 숫자형 표현이 필요하면 `valueOf()`를 사용하면 됨
```javascript
const d = new Date();
console.log(d);             // 그레고리력 날짜
console.log(d.valueOf());   // 유닉스 타임스탬프
```

## Date 객체 만들기
- 4가지 방법으로 만들수 있음
```javascript
new Date();         // 현재 날짜

// 자바스크립트의 월은 0으로 시작(0이 1월)
new Date(2018, 0);                      // 2018년 1월 1일 0시
new Date(2018, 1);                      // 2018년 2월 1일 0시
new Date(2018, 1, 14);                  // 2018년 2월 14일 0시
new Date(2018, 1, 14, 13);              // 2018년 2월 14일 13시
new Date(2018, 1, 14, 13, 30);          // 2018년 2월 14일 13시 30분
new Date(2018, 1, 14, 13, 30, 5);       // 2018년 2월 14일 13시 30분 5초
new Date(2018, 1, 14, 13, 30, 5, 500);  // 2018년 2월 14일 13시 30분 5.5초

// 유닉스 타임스탬프
new Date(0);                            // 1970년 1월 1일 12시
new Date(1000);                         // 1970년 1월 1일 12시 0분 1초
new Date(1463443200000);                // 2016년 5월 16일 17시

// 유닉스 시간 원점 이전의 날짜 구할 때
new Date(-365*24*60*60*60*1000);        // 1969년 1월 1일 12시

// 날짜 문자열 해석(표준시 기준)
new Date('June 14, 1903');              // 1903년 6월 14일 12시 (지역표준시)
new Date('June 14, 1903 GMT-0000');     // 1903년 6월 14일 12시 (UTC)
```

## Moment.js
- 타임존을 지원하는 버전과 지원하지 않는 버전 두 가지가 있음
- CDN을 통해 불러올 수 있음
```html
<script src="//cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.4.0/moment-timezone.min.js"></script>
```
- 노드를 사용할 때는 `npm install --save moment-timezone`으로 설치하고, `require`로 불러 옴
```javascript
const moment = require('moment-timezone');
```

## 날짜 데이터 만들기
#### 서버에서 날짜 생성하기
- 서버에서 날짜를 생성할 때는 타임존을 명시하는 편이 좋음
- 특정 타임존에 있는 서버에서 날짜를 생성할 때는 `moment.tz`를 써서 Date인스턴스를 만들면 타임존을 직접 변환할 필요가 없음
```javascript
// Moment.js에 넘기는 배열은 자바스크립트의 Date 생성자에 넘기는 매개변수와 같음
// 월은 0으로 시작
// toDate() 메서드는 Moments.js 객체를 자바스크립트 Date 객체로 변환함
const d = moment.tz([2018, 12, 2, 11, 1], 'America/Los_Angeles').toDate();
const s = moment.tz([2108, 12, 2, 11, 1], 'Asia/Seoul').toDate();
```

## 날짜 데이터 전송하기
- 자바스크립트에서 날짜를 전송하는 가장 확실한 방법은 JSON을 사용하는 것
- 날짜는 JSON에서 1:1 대칭이 되게 파싱할 수 없으므로 JSON 명세에는 날짜에 대한 데이터 타입을 정의하지 않았음
```javascript
const before = { d: new Date() };
before.d instanceof date        // true
const json = JSON.stringify(before);
const after = JSON.parse(json);
after.d instanceof date         // false
typeof after.d                  // "string"
```
- 즉, JSON으로 바로 날짜를 다룰 순 없지만, 전송된 문자열에서 날짜를 복구하는 것은 가능
```javascript
after.d = new Date(after.d);
after.d instanceof date         // true
```
- 일단 JSON으로 인코드된 날짜는 UTC
- 그리고 JSON으로 인코드된 문자열을 Date 생성자에 넘겨서 얻은 날짜는 사용자의 타임존을 기준으로 표시
- 문자열로 인코드하지 않고, `valueOf()`메서드로 얻은 숫자를 그냥 전송해도 됨
```javascript
const before = { d: new Date().valueOf() };
typeof before.d             // "number"
const json = JSON.stringify(before);
const after = JSON.parse(json);
typeof after.d              // "number"
const d = new Date(after.d);
```
- 다른 언어나 운영체제에서 제공하는 JSON라이브러리는 다르게 처리할 수 있으므로 다른 시스템과 날짜 데이터를 주고 받을 때는 그 시스템에서 날짜를 어떻게 직렬화하는지 알아둬야 함. 
- 이런 상황에서는 유닉스 타임스탬프를 주고 받는 편이 더 안전함.

## 날짜 형식


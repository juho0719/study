k# 리터럴과 변수, 상수, 데이터 타입

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
- 자바 스크립트는 10진수, 2진수, 8진수, 16진수의 네가지 숫자형 리터럴을 인식
- 소수점없는 정수, 소수점 있는 10진수, 지수 표기, 무한대, 음의 무한대, '숫자가 아님' 등등
```javascript
let count = 10;             // 숫자 리터럴. count는 더블이다.
const blue = 0x0000ff;      // 16진수. 16진수 ff는 10진수 255와 같다.
const unmask = 0o0022;      // 8진수. 8진수 22는 십진수 18과 같다
const roomTemp = 21.5;      // 10진수
const c = 3.0e6;            // 지수 (3.8 * 10^6 = 3,000,000)
const e = -1.6e-19;         // 지수 (-1.6 * 10^-19) = 0.00000000000000000016)
const inf = Infinity;
const ninff = -Infinity;
const nan = NaN;            // '숫자가 아님'
```
- 10진수, 16진수, 지수등 어떤 리터럴 형식을 사용하더라도 결국 숫자는 더블 형식으로 저장
- 숫자를 대응하는 Number 객체에는 숫자형 값에 해당하는 프로퍼티가 있음
```javascript
const small = Number.EPSILON;           // 1에 더했을 때 1과 구분되는 결과를 만들 수 있는 
                                        // 가장 작은 값. 근사치는 2.2e-16이다.
const bigInt = Number.MAX_SAFE_INTEGER; // 표현할 수 있는 가장 큰 정수
const max = Number.MAX_VALUE;           // 표현할 수 있는 가장 큰 숫자
const minInt = Number.MIN_SAFE_INTEGER; // 표현할 수 있는 가장 작은 정수
const min = Number.MIN_VALUE;           // 표현할 수 있는 가장 작은 숫자
const nInf = Number.NEGATIVE_INFINITY;  // -Infinity
const nan = Number.NaN;                 // NaN
const inf = Number.POSITIVE_INFINITY;   // Infinity
```

## 문자열
- 자바스크립트 문자열은 유니코드 텍스트
- 자바스크립트의 문자열 리터럴에는 작은따옴표, 큰따옴표, 백틱을 사용 (백틱은 ES6에서 도입)

#### 이스케이프
- 문자열중 작은따옴표가 있으면 문자열 리터럴로 큰따옴표를 사용하고, 반대의 경우는 반대로 사용하면 됨
```javascript
const dialog = 'Sam looked up, and said "hello, old friend!", as Max walked in.';
const imperative = "Don't do that!";
```
- 단, 둘다 문자열로 사용하는 경우에는 이스케이프(\)를 사용하면 해당 문자열을 사용할 수 있음
```javascript
const dialog1 = "He looked up and said \"don't do that!\" to Max.";
const dialog2 = 'He looked up and said "don\'t do that!" to Max.';
```
- 문자열에서 역슬래시(\)를 써야할 때는? (\\로 사용)
```javascript
const s = "In JavaScript, use \\ as an escape character in strings.";
```

## 특수문자
- 역슬래시(\)는 줄바꿈 문자와 같이 화면에 표시되지 않는 일부 특수문자나 임의의 유니코드 문자를 나타낼때도 사용

| 코드  | 설명 | 예제 |
|------|-----|-----|
| \n   | 라인 피드(ASCII/Unicode 10) 유닉스계열 줄바꿈 문자 | "Line1\nLine2" |
| \r   | 캐리지 리턴(ASCII/Unicode 13) 윈도우 줄바꿈 문자 | "Windows line 1\r\n Windows line2" |
| \t   | 탭(ASCII/Unicode 9) | "Speed:\t60kph" |
| \'   | 작은 따옴표 | "Don\'t" |
| \"   | 큰 따옴표 | 'Sam said \"hello\".' |
| \\\` | 백틱 (ES6) | \`New in ES6 : \\\` strings.\` |
| \$   | 달러 기호 (ES6) | \`New in ES6: ${interpolation}\` |
| \\\\ | 역슬래시 | "Use \\\\\\\\ to represent \\\\!" |
| \uXXXX | 임의의 유니코드 코드 포인트. 여기서 XXXX는 16진수 코드 포인트 | "De Morgan's law: \u2310(P \u22c0Q) \u21D4 (\u2310P) \u22c1 (\u2310Q)" |
| \xXX | 라틴-1 문자. 여기서 XX는 16진수 라틴-1 코드 포인트 | "\xc9p\xe9e is fun, but foil is more fun." |

- 라틴-1 문자셋은 유니코드의 부분집합. `\xXX`는 `\u00XX`와 같음
- \x, \u 모두 대소문자 가리지 않음 (\X, \U 써도 동일)
- 자주 쓰지 않는 특수문자
  
| 코드  | 설명 | 예제 |
|------|-----|-----|
| \0   | NUL 문자(ASCII/Unicode 0) | "ASCII NUL: \0" |
| \v   | 세로 탭(ASCII/Unicode 11) | "vertical tab: \v" |
| \b   | 백스페이스(ASCII/Unicode 8) | "Backspace: \b" |
| \f   | 폼 피드(ASCII/Unicode 12)  | "Form feed: \f" |

#### 템플릿 문자열

- 값을 문자열 안에 써야 할 경우 문자열 병합을 통해 변수나 상수를 문자열 안에 쓸 수 있음
```javascript
let currentTemp = 19.5;
// 00b0은 온도를 나타내는 유니코드 코드 포인트
const message = "The current temperature is " + currentTemp + "\u00b0C";
```
- ES6에서는 문자열 템플릿 기능을 도입, 정해진 위치에 값을 채워 넣어줌
```javascript
let currentTemp = 19.5;
const message = `The current temperature is ${currentTemp}\u00b0C`;
```

#### 여러 줄 문자열
- 여러줄 문자열에 줄바꿈 문자 삽입
```javascript
const multiline = "line1\n\
line2";
```
- 백틱을 사용하면 좀 더 보기 편함
```javascript
const multiline = `line1
line2`;
```
- 코드의 열을 맞추려 여러 줄 문자열을 사용한다면 원치 않는 문자까지 같이 들어옴 (탭 문자열)
```javascript
const multiline = `line1
    line2
    line3`;
```
- 문자열 병합을 통한 여러줄 문자열 사용 권장
```javascript
const multiline = "line1\n" +
    "line2\n" +
    "line3";
```
- 문자열 템플릿, 문자열 리터럴을 섞어 써도 무방
```javascript
const multiline = 'Current Temperature:\n' +
    `\t${currentTemp}\u00b0C\n` +
    "Don't worry... the heat is on!";
```

#### 숫자와 문자열
- 따옴표안의 숫자는 문자열이지만 경우에 따라 숫자로 바뀌는 경우가 있음
```javascript
const result1 = 3 + '30';   // 3이 문자열로 바뀜. 330
const result2 = 3 * '30';   // 30이 숫자로 바뀜. 90
```
- 숫자 표현시 따옴표를 사용하지 않는 것을 권장

## 불리언
- true와 false로 이루어져 있음
- 값에 따옴표를 넣지 않도록 주의 ("true", "false" 아님)
```javascript
let heating = true;
let cooling = false;
```

## 심볼
- 유일한 토큰을 나타냄 (ES6)
- 다른 어떤 심볼과 일치하지 않음
- 항상 유일하다는 점을 제외하면 원시 값의 특징을 모두 가지고 있음
- 심볼은 Symbol() 생성자로 만듦
```javascript
const RED = Symbol("The color of a sunset!");
const ORANGE = Symbol("The color of a sunset!");
RED === ORANGE  // false : 심볼은 모두 서로 다름
```
- 고유한 식별자가 필요하다면 심볼을 사용

## null과 undefined
- 자바스크립트의 특별한 타입
- null과 undefined 모두 존재 하지 않는 것을 나타냄
```javascript
let currentTemp;            // 암시적으로 undefined임
const targetTemp = null;    // 대상 온도는 null, 즉 "아직 모르는" 값
currentTemp = 19.5;         // 19.5로 값을 넣음
currentTemp = undefined;    // currentTemp는 초기화되지 않은 값. 권장하지 않음
```

## 객체
- 객체의 본질은 컨테이너
- 컨테이너의 내용물은 시간이 지나면서 바뀔 수 있지만, 내용물이 바뀐다고 컨테이너가 바뀌는 것은 아님
```javascript
const obj = {};
```
- 객체의 컨텐츠는 프로퍼티 or 멤버라 불림
- 프로퍼티는 Key-Value형태로 구성
- 프로퍼티 이름은 반드시 문자열 또는 심볼이어야 하며, 값은 어떤 타입이든 상관없고 객체도 가능
```javascript
obj.color = "yellow";
```
- 프로퍼티 이름에 유효한 식별자를 써야 멤버 `접근 연산자(.)`을 사용할 수 있음
- 프로퍼티 이름에 유효한 식별자가 아닌 이름을 쓴다면 `계산된 멤버 접근 연산자([])`를 써야 함
- 프로퍼티 이름이 유효한 식별자여도 `[]`로 접근할 수 있음
```javascript
obj["not an identifier"] = 3;
obj["not an identifier"];       // 3
obj["color"];                   // yellow
```
- 심볼 프로퍼티 접근할 때도 `[]` 사용
```javascript
const SIZE = Symbol();
obj[SIZE] = 8;
obj[SIZE];      // 8
```
- 콘솔에서 보면 `SIZE`를 obj의 프로퍼티로 나열하지 않고 있는데 실제로 `obj[SIZE]`를 확인해 보면 obj의 프로퍼티로 나옴. 이처럼 심볼은 기본적으로 표시되지 않고 다르게 처리됨
- 객체 리터럴 문법에서는 객체를 만드는 동시에 프로퍼티를 만들 수 있음
```javascript
const sam1 = {
    name: 'Sam',
    age: 4,
};

const sam2 = { name: 'Sam', age: 4 };   // 한 줄로 선언

const sam3 = {
    name: 'Sam',
    classification: {                   // 프로퍼티 값도 객체가 될 수 있음
        kingdom: 'Anamalia',
        phylum: 'Chordata',
        class: 'Mamalia'
        order: 'Carnivoria',
        family: 'Felidae',
        subfamily: 'Felinae',
        genus: 'Felis',
        species: 'catus',
    },
};
```
- 위 예제에서 sam1과 sam2는 다른 객체 (프로퍼티만 같음)
- sam3가 family에 접근하는 방법
```javascript
sam3.classification.family;         // "Felidae"
sam3["classification"].family;      // "Felidae"
sam3.classification["family"];      // "Felidae"
sam3["classification"]["family"];   // "Felidae"
```
- 객체에 함수를 담을 수도 있음
```javascript
sam3.speak = function() { return "Meow!"; };
```
- 프로퍼티를 제거할 때는 `delete`연산자 사용
```javascript
delete sam3.classification;     // classification 트리 전체가 삭제
delete sam3.speak;              // speak 함수가 삭제
```

## Number, String, Boolean 객체
- 숫자, 문자열, 불리언에는 각각 대응하는 객체 타입 Number, String, Boolean으로 구성
- 두가지 목적이 있음
- Number.INFINITY같은 특별한 값을 저장
- 함수 형태로 기능 제공
```javascript
const s = "hello";
s.toUpperCase();    // "HELLO"
```

## 배열
- 배열은 항상 순서가 있고, 키는 순차적인 숫자
- 배열 크기는 고정되어 있지 않음. 언제든 요소 추가 및 삭제 가능
- 요소의 데이터타입을 가리지 않음
- 배열 요소는 0으로 시작
- 배열 리터럴은 대괄호안에 배열 요소를 쉼표로 구분하여 씀
```javascript
const a1 = [1, 2, 3, 4];
const a2 = [1, 'two', 3, null];
const a3 = [
    "What the hammer? Waht the chain?",
    "In what furnace was thy brain?",
    "What the anvil? What dread grasp",
    "Dare its deadly terrors clasp?",
];
const a4 = [
    { name: "Ruby", hardness: 9 },
    { name: "Diamond", hardness: 10 },
    { name: "Topaz", hardness: 8 },
];
const a5 = [
    [1, 3, 5],
    [2, 4, 6],
];
```
- 배열에는 요소 숫자를 반환하는 length 프로퍼티가 있음
```javascript
const arr = ['a', 'b', 'c'];
arr.length;     // 3
```
- 배열 요소에 접근할 때는 대괄호 안에 요소의 인덱스 숫자를 사용
```javascript
const arr = ['a', 'b', 'c'];

// 첫번째 요소를 가져옴
arr[0];                 // 'a'
// arr의 마지막 요소의 인덱스는 arr.length-1
arr[arr.length - 1];    // 'c'
```
- 배열 요소의 값을 덮어쓸 때는 새 값을 할당하면 됨
```javascript
const arr = [1, 2, 'c', 4, 5];
arr[2] = 3;     // arr은 이제 [1, 2, 3, 4, 5] 임
```

## 객체와 배열 마지막의 쉼표
- 여러 행에 나눠 썼을 때 마지막에 쉽표가 붙어있음
- 이런 마지막 쉼표를 trailing comma, dangling comma, terminal comma 등으로 부름
```javascript
const arr = [
    "One",
    "Two",
    "Three",
];
const o = {
    one: 1,
    two: 2,
    three: 3,
};
```
- 자바스크립트는 마지막 쉼표를 허용함 (단, json은 허용하지 않음)

## 날짜
- 자바스크립트에서 날짜와 시간은 내장된 Date 객체에서 담당
- 현재 날짜와 시간을 나타내는 객체를 만들 때 `new Date()` 사용
- 특정 날짜에 해당하는 객체를 만들 때
```javascript
const halloween = new Date(2018, 9, 31);    // 월은 0에서 시작하기 때문에 9를 씀
```
- 특정 날짜와 시간에 해당하는 객체를 만들 때
```javascript
const halloweenParty = new Date(2018, 9, 31, 19, 0);    // 19:00
```
- 날짜 객체는 다음과 같은 값들을 가져올 수 있음
```javascript
halloweenParty.getFullYear();       // 2018
halloweenParty.getMonth();          // 9
halloweenParty.getDate();           // 31
halloweenParty.getDay();            // 3 (수요일, 0이 일요일)
halloweenParty.getHours();          // 19
halloweenParty.getMinutes();        // 0
halloweenParty.getSeconds();        // 0
halloweenParty.getMilliseconds();   // 0
```

## 정규 표현식
- regex, regexp라 씀
- 문자열에 필요한 복잡한 검색과 교체 작업을 비교적 단순하게 만듦
- 자바스크립트의 정규표현식은 RegExp 객체를 사용
- 슬래시 한 쌍(/.../) 사이에 심볼을 넣는 리터럴 문법도 있음
```javascript
// 간단한 이메일 정규표현식
const email = /\b[a-z0-9._-]+@[a-z_-]+(?:\.[a-z]+)+\b/;

// 미국 전화번호 정규표현식
const phone = /(:?\+1)?(:?\(\d{3}\}\s?|\d{3}[\s-]?)\d{3}[\s-]?\d{4}/;
```

# 맵과 셋
- ES6에서는 Map과 Set, WeakMap과 WeakSet을 도입

## 데이터 타입 변환

#### 숫자로 바꾸기
- Number 객체 생성자 사용
```javascript
const numStr = "33.3";
const num = Number(numStr);     // 숫자로 변환, Number객체의 인스턴스가 아님
```
- 숫자로 바꿀 수 없는 문자열엔 NaN이 반환
- parseInt나 parseFloat함수를 사용
- parseInt를 사용할 때 기수값을 넘겨 몇 진수인지 지정가능
- parseInt와 parseFloat 모두 숫자로 판단할 수 있는 부분까지만 변환, 그 뒤는 무시
```javascript
const a = parseInt("16 volts", 10);     // 16, volts는 무시
const b = parseInt("3a", 16);           // 16진수 3a를 10진수로 변환 -> 58
const c = parseFloat("15.5 kph");       // kph는 무시, parseFloat은 기수가 항상 10이라 가정
```
- Date 객체를 숫자로 변환할 때는 valueOf() 메소드를 사용
```javascript
const d = new Date();
const ts = d.valueOf();     // 1970년 1월 1일 자정으로 부터 몇 밀리초가 지났는지 나타냄
```
- 불리언 값 변환은 조건 연산자를 사용
```javascript
const b = true;
const n = b ? 1 : 0;
```

#### 문자열로 변환
- toString()
- 문자열 병합에서 자동으로 숫자를 문자열로 변환하므로 직접 바꿀 일은 많지 않음
```javascript
const n = 33.5;         // 숫자
const s = n.toString()  // 문자열
```
- 객체의 문자열로 `[object Object]`와 같이 쓸모 없는 문자열로 반환
- 배열의 문자열은 상대적으로 보기 좋게 나옴
```javascript
const arr = [1, true, "hello"];
arr.toString();     // "1,true,hello"
```

#### 불리언으로 변환
- 부정(!) 연산자를 써서 모든 값을 불리언으로 바꿀 수 있음
- 부정 연산자를 한번 사용하면 false, 한번 더 쓰면 true
```javascript
const n = 0;            // 거짓을 나타내는 값
const b1 = !!n;         // false
const b2 = Boolean(n);  // false
```

## 요약
- 자바스크립트에는 문자열, 숫자, 불리언, null, undefined, 심볼의 여섯가지 원시 타입과 객체 타입이 있음
- 자바스크립트의 모든 숫자는 배정도 부동소수점 숫자(double)임
- 날짜, 맵, 셋, 정규표현식 등은 자주 사용할 특수한 객체 타입


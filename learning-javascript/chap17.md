# 정규표현식
- 정교한 문자열 매칭 기능 제공

## 부분 문자열 검색과 대체
- 큰 문자열 안에 원하는 부분 문자열이 존재하는지 찾기만 하면 될 때는 `String.prototype`메서드로 충분
```javascript
const input = "As I was going to Saint Ives";
input.startsWith("As")          // true
input.endsWith("Ives")          // true
input.startsWith("going", 9)    // true -- 인덱스 9에서 시작
input.endsWith("going", 14)     // true -- 인덱스 14를 문자열의 끝으로 간주
input.includes("going")         // true
input.includes("going", 10)     // false -- 인덱스 10에서 시작하면 going이 없음
input.indexOf("going")          // 9
input.indexOf("going", 10)      // -1
input.indexOf("nope")           // -1
```
- 모두 대소문자 구분
- 대소문자 구분하지 않으려면 모두 소문자로 바꾸거나 대문자로 변경해야 함
```javascript
input.toLowerCase().startsWith("as")    // true
```
- `String.prototype.toLowercase`는 원래 문자열은 그대로 두고 새 문자열을 반환
- 자바스크립트 문자열은 항상 불변
- 부분 문자열을 찾아 교체하려면 `String.prototype.replace`사용
```javascript
const input = "As I was going to Saint Ives";
const output = input.replace("going", "walking");
```
- 원래 문자열 `input`은 바뀌지 않고 `output`에 할당
- `input`을 바꾸고 싶다면 새 문자열 `input`할당하면 됨

## 정규식 만들기
- 자바스크립트의 정규식은 ReqExp 클래스임
- RegExp 생성자로도 정규식을 만들 수 있지만 간편한 리터럴 문법도 있음
```javascript
const re1 = /going/;                // 단어 "going"을 찾을 수 있는 정규식
const re2 = new RegExp("going");    // 생성자를 사용한 부분이외에 위와 같음
```

## 정규식 검색
```javascript
const input = "As I was going to Saint Ives";
const re = /\w{3,}/ig;

// 문자열(input)의 메서드를 사용할 때
input.match(re);    // ["was", "going", "Saint", "Ives"]
input.search(re);   // 5 (세 글자 이상으로 이루어진 첫 단어의 인덱스는 5)

// 정규식(re)의 메서드를 사용할 때
re.exec(input);     // ["was"] (처음 일치하는 것)
re.exec(input);     // ["going"] (exec는 마지막 위치를 기억)
re.exec(input);     // ["Saint"] 
re.exec(input);     // ["Ives"] 
re.exec(input);     // null (일치하는 것이 없음)
re.test(input);     // true (input에는 세 글자 이상으로 이루어진 단어가 1개이상 있음)

// 위 예제는 모두 정규식 리터럴을 그대로 써도 됨
input.match(/\w{3,}/ig);
input.search(/\w{3,}/ig);
/\w{3,}/ig.test(input);
/\w{3,}/ig.exec(input);
// ...
```
- `String.prototype.match`와 `RegExp.prototype.test`가 자주 쓰이는 편

## 정규식을 사용한 문자열 교체
- `String.prototype.replace`에는 정규식 사용 가능
- 네 글자 이상으로 이루어진 단어를 모두 교체
```javascript
const input = "As I was going to Saint Ives";
const output = input.replace(/\w{4,}/ig, '****');   // "As I was **** to **** ****"
```

## 입력 소비
- 정규식을 `큰 문자열에서 부분 문자열을 찾는 방법`이라고만 생각해선 안됨
- 정규식이 입력 문자열을 소비하는 패턴
- LION, ION, NATURE, EEL을 찾는 정규식 예제
```
`X` J A N L I O N A T U R E J X E E L N P
(가능한게 없으니 X를 소비)
X `J` A N L I O N A T U R E J X E E L N P
(가능한게 없으니 J를 소비)
X J `A` N L I O N A T U R E J X E E L N P
(가능한게 없으니 A를 소비)
X J A `N` L I O N A T U R E J X E E L N P
(가능한게 없으니 N를 소비)
X J A N `L` I O N A T U R E J X E E L N P
(가능한게 있으니 L은 소비하지 않음)
X J A N L `I` O N A T U R E J X E E L N P
(가능한게 있으니 I는 소비하지 않음)
X J A N L I `O` N A T U R E J X E E L N P
(가능한게 있으니 O는 소비하지 않음)
X J A N L I O `N` A T U R E J X E E L N P
(일치하는 것을 찾음. 찾은 것을 전부 소비(LION))
... input 전체를 소비할 때 까지 계속
```
- 정규식이 문자열을 `소비`할 때 사용하는 알고리즘
    - 문자열 왼쪽에서 오른쪽으로 진행
    - 일단 소비한 글자에서 다시 돌아오는 일은 없음
    - 한 번에 한 글자씩 움직이며 일치하는 것이 있는지 확인
    - 일치하는 것을 찾으면 해당하는 글자를 한꺼번에 소비한 후 다음 글자로 진행(정규식에 /g플래그를 써서 전역으로 검색할 때 해당)

## 대체
- 대소문자가 통일되지 않은 HTML 태그를 찾으려면 대체(alternation)을 통해 가능
```javascript
const html = 'HTML with <a href="/one">one link</a>, and some Javascript.' + 
    '<script src="stuff.js">';
const matches = html.match(/area|a|link|script|source/ig);  // 첫 시도
```
- 파이프(|)는 대체를 뜻하는 메타 문자
- ig는 대소문자를 가리지 않고(i) 전체를(g) 검색하라는 뜻
- g플래그가 없으면 일치하는 것 중 첫 번째만 반환
- area를 a보다 먼저 쓴 이유는 정규식이 왼쪽에서 오른쪽으로 평가하기 때문. a를 먼저 썼다면 area를 찾더라도 a를 먼저 소비하므로 남은 rea는 어느 것에도 일치하지 않아 찾지 못함
- 이 예제를 실행하면 의도하지 않은 <a>안의 link, HTML 태그가 아닌 a도 나옴

## HTML 찾기
- 정규식으로는 HTML을 분석(parse)할 수 없음
- 100% 동작하는 것이 필요하다면 전용 파서를 찾아야 함
```javascript
const html = '<br> [!CDATA[[<br>]]';
const matches = html.match(/<br>/ig);
```
- 이 예제에서 진짜 <br>은 하나. 다른 하나는 HTML이 아닌 글자 데이터(CDATA)
- 정규식은 <p> 태그안에 <a>태그가 존재하는 것 같은 계층적 구조에 매우 취약

## 문자셋
- 글자 하나를 다른 것으로 대체(alternation)하는 방법을 간단하게 줄인 것
```javascript
const beer99 = "99 bottles of beer on the wall " +
    "take 1 down and pass it around -- " +
    "98 bottles of beer on the wall.";
const matches = beer99.match(/0|1|2|3|4|5|6|7|8|9/g);
```
- 위와 같은 방법은 숫자가 아니라 글자를 찾아야 한다면 다시 만들어야 함(좋은 방법이 아님)
- 위 예제는 아래와 같이 고쳐쓸 수 있음 
```javascript
const m1 = beer99.match(/[0123456789]/g);   // 가능 
const m2 = beer99.match(/[0-9]/g);          // 더 좋음
```
- 범위를 결합하는 것도 가능. 공백빼고 다 찾음
```javascript
const match = beer99.match(/[\-0-9a-z.]/ig);
```
- 순서는 중요하지 않음
- 하이픈은 이스케이프 해야 함
- 닫는 대괄호 바로 앞에 쓰는 하이픈은 이스케이프 하지 않아도 됨
- 문자셋은 특정 문자, 또는 범위를 제외(negate)하고 찾을 수도 있음
- 문자셋을 제외할 때는 다음과 같이 캐럿(^)을 맨 앞에 쓰면 됨
```javascript
const match = beer99.match(/[^\-0-9a-z.]/);
```
- 위 정규식은 원래 문자열에서 공백만 찾음

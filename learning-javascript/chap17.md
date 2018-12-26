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

## 자주 쓰는 문자셋
- 매우 자주 쓰이는 일부 문자셋은 단축 표기가 따로 있음 
- 이들을 클래스라 부름

|문자셋|동등한 표현|노트|
|---|---|---|
|\d|[0-9]|
|\D|[^0-9]|
|\s|[ \t\v\n\r]|탭, 스페이스, 세로 탭, 줄바꿈이 포함|
|\S|[^ \t\v\n\r]|
|\w|[a-zA-Z_]|하이픈과 마침표는 포함되지 않으므로<br> 이 문자셋으로 도메인 이름이나 CSS 클래스 등을 찾을 수는 없음|
|\W|[^a-zA-Z_]|

- 위 단축표 중 가장 널리 쓰이는 것은 공백문자셋(\s)
- 공백을 써서 줄을 맞추는 경우가 많기 때문
```javascript
const stuff = 
    'hight:     9\n' +
    'medium:    5\n' +
    'low:       2\n';
const levels = stuff.match(/:\s*[0-9]/g);
```
- `\s` 뒤에 있는 `*`는 '숫자는 상관없으며 없어도 된다'는 의미 
- `\D`의 경우 전화번호 형식을 통일하는 데 많이 사용 
```javascript
const messyPhone = '(505) 555-1515';
const neatPhone = messyPhone.replace(/\D/g, '');
```
- `\S`는 required 필드에 데이터가 있는 지 검사할 때 종종 사용 
```javascript
const field = '   something   ';
const valid = /\S/.test(field);
```

## 반복
- 반복(repetition) 메타 문자는 얼마나 많이 일치해야 하는지 지정할 때 사용
- 앞서 본 예제는 숫자 한 개를 찾았지만, 숫자 여러 개를 찾아야 한다면?
```javascript
const match = beer99.match(/[0-9][0-9][0-9][0-9][0-9][0-9]/);
```
- 자리 수가 늘어날 수록 매번 변경해야 한다는 단점
- 다음과 같이 변경하면 좀 더 나음
```javascript
const match = beer99.match(/[0-9]+/);
```
- 문자셋 다음의 `+`는 그 앞에 있는 요소가 하나 이상 있어야 한다는 뜻
- 반복 메타 문자에는 다섯 가지 종류가 있음 

|반복 메타 문자|설명|예제|
|---|---|---|
|{n}|정확히n개|/d{5}/는 새 우편번호처럼 정확히 다섯 자리 숫자에만 일치|
|{n,}|최소n개|/\d{5,}/는 다섯 자리 이상의 숫자에만 일치|
|{n, m}|n개 이상, m개 이하|/\d{2,5}/는 2개, 3개, 4개, 5개에 일치|
|?|0개 또는 1개. {0,1}과 동일|/[a-z]\d*/i는 글자가 있고 그 다음에 숫자가 없거나 있는 경우 일치|
|*|숫자는 상관없으며 없어도 됨(클레이니 스타, 클로저)|/[a-z]\d*/i는 글자가 있고, 그 다음에 숫자가 없어나 있는 경우에 일치
|+|하나 이상|/[a-z]\d+/i는 글자가 있고 그 다음에 숫자가 한 개이상 있는 경우에 일치|

## 마침표와 이스케이프
- 정규식에서 마침표는 줄바꿈 문자를 제외한 모든 문자에 일치하는 특수 문자
- 입력이 어떤 문자든 상관하지 않고 소비하려 할 때 사용
- 문자열에서 우편번호만 필요할 때 사용하고 싶은 경우 아래와 같이
```javascript
const input = "Address: 333 Main St., Anywhere, NY, 55532. Phone: 555-555-2525.";
const match = input.match(/\d{5}.*/);
```
- 마침표 자체가 필요한 경우 이스케이프를 붙여 사용 
```javascript
const equation = "(2 + 3.5) * 7";
const match = equation.match(/\(\d \+ \d\.\d\) \* \d/);
```
- 정규식의 경우 `*`는 무엇이든 다 허용한다는 와일드카드와 의미가 다르므로 주의해야 함

#### 진정한 와일드카드
- 공백을 포함한 모든 문자 일치 [\s\S]

## 그룹
- 지금까지는 문자 단 한 개에 일치하는 것들을 주로 봄
- 그룹을 사용하면 그 그룹에 일치하는 결과를 나중에 쓸 수 있도록 캡쳐 할 수도 있음 
- 기본적으로 캡처하지 않는 그룹을 사용하길 권함
- 캡처하지 않는 그룹을 사용하면 성능상 장점이 있고, 일치하는 결과를 나중에 쓸 필요가 없다면 캡처하지 않는 그룹을 써야 함
- 캡처하지 않는 그룹은 (?:[subexpression])형태이고, 여기서 [subexpression]이 일치시켜려 하는 패턴
- 도메인 이름을 `.com` `.org` `.edu`만 찾는다고 가정하면 
```javascript
const test = "Visite oreilly.com today";
const math = test.match(/[a-z]+(?:\.com|\.org||\.edu)/i);
```
- 그룹도 반복 가능
- 반복은 일반적으로 반복 메타 문자의 바로 왼쪽에 있는 문자 하나에 적용되지만, 그룹을 사용하면 전체에 반복 적용 
- 자주 쓰이는 예제는 `http://` `https://` 로 시작하는 URL을 찾으려 한다면 그룹과 함께 0, 1개에 일치하는 메타 문자를 쓰면 됨
```javascript
const html = '<link rel="stylesheet" href="http://insecure.com/stuff.css">\n' +
    '<link rel="stylesheet" href="https://secure.com/securestuff.css">\n' +
    '<link rel="stylesheet" href="//anything.com/flexible.css">';

const matches = html.match(/(?:https?)?\/\/[a-z][a-z0-9-]+[a-z0-9]+/ig);
```
- 정규식 시작에는 캡처하지 않는 그룹 `(?:http?)?`
- 여기에는 0또는 1메타 문자가 두개 있음
- 그 중 처음은 's는 옵션이다'라는 뜻

## 소극적 일치, 적극적 일치
- 정규식은 기본적으로 적극적 일치
- 검색을 멈추기 전에 최대한 많이 찾으려고 함
- HTML텍스트에서 `<i>`태그를 `<strong>`으로 바꿔야 한다면
```javascript
const input = "Regex pros know the difference between\n" +
    "<i>greedy</i> and <i>lazy</i> matching.";
input.replace(/<i>(.*)<\/i>/ig, '<strong>$1</strong>');
```
- 교체 문자열 `$1`은 `.*`그룹에 일치하는 문자열로 바뀜
- 위와 같이 하면 우리 의도와는 다른 결과값이 나옴
```
"Regex pros know the difference between
<strong>greedy</i> and <i>lazy</strong> matching."
```
- 정규식은 일치할 가능성이 있는 동안은 문자를 소비하지 않고 계속 넘어감
- `<i>`를 만나면 `</i>`를 더는 찾을 수 없을 때까지 소비하지 않고 진행
- 원래 문자열에는 `</i>`가 두개 있으므로, 첫 번째 것은 무시하고 두 번째것에서 일치한다고 판단
- 반복 메타 문자 `*`뒤에 `?`를 붙이면 소극적으로 검색 
```javascript
input.replace(/<i>(.*?)<\/i>/ig, '<strong>$1</strong>');
```

## 역참조
- `XYYX` 형태의 이름을 찾는 다면? (PJJP, GOOG, ANNA와 같은)
```javascript
const promo = "Opening ofr XAAX is the dynamic GOOG! At the box office now!";
const bands = promo.match(/([A-Z])([A-Z])\2\1/g);
```
- 첫 번째 그룹이 X에 일치하고, 두 번째 그룹이 A에 일치한다면, `\2`는 A이고, `\1`은 X이다.
- 따옴표의 짝을 찾을 때 유용하게 쓰임
```javascript
// 작은 따옴표와 큰 따옴표를 모두 썼으므로 백틱으로 문자열 경계를 나타냄
const html = `<img alt='A "simple" example.'>` +
    `<img alt="Don't abuse it!">`;
const matches = html.match(/<img alt=(['"]).*?\1/g);
```

## 그룹 교체
- `<a>`태그에서 href가 아닌 속성을 전부 제거하려면?
```javascript
let html = '<a class="nope" href="/yep">Yep</a>';
html = html.replace(/<a .*?(href=".*?").*?>/, '<a $1>');
```
- 모든 그룹은 1로 시작하는 숫자를 할당
- 정규식에서 첫 번째 그룹은 `\1`이고 교체할 문자열에서는 `$1`이 첫 번째 그룹에 해당
- 소극적 일치를 써서 다른 `<a>`태그까지 검색이 확장되는 일을 막음
- href 속성의 값에 큰따옴표가 아니라 작은따옴표를 쓴 문자열에서는 아무것도 찾지 못함
- 이번엔 `class`속성과 `href`속성을 나믹고 나머지는 모두 없앤다면?
```javascript
let html = '<a class="yep" href="/yep" id="nope">Yep</a>';
html = html.replace(/<a .*?(class=".*?").*?(href=".*?").*?>/, '<a $2 $1>');
```
- 이 정규식에서는 `class`와 `href`의 순서를 바꾸므로 결과 문자열에서는 `href`가 앞에 옴
- `$1`, `$2`등 숫자로 참조하는 것 외에도 일치하는 것 앞에 잇는 전부를 참조하는 ``$` ``, 일치하는 것 자체인 `$&`, 일치하는 것 뒤에 있는 전부를 참조하는 `$'`도 있음
- 달러 기호가 필요할때는 `$$`를 사용
```javascript
const input = "One two three";
input.replace(/two/, '($`)');       // "One (One ) three"
input.replace(/two/, '($&)');       // "One (two ) three"
input.replace(/two/, "($')");       // "One ( three) three"
input.replace(/two/, '($$)');       // "One ($) three"
```

## 함수를 이용한 교체
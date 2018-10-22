# 표현식과 연산자
- 표현식은 값으로 평가될 수 있는 문(statement)
- 표현식이 아닌 문은 일종의 지시
- 표현식의 결과를 변수나 상수, 프로퍼티에 할당 가능
```javascript
let x;
x = 3 * 5;
```
- 표현식은 대부분 연산자 표현식
- 연산자 표현식이 아닌 표현식에는 식별자 표현식(변수와 상수 이름)과 리터럴 표현식이 있음

## 연산자
- 표현식이 값이 되는 것이라면 연산자는 값을 만드는 행동

## 산술 연산자
- 뺄셈과 단항 부정 모두 -를 사용
- 단항 부정이 먼저 이루어지고, 그 다음에 뺄셈을 함
```javascript
const x = 5;
const y = 3 - -x;   // 8
```
- 단항 플러스 연산자는 자주 사용하진 않지만, 문자열을 숫자로 강제 변환하는 경우나 세로 줄을 맞추고 싶을 때 드물게 사용
- 전위, 후위 차이 이해해야 함
```javascript
let x = 2;
const r1 = x++ + x++;
//      ((x++) + (x++))
//      ( 2 + (x++))        왼쪽에서 오른쪽으로 진행, x는 지금 3
//      ( 2 + 3 )           x는 지금 4
//      5                   결과는 5, x는 4
const r2 = ++x + ++x;
//      ((++x) + (++x))
//      ( 5 + (++x))        왼쪽에서 오른쪽으로 진행, x는 지금 5
//      ( 5 + 6 )           x는 지금 6
//      11                  결과는 11, x는 지금 6
const r3 = x++ + ++x;
//      ((x++) + (++x))     
//      ( 6 + (++x))        왼쪽에서 오른쪽으로 진행, x는 지금 7
//      ( 6 + 8 )           x는 지금 8
//      14                  결과는 14, x는 8
```

## 연산자 우선순위
```javascript
let x = 3, y;
x += y = 6*5/2
// 이 표현식을 우선순위에 따라 일어날 행동에 괄호를 사용하겠음
// 곱셈과 나눗셈. 우선순위 14, 왼쪽에서 오른쪽으로
//  x += y = (6*5)/2
//  x += y = (30/2)
//  x += y = 15
// 할당. 우선순위 3, 오른쪽에서 왼쪽으로
//  x += (y = 15)
//  x += 15         y는 이제 15
//  18              x는 이제 18
```

## 비교 연산자
- 일치 : 같은 타입이고 값도 같음
- 동등 : 같은 객체를 가리키거나 같은 값을 갖도록 변환할 수 있다면..
```javascript
const n = 5;
const s = "5";
n === s;            // false -- 타입이 다름
n !== s;            // true
n === Number(s);    // true -- 문자열 "5"를 숫자 5로 변환
n == s;             // true -- 권장 x
n != s;             // false -- 권장 x

const a = { name: "an object" };
const b = { name: "an object" };
a === b;            // false -- 객체는 항상 다름
a !== b;            // true
a == b;             // false -- 권장 x
a != b;             // true -- 권장 x
```

## 숫자 비교
- NaN은 자신을 포함하여 무엇과도 같지 않음
- NaN === NaN, NaN == NaN 모두 false
- isNaN()으로 NaN여부 확인 가능
- 정수형은 일치 연산자 사용 가능 (안전 범위내)
- 여기서 안전 범위란 Number.MIN_SAFE_INTEGER이상, Number.MAX_SAFE_INTEGER이하를 말함
- 소수점이 있는 숫자 비교 시 일치 연산자를 사용하는 것이 아니라 해당 숫자에 가깝냐로 해야 함
- 이유는 자바스크립트의 숫자 기본형태인 `double`형식은 근사치라 정확한 숫자 비교가 되지 않음
```javascript
let n = 0;
while(true) {
    n += 0.1;
    // 0.1씩 더하는 연산시 정확히 0.3이 나오지 않음 (0.30000000000000004)
    // 따라서 해당 조건문을 타지않고 무한루프
    if (n === 0.3) break;
}
console.log(`Stopped at ${n}`);
```
- Number.EPSILON은 매우 작은 값을 나타냄. (약 2.22e-16)
- Number.EPSILON과 관계 연산자를 사용해서 `느슨하게` 비교하면 됨
```javascript
let n = 0;
while(true) {
    n += 0.1;
    if(Math.abs(n - 0.3) < Number.EPSILON) break;
}
console.log(`Stopped at ${n}`);
```

## 문자열 병합
- `+`연산자는 덧셈과 문자열 병합에 모두 사용
- 자바스크립트는 피연산자의 타입을 보고 덧셈을 할지 문자열 병합을 할지 판단
- 덧셈, 병합 모두 왼쪽에서 오른쪽으로 평가
- 피연산자 중 하나라도 문자열이면 문자열 병합 수행, 두 값이 모두 숫자형이면 덧셈
```
3 + 5 + "8"     // 문자열 "88"
"3" + 5 + 8     // 문자열 "358"
```
- 왼쪽에서 오른쪽으로 평가 하므로 3+5 덧셈 후 8과"8"이 병합하여 88이 됨
- "3"과5와 만나 "35"가 되고, "35"와 8이 만나 "358"이 됨

## 논리 연산자
- 불리언 값을 반환

#### 참 같은 값과 거짓 같은 값
- 거짓 같은 값
    - undefined
    - null
    - false
    - 0
    - NaN
    - ''
- 참 값은 값 : 위 항목을 제외한 모두
- 모든 객체, valueOf() 메서드를 호출 했을 때 false를 반환하는 객체도 참 같은 값에 속함
- 배열. 빈 배열도 참 같은 값
- 공백만 있는 문자열도 참 같은 값
- 문자열 "false"도 참 같은 값

## AND, OR, NOT
- 자바스크립트가 지원하는 논리 연산자 : AND(&&), OR(||), NOT(!)

#### 단축 평가
- x && y 에서 x가 거짓같은 값이면 y의 값을 평가할 필요도 없이 해당 연산은 false
- x || y 에서 x가 참같은 값이면 y의 값을 평가할 필요도 없이 해당 연산은 true
```javascript
const skipIt = true;
let x = 0;
const result = skipIt || x++;
```
- 위의 식에서 3번째 행은 단축평가가 일어남. (skipIt을 평가하여 참이면 x값을 증가시키지 않음)

#### 피연산자가 불리언이 아닐 때 논리 연산자가 동작하는 방법
- 불리언이 아닌 피연산자에 대한 AND(&&) 진위표
  
|x |y |x && y|
|--------|---------|------------|
|거짓같은 값|거짓 같은 값|x (참같은 값)|
|거짓같은 값|참 같은 값|x (거짓같은 값)|
|참같은 값|거짓 같은 값|y (거짓같은 값)|
|참같은 값|참 같은 값|y (참같은 값)|

- 불리언이 아닌 피연산자에 대한 OR(||) 진위표

|x |y |x \|\| y|
|--------|---------|------------|
|거짓같은 값|거짓 같은 값|y (거짓같은 값)|
|거짓같은 값|참 같은 값|y (참같은 값)|
|참같은 값|거짓 같은 값|x (참같은 값)|
|참같은 값|참 같은 값|x (참같은 값)|

```javascript
const options = suppliedOptions || { name: "Default" }
```
- 객체는 항상 참 같은 값. 따라서 `suppliedOptions`가 객체면 `options`는 `suppliedOptions`를 가르키게 됨
- 옵션이 제공되지 않으면, 즉 `suppliedOptions`가 `null`이나 `undefined`라면 `options`는 기본값을 갖게 됨
- NOT은 불리언이 아닌 값을 반환할 수 없음.
- 피연산자가 참 같은 값이면 false, 거짓 같은 값이면 true 반환

#### 조건 연산자
- 자바스크립트의 유일한 3항(ternary) 연산자
- if...else와 동등한 표현식
```javascript
const doIt = false;
const result = doIt ? "Did it!" : "Didn't do it.";
```
- 물음표 앞에 있는 첫 번째 피연산자(doIt)가 참 같은 값이면 이 표현식의 값은 두 번째 피연산자(?와:사이 값)
- 거짓 같은 값이면 세 번째 피연산자(:다음 값)가 값

#### 쉼표 연산자
- 표현식을 결합하여 두 표현식을 평가한 후, 두 번째 표현식의 결과를 반환
- 표현식을 하나 이상 실행해야 하지만 값으로 필요한 것은 마지막 표현식의 결과뿐
```javascript
let x = 0, y = 10, z;
z = (x++, y++);
```
- x와 y모두 1씩 증가하지만 z의 값은 y++에 대한 반환 값이다. (10)
- 쉼표는 우선순위가 가장 낮은 연산자
- 괄호를 하지 않았다면 z는 x++의 반환 값 (0)이 저장되고, 그다음 표현식인 y++를 실행하여 y값을 증가시킴

## 연산자 그룹
- 연산자 우선순위를 높이거나 명확히 표현하는 사용
- 연산 순서만 바꿀 뿐, 다른 부작용은 없음

#### 비트 연산자
- 피연산자를 2의 보수(two's complement)형식으로 저장된 32비트 부호 붙은 정수(signed integer)로 간주
- 자바스크립트의 숫자는 모두 더블 형식이므로 비트 연산자를 실행하기 전에 숫자를 먼저 32비트 정수로 변환하고, 결과를 반환할 때 다시 더블 형식으로 변환
- 논리 연산자 AND, OR, NOT, XOR같은 논리 연산을 하지만 정수의 개별 비트에서 수행
- 시프트 연산자(<<,>>) : 비트를 다른 위치로 옮김

| 연산자 | 설명 | 예제 |
|------|-----|-----|
| & | 비트 AND | 0b1010 & 0b1100  // 결과: 0b1000 |
| \| | 비트 OR | 0b1010 \| 0b1100  // 결과: 0b1110 |
| ^ | 비트 XOR | 0b1010 ^ 0b1100  // 결과: 0b0110 |
| ~ | 비트 NOT | ~0b1010 // 결과: 0b0101 |
| << | 왼쪽 시프트 | 0b1010 << 1 // 결과: 0b10100 <br/> 0b1010 << 2 // 결과 : 0b101000 |
| >> | 부호 따라가는(Sign-propagating) 오른쪽 시프트 | 아래 코드 참조 |
| >>> | 0으로 채우는(Zero-fill) 오른쪽 시프트 | 아래 코드 참조 |
- 왼쪽 시프트는 2를 곱하는 효과가 있고, 오른쪽 시프트는 2로 나눈 다음 소수점 아래를 버리는 효과
- 2의 보수 형식에서 숫자의 가장 왼쪽에 있는 비트는 음수였다면 1이고, 양수였다면 0
- 숫자 -22를 예로 오른쪽 시프트는 양수 22에서 시작해 1의 보수를 얻은 다음 1을 더해 2의 보수를 얻음으로 바이너리 표현을 얻는다
```javascript
let n = 22  // 32비트 바이너리: 00000000000000000000000000010110
n >> 1      //               00000000000000000000000000001011
n >>> 1     //               00000000000000000000000000001011
n = ~n      // 1의 보수:       11111111111111111111111111101001
n++         // 2의 보수:       11111111111111111111111111101010
n >> 1      //               11111111111111111111111111110101
n >>> 1     //               11111111111111111111111111110101
```
- 유닉스에서 파일의 읽기, 쓰기, 실행 권한을 지정할 때 비트 플래그 사용
```javascript
const FLAG_EXECUTE = 1  // 0b001
const FLAG_WRITE = 2    // 0b010
const FLAG_READ = 4     // 0b100
```
- 비트 연산자를 쓰면 숫자형 값 하나로 플래그를 결합하고, 바꾸고, 읽을 수 있음
```javascript
let p = FLAG_READ | FLAG_WRITE;         // 0b110
let hasWrite = p & FLAG_WRITE;          // 0b010 - 참 값은 값
let hasExecute = p & FLAG_EXECUTE;      // 0b000 - 거짓 같은 값
p = p ^ FLAG_WRITE;                     // 0b100 -- 쓰기 플래그 토글 (이제 쓰기 권한이 없음)
p = p ^ FLAG_WRITE;                     // 0b110 -- 쓰기 플래그 토글 (쓰기 권한이 다시 생김)

// 표현식 하나로 여러 플래그를 동시에 판단
const hasReadOrExecute = p & (FLAG_READ | FLAG_EXECUTE);
const hasReadAndExecute = p & (FLAG_READ | FLAG_EXECUTE) === FLAG_READ | FLAG_EXECUTE;
```
- `hasReadOrExecute`와 `hasReadANdExecute`는 AND가 OR보다 우선순위가 높으므로, 그룹을 써서 우선순위를 강제 해야함.

#### typeof 연산자
- 피연산자의 타입을 나타내는 문자열 반환
- 단, `undefined`, `null`, 불리언, 숫자, 문자열, 심볼, 객체를 정확히 나타내지 못함
- null을 "object"로 반환
- 배열과 배열 아닌 객체도 정확히 구분하지 못함
- 함수(객체의 특별한 타입)는 정확히 식별하지만, typeof []은 "object"를 반환

| 표현식 | 반환값 | 참고 |
|------|------|-----|
| typeof undefined | "undefined" | |
| typeof null | "object" | 애석하지만 사실 |
| typeof {} | "object" | |
| typeof true | "boolean" | |
| typeof 1 | "number" | |
| typeof "" | "string" | |
| typeof Symbol() | "symbol" | ES6에서 새로 생김 |
| typeof function() {} | "function" | |
- typeof는 연산자이므로 괄호는 필요 없음

#### void 연산자
- 피연산자를 평가한 후 undefined를 반환
- 거의 사용하지 않음
- 가끔 HTML에서 다른 페이지로 이동하는 일을 막을 때 아래와 같이 사용
```html
<a href="javascript:void 0">Do nothing.</a>
```

#### 할당 연산자
- 등호의 왼쪽에 있는 것은 (1-value라 부르기도 함) 반드시 변수나 프로퍼티, 배열 요소중 하나여야 함
- 상수에 값을 할당하는 것은 엄밀히 말해 선언의 일부이며 할당 연산자가 아님
- 할당을 페인으로 연결 할 수 있음
```javascript
let v, v0;
v = v0 = 9.8;   // 먼저 v0이 9.8이 되고, 그 다음 v가 9.8이 됨

const nums = [3, 5, 15, 7, 5];
let n, i=0;
// 먼저 nums[i]의 값을 받고, 표현식 전체가 그 값으로 평가되므로 숫자로 비교할 수 있음
while((n = nums[i]) < 10 && i++ < nums.length) {
    console.log(`Number less than 10: ${n}.`);
}
console.log(`Number greater than 10 found: ${n}.`);
console.log(`${nums.length - i - 1} numbers remain.`);
```
- 연산과 할당을 한꺼번에 수행하는 간편한 할당 연산자도 있음

| 연산자 | 동등한 표현 |
|------|----------|
| x += y | x = x + y |
| x -= y | x = x - y |
| x *= y | x = x * y |
| x /= y | x = x / y |
| x %= y | x = x % y |
| x <<= y | x = x << y |
| x >>= y | x = x >> y |
| x >>>= y | x = x >>> y |
| x &= y | x = x & y |
| x \|= y | x = x \| y |
| x ^= y | x = x ^ y |

## 해체 할당
- ES6에서 새로 도입
- 객체나 배열을 변수로 '해체'
```javascript
// 객체 선언
const obj = { b: 2, c: 3, d: 4 };

// 해체 할당
const {a, b, c} = obj;
a;      // undefined: obj에는 "a" 프로퍼티가 없음
b;      // 2
c;      // 3
d;      // ReferenceError: "d"는 정의 되지 않았음
```
- 위 예제에서는 선언과 할당을 같은 문에서 했음. 할당만으로 이뤄질려면 반드시 괄호를 사용해야 함
```javascript
const obj = { b: 2, c: 3, d: 4 };
let a, b, c;

// 에러 발생
{a, b, c} = obj;

// 동작함
({a, b, c} = obj);
```
- 배열을 해체할 때는 배열 요소에 대응할 변수 이름을 마음대로 쓸 수 있으며 이들은 배열 순서로 대응
```javascript
const arr = [1, 2, 3];

// 배열 해체 할당
let [x, y] = arr;
x;      // 1
y;      // 2
z;      // ReferenceError: "z"는 정의되지 않았음
```
- 확산 연산자(spread operator)를 사용하면 남은 요소를 새 배열에 할당할 수 있음
```javascript
const arr = [1, 2, 3, 4, 5];

let [x, y, ...rest] = arr;
x;      // 1
y;      // 2
rest;   // [3, 4, 5]
```
- 배열 해체를 활용하면 변수의 값을 서로 바꿀 수 있음. 해체를 사용하지 않으면 임시 변수가 필수
```javascript
let a = 5, b = 10;
[a, b] = [b, a];
a;      // 10
b;      // 5
```

## 템플릿 문자열과 표현식
- 표현식은 값이므로 값이 들어갈 수 있는 곳에는 어디든 표현식 사용 가능
```javascript
const roomTempC = 21.5;
const currentTempC = 19.5;
const message = `The current temperature is ` +
    `${currentTempC - roomTempC}\u00b0C different than room temperature.`;;
const fahrenheit = `The current temperature is ${currentTempC * 9/5 + 32}\u00b0F;
```

## 표현식과 흐름 제어 패턴
  
#### if...else문을 3항 연산자로 바꾸기
- 목적이 변수의 값을 얻는 것이라면 일반적으로 3항 연산자를 쓰는 편이 좋음
```javascript
if(isPrime(n)) {
    label = 'prime';
} else {
    label =  'non-prime';
}
```
```javascript
label = isPrime(n) ? 'prime' : 'non-prime';
```

#### if문을 단축 평가하는 OR 표현식으로 바꾸기 
```javascript
if(!options) options = {};
```
- 앞의 코드는 다음과 같이 사용 가능
```javascript
options = options || {};
```

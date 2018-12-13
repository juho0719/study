# Math
- Math 객체를 설명
## 숫자 형식
- 자바스크립트의 숫자 형식 메서드는 모두 숫자가 아니라 문자열을 반환
- 해당 형식에 필요한 각종 기호를 온전히 표현하려면 반드시 문자열이어야 하기 때문
#### 고정 소수점
- 소수점 뒤 자릿수를 지정하는 형식을 원한다면 `toFixed()`를 사용
```javascript
const x = 19.51;
x.toFixed(3);   // "19.510"
x.toFixed(2);   // "19.51"
x.toFixed(1);   // "19.5"
x.toFixed(0);   // "20"
```
- 숫자는 버림(trucatation)이 아니라 반올림(round)

#### 지수 표기법
지수 표기법이 필요할 땐 `toExponential()`을 사용
```javascript
const x = 3800.5;
x.toExponential(4); // "3.8005e+3"
x.toExponential(3); // "3.801e+3"
x.toExponential(2); // "3.80e+3"
x.toExponential(1); // "3.8e+3"
x.toExponential(0); // "4e+3"
```
- `toFixed()`와 마찬가지로 반올림

#### 고정 전체 자리수
- 소수점이 어디 나타나든 관계없이 숫자 몇 개로 표현하느냐가 중요하다면 `toPrecision()`을 사용
```javascript
let x = 1000;
x.toPrecision(5);   // "1000.0"
x.toPrecision(4);   // "1000"
x.toPrecision(3);   // "1.00e+3"
x.toPrecision(2);   // "1.0e.0"
x.toPrecision(1);   // "1e.0"
x = 15.335;
x.toPrecision(6);   // "15.3350"
x.toPrecision(5);   // "15.335"
x.toPrecision(4);   // "15.34"
x.toPrecision(3);   // "15.3"
x.toPrecision(2);   // "15"
x.toPrecision(1);   // "2e+1"
```
- 출력 결과는 반올림된 숫자, 전체 자릿수는 매개변수로 넘긴 자릿수와 일치

#### 다른 진수
- 2진수나 8진수, 16진수 표현을 원한다면 `toString()`에 기수를 매개변수로 쓰면 됨
```javascript
const x = 12;
x.toString();       // "12" (10진수)
x.toString(10);     // "12" (10진수)
x.toString(16);     // "c" (16진수)
x.toString(8);      // "14" (8진수)
x.toString(2);      // "1100" (2진수)
```

## 고급 숫자 형식
- 다양한 형식으로 숫자를 표시해야 한다면 `numeral.js` 라이브러리를 추천
- 주로 필요한 경우는 다음과 같음
    - 수천 자리의 아주 큰 숫자
    - 괄호를 쓰는 등, 음수 표현을 다르게 해야 하는 경우
    - 공학 표기법(지수 표기법과 비슷)
    - milli-, micro-, kilo-, mega-등의 SI 접두사가 필요한 경우

## 상수
- Math 객체에는 몇가지 중요한 상수가 프로퍼티로 내장되어 있음
```javascript
// 기본적인 상수
Math.E      // 자연로그의 밑수(root) : ~2.718
Math.PI     // 원주율: ~3.142

// 로그 관련 상수는 Math 객체의 프로퍼티를 호출해도 되지만, 자주 사용한다면
// 따로 상수에 할당해서 편리하게 사용하는 것이 좋음
Math.LN2        // 2의 자연로그: ~0.693
Math.LN10       // 10의 자연로그: ~2.303
Math.LOG2E      // Math.E의 밑수가 2인 로그: ~1.433
Math.LOG10E     // Math.E의 상용 로그: 0.434

// 대수 관련 상수
Math.SQRT1_2    // 1/2의 제곱근: ~0.707
Math.SQRT2      // 2의 제곱근: ~1.414
```

## 대수 함수
#### 거듭제곱
- 제곱 관련 기본 함수는 `Math.pow`
- 제곱, 제곱근 관련 함수

|함수|설명|예제|
|---|---|---|
|Math.pow(x,y)|x<sup>y</sup>|Math.pow(2,3) // 8<br>Math.pow(1.7, 2.3)  // ~3.39
|Math.sqrt(x)|제곱근. √x는 Math.pow(x, 0.5)와 같음|Math.sqrt(16) // 4<br>Math.sqrt(15.5) // ~3.94|
|Math.cbrt(x)|세제곱근. X는 Math.pow(x, 1/3)와 같음|Math.cbrt(27) // 3<br>Math.cbrt(22) // ~2.8|
|Math.exp(x)|e<sup>x</sup>는 Math.pow(Math.E, x)와 같음|Math.exp(1) // ~2.718<br>Math.exp(5,5) // ~244.7|
|Math.expm1(x)|e<sup>x</sup>-1은 Math.exp(x)-1과 같음|Math.expm1(1) // ~1.718<br>Math.expm1(5,5) // ~243.7|
|Math.hypot(x1, x2,...)|매개변수의 제곱을 합한 수(√x1<sup>2</sup> + √x2<sup>2</sup> + ...)의 제곱근|Math.hypot(3, 4) // 5<br>Math.hypot(2, 3, 4) // ~5.36

#### 로그 함수
- 자연로그 함수는 Math.log
- ES6에서는 자주 쓰이는 상용로그 Math.log10 함수가 생김

|함수|설명|예제|
|---|---|---|
|Math.log(x)|x의 자연로그|Math.log(Math.E) // 1<br>Math.log(17.5) // ~2.86
|Math.log10(x)|x의 상용로그 Math.log(x)/Math.log(10)와 같음|Math.log10(10) // 1<br>Math.log10(16.7) // ~1.22
|Math.log2(x)|x의 밑수가 2인 로그 Math.log(x)/Math.log(2)와 같음|Math.log2(2) // 1<br>Math.log2(5) // ~2.32
|Math.log1p(x)|1+x의 자연로그 Math.log(1+x)와 같음|Math.log1p(Math.E-1) // 1<br>Math.log1p(17.5) // ~2.92

#### 기타 함수
- 절대값, 부호, 배열의 최소값/최대값 등 숫자관련 기타함수

|함수|설명|예제|
|---|---|---|
|Math.abs(x)|x의 절대값|Math.abs(-5.5) // 5.5<br>Math.abs(5.5) // 5.5
|Math.sign(x)|x의 부호. x가 음수면 -1, 양수면 1, 0이면 0|Math.sign(-10.5) // -1<br>Math.sign(6.77) // 1
|Math.ceil(x)|x의 올림<br>x보다 크거나 같은 정수 중 가장 작은 수|Math.ceil(2.2) // 3<br>Math.ceil(-3.8) // -3
|Math.floor(x)|x의 내림<br>x보다 작거나 같은 정수 중 가장 큰 수|Math.floor(2.8) // 2<br>Math.floor(-3.2) // -4
|Math.trunc(x)|x의 버림<br>소수점 아래 부분을 모두 제거하고 정수 부분만 남김|Math.trunc(7.7) // 7<br>Math.trunc(-5.8) // -5
|Math.round(x)|x의 반올림|Math.round(7.2) // 7<br>Math.round(7.7) // 8<br>Math.round(-7.7) // 8<br>Math.round(-7.2) // 7
|Math.min(x1, x2, ...)|매개변수 중 최소값|Math.min(1, 2) // 1<br>Math.min(3, 0.5, -0.66) // -0.66
|Math.max(x1, x2, ...)|매개변수 중 최대값|Math.max(1, 2) // 2<br>Math.max(3, 0.5, -0.66) // 3

#### 의사 난수 생성
- 자바스크립트에서 의사 난수를 생성할 때는 `Math.random()`을 사용
- 이 함수는 0이상 1미만의 숫자를 반환
- 대수학에서 x이상 y이하를 [x, y] x초과 y미만을 (x, y)라 표기
- 이 표기법에 따르면 `Math.random()`은 `[0, 1)`
- 다른 범위의 난수가 필요할 때 널리 쓰이는 공식

|범위|예제|
|---|---|
|0 이상 1 미만|Math.random()
|x 이상 y 미만|x + (y-x)*Math.random()
|m 이상 n 미만의 정수|m + Math.floor((n-m)*Math.random())
|m 이상 n 이하의 정수|m + Math.floor((n-m+1)*Math.random())

- 자바스크립트의 의사 난수 발생기는 시드 숫자를 쓸 수 없다는 단점
- 시드를 사용해 의사 난수를 생성해야 한다면 데이비드 바우(David Bau)의 [seedrandom.js](https://github.com/davidbau/seedrandom) 패키지를 참고

## 삼각 함수
- 사인, 코사인, 탄젠트, 아크 사인, 아크 코사인, 아크 탄젠트
- 자바스크립트의 삼각함수는 모두 라디안 값을 기준

|함수|설명|예제|
|---|---|---|
|Math.sin(x)|x의 사인|Math.sin(Math.PI/2) // 1<br>Math.sin(Math.PI/4) // ~0.707
|Math.cos(x)|x의 코사인|Math.cos(Math.PI) // -1<br>Math.cos(Math.PI/4) // ~0.707
|Math.tan(x)|x의 탄젠트|Math.tan(Math.PI/4) // -1<br>Math.tan(0) // 0
|Math.asin(x)|x의 아크사인(결과는 라디안)|Math.asin(0) // 0<br>Math.asin(Math.SQRT1_2) // ~0.785
|Math.acos(x)|x의 아크코사인(결과는 라디안)|Math.acos(0) // ~1.57+<br>Math.acos(Math.SQRT1_2) // ~0.785+
|Math.atan(x)|x의 아크탄젠트(결과는 라디안)|Math.atan(0) // 0<br>Math.atan(Math.SQRT1_2) // ~0.615
|Math.atan2(y,x)|x축에서 점(x,y)까지의 시계 반대방향 각도를 라디안으로 나타낸 값|Math.atan2(0, 1) // 0<br>Math.atan2(1, 1) // ~0.785

- 매개변수에 각도를 쓸 수 없으므로 라디안 값으로 바꿔야 함
- 계산은 180으로 나누고 파이를 곱하면 됨
- 보조 함수를 만들면
```javascript
function deg2rad(d) { return d/180*Math.PI; }
function rad2deg(r) { return r/Math.PI*180; }
```

## 쌍곡선 함수

|함수|설명|예제|
|---|---|---|
|Math.sinh(x)|x의 하이퍼볼릭 사인|Math.sinh(0) // 0<br>Math.sinh(1) // ~1.18
|Math.cosh(x)|x의 하이퍼볼릭 코사인|Math.cosh(0) // 1<br>Math.cosh(1) // ~1.54
|Math.tanh(x)|x의 하이퍼볼릭 탄젠트|Math.tanh(0) // 0<br>Math.tanh(1) // ~0.762
|Math.asinh(x)|x의 하이퍼볼릭 아크사인|Math.asinh(0) // 0<br>Math.asinh(1) // ~0.881
|Math.acosh(x)|x의 하이퍼볼릭 아크코사인|Math.acosh(0) // NaN<br>Math.acosh(1) // 0
|Math.atanh(x)|x의 하이퍼볼릭 아크탄젠트|Math.atanh(0) // 0<br>Math.atanh(1) // ~0.615
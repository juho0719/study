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

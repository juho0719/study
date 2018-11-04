# 객체와 객체지향 프로그래밍

- 배열과 마찬가지로 자바스크립트 객체 역시 컨테이너지만 두가지 측면에서 배열과 다름
- 배열은 값을 가지며, 값에는 숫자형 인덱스가 있음
- 객체는 프로퍼티를 가지며 각 프로퍼티에는 문자열이나 심볼 인덱스가 있음
- 배열에는 순서가 있지만 객체는 순서보장이 되지 않음

## 프로퍼티 나열
- 순서가 보장되지 않음
- 여러 번 테스트 후에도 프로퍼티가 입력한 순서대로 나열될 수도 있지만, 자바스크립트가 그런 순서를 명시적으로 보장하지 않음

#### for...in
- 객체 프로퍼티 나열할 때 주로 사용
```javascript
const SYM = Symbol();
const o = { a: 1, b: 2, c: 3, [SYM]: 4 };

for(let prop in o) {
    if(!o.hasOwnProperty(prop)) continue;
    console.log(`${prop}: ${o[prop]}`);
}
```
- for...in 루프에는 키가 심볼인 프로퍼티는 포함되지 않음


#### Object.keys
- 객체에서 나열 가능한 문자열 프로퍼티를 배열로 반환
```javascript
cosnt SYM = Symbol();
const o = { a: 1, b: 2, c: 3, [SYM]: 4 };

Object.keys(o).forEach(prop => console.log(`${prop}: ${o[prop]}`));
```
- for...in과 같은 결과이고 hasOwnProperty를 체크할 필요 없음
- 객체 프로퍼티 키를 배열로 가져와야 할 때는 Object.keys가 편리
- 객체에서 x로 시작하는 프로퍼티를 모두 가져온다면 다음과 같이 할 수 있음
```javascript
const o = { apple: 1, xochitl: 2, balloon: 3, guitar: 4, xylophone: 5 };

Object.keys(o)
    .filter(prop => prop.match(/^x/))
    .forEach(prop => console.log(`${prop}: ${o[prop]}`));
```

## 객체 지향 프로그래밍

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
- 객체는 데이터와 기능을 논리적으로 묶어 놓은 것
- 클래스는 어떤 자동차처럼 추상적이고 범용적인 것
- 인스턴스는 특정 자동차처럼 구체적이고 한정적인 것
- 기능은 메서드
  
#### 클래스와 인스턴스 생성
- ES6 이전에 자바스크립트에서 클래스를 만드는 건 직관적이지도 않고 무척 번거로운 일이었음
- ES6에서는 클래스를 만드는 간편한 새 문법을 도입
```javascript
class Car {
    constructor() {

    }
}
```
- 새 클래스 Car를 생성
- 인스턴스를 만들 때는 `new`키워드 사용
```javascript
const car1 = new Car();
const car2 = new Car();
```
- 객체가 클래스의 인스턴스인지 확인하는 instanceof
```javascript
car1 instanceof Car     // true
car1 instanceof Array   // false
```
- car1은 Car의 인스턴스이고 Array의 인스턴스가 아님

```javascript
class Car {
    constructor(make, model) {
        this.make = make;
        this.model = model;
        this.userGears = ['P', 'N', 'R', 'D'];
        this.userGear = this.userGears[0];
    }
    shift(gear) {
        if(this.userGears.indexOf(gear) < 0)
            throw new Error(`Invalid gear: ${gear}`);
        this.userGear = gear;
    }
}
```
- this 키워드는 의도한 목적, 즉 메서드를 호출한 인스턴스를 가리키는 목적
- this는 일종의 플레이스홀더
- 클래스를 만들 때 사용한 this는 나중에 만들 인스턴스의 플레이스홀더
```javascript
const car1 = new Car("Tesla", "Model S");
const car2 = new Car("Mazda", "3i");
car1.shift('D');
car2.shift('R');
```
- car1.shift('D')를 호출하면 this는 car1에 묶임
- car2.shift('R')을 호출하면 this는 car2에 묶임
```javascript
car1.userGear   // "D"
car2.userGear   // "R"
```
- 직접 car1.userGear = 'X'라고 설정한다면 막을 수는 없음
- 어느정도 막을 수 있는 방법은 아래와 같음
```javascript
class Car {
    constructor(make, model) {
        this.make = make;
        this.model = model;
        this._userGears = ['P', 'N', 'R', 'D'];
        this._userGear = this.userGears[0];
    }

    get userGear() { return this._userGear; }
    set userGear(value) {
        if(this._userGears.indexOf(value) < 0)
            throw new Error(`Invalid gear: ${gear}`);
        this.userGear = gear;
    }
    shift(gear) { this.userGear = gear; }
}
```
- 이 방법도 car1._userGear를 직접 접근하면 방지할 수 없지만, 변수명 앞에 언더바(\_)를 붙임으로써 로컬 변수라는 의미라는 것을 알려줄 수 있음
- 프로퍼티를 꼭 보호해야 한다면 스코프를 이용해 보호하는 WeakMap인스턴스 사용
```javascript
const Car = (function() {

    const carProps = new WeakMap();

    class Car {
        constructor(make, model) {
            this.make = make;
            this.model = model;
            this._userGears = ['P', 'N', 'R', 'D'];
            carProps.set(this, { userGear: this._userGears[0] });
        }
        get userGear() { return this._userGear; }
        set userGear(value) {
            if(this._userGears.indexOf(value) < 0)
                throw new Error(`Invalid gear: ${gear}`);
            this.userGear = gear;
        }
        shift(gear) { this.userGear = gear; }
    }
    return Car;
})();
```

#### 클래스는 함수다

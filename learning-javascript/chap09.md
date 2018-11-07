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
- ES5에서는 Car클래스를 다음과 같이 만듦
```javascript
function Car(make, model) {
    this.make = make;
    this.model = model;
    this._userGears = ['P', 'N', 'R', 'D'];
    this._userGear = this.userGears[0];
}
```
- ES6에서 클래스가 바뀐 것은 아님. 단지 간편한 새 문법이 생긴 것

#### 프로토타입
- 클래스의 인스턴스에서 사용할 수 있는 메서드라고 하면 그건 프로토타입 메서드를 말하는 것
- Car 인스턴스에서 사용할 수 있는 shift메서드는 프로토타입 메서드
- Car.prototype.shift 처럼 표기
- Array의 forEach를 Array.prototyep.forEach
- 최근에는 포로토타입 메서드를 `#`으로 표시. Car.prototype.shitf를 Car#shift로 표기
- 클래스는 항상 첫 글자를 대문자로 표기하기를 권장함
- new키워드로 만든 새 객체는 생성자의 prototype 프로퍼티에 접근할 수 있음
- 인스턴스는 생성자의 prototype프로퍼티를 `__proto__` 프로퍼티에 저장
- `__proto__` 프로퍼티는 내부 동작 방식에 영향을 미침.
- 밑줄 두개로 둘러싼 프로퍼티는 모두 그렇기 때문에 이를 수정하는 것은 위험한 행위
- 프로토타입에서 중요한 것은 동적 디스패치
- 여기서 디스패치는 메서드 호출과 같은 의미
- 객체의 프로퍼티나 메서드에 접근하려 할 때 존재하지 않으면 자바스크립트는 객체의 프로토타입에서 해당 요소를 찾음
- 클래스의 인스턴스는 모두 같은 프로토타입을 공유하므로 프로토타입에 프로퍼티나 메서드가 있다면 해당 클래스의 인스턴스는 모두 그 프로퍼티나 메서드에 접근 가능
- 모든 인스턴스가 프로토타입 프로퍼티 값을 공유하지만 인스턴스 중 하나에 그런 이름의 프로퍼티가 있다면 해당 인스턴스는 프로토타입이 아니라 인스턴스에 있는 값을 사용함. 따라서 인스턴스에 초깃값이 필요하다면 생성자에서 만드는 것이 나음
- 인스턴스에서 메서드나 프로퍼티를 정의하면 프로토타입에 잇는 것을 가리는 효과가 있음
```javascript
// Car 클래스는 이전에 만든 클래스
const car1 = new Car();
const car2 = new Car();
car1.shift === Car.prototype.shift;     // true
car1.shift('D');
car1.shift('d');                        // error
car1.userGear;                          // 'D'
car1.shift === car2.shift               // true

car1.shift = function(gear) { this.userGear = gear.toUpperCase(); }
car1.shift === Car.prototype.shift;     // false
car1.shift === car2.shift;              // false
car1.shift('d');
car1.userGear;                          // 'D'
```
- car1객체는 shift 메서드가 없지만, car1.shift('D')를 호출하면 car1의 프로토타입에서 메서드를 검색함
- car1에 shift 메서드를 추가하면 car1과 프로토타입에 같은 이름의 메서드가 존재하게 됨
- 이후에 car1.shift('d')를 호출하면 car1의 메서드가 호출되면서 프로토타입의 메서드는 무시됨

#### 정적 메서드
- 인스턴스 메서드 외에도 정적 메서드(클래스 메서드)가 있음
- 이 메서드는 특정 인스턴스에 적용되지 않음
- 정적메서드에서 this는 인스턴스가 아니라 클래스에 묶임
- 일반적으로 정적 메서드에는 this대신 클래스 이름을 사용하는 것이 좋은 습관임
- 정적 메서드는 클래스와 관련되지만 인스턴스와 관련이 없는 작업에 사용
```javascript
class Car {
    static getNextVin() {
        return Car.nextVin++;   // this.nextVin++라고 써도 되지만
                                //  Car를 앞에 쓰면 정적메서드라는 점을 인식시켜줌
    }
    constructor(make, model) {
        this.make = make;
        this.model = model;
        this.vin = Car.getNextVin();
    }
    static areSimilar(car1, car2) {
        return car1.make === car2.make && car1.model === car2.model;
    }
    static areSame(car1, car2) {
        return car1.vin === car2.vin;
    }
}
Car.nextVin = 0;

const car1 = new Car("Tesla", "S");
const car2 = new Car("Mazda", "3");
const car3 = new Car("Mazda", "3");

car1.vin;       // 0
car2.vin;       // 1
car3.vin;       // 2

Car.areSimilar(car1, car2); // false
Car.areSimilar(car2, car3); // true
Car.areSame(car2, car3);    // false
Car.areSame(car2, car2);    // true
```

#### 상속
- 클래스의 인스턴스는 클래스의 기능을 모두 상속
- 객체의 프로토타입에서 메서드를 찾지 못하면 프로토타입의 프로토타입을 검색
- 이렇게 계속 연결되어 찾아가는 것을 프로토타입 체인이라 함
- 조건에 맞는 프로토타입을 찾을 때까지 계속 올라가다 결국 찾지 못하면 에러 발생
```javascript
class Vehicle {
    constructor() {
        this.passengers = [];
        console.log("Vehicle created");
    }
    addPassenger(p) {
        this.passengers.push(p);
    }
}

class Car extends Vehicle {
    constructor() {
        super();
        console.log("Car created");
    }
    deployAirbags() {
        console.log("BWOOSH!");
    }
}
```
- `super()`는 슈퍼클래스의 생성자를 호출
- 서브클래스에서 이 함수를 호출하지 않으면 에러 발생
```javascript
const v = new Vehicle();
v.addPassenger("Frank");
v.addPassenger("Judy");
v.passengers;               // ["Frank", "Judy"]
const c = new Car();
c.addPassenger("Alice");
c.addPassenger("Cameron");
c.passengers;               // ["Alice", "Cameron"]
v.deployAirbags();          // error
c.deployAirbags();          // "BWOOSH!"
```
- 상속은 단방향. 하위 클래스는 상위 클래스의 모든 메서드에 접근할 수 있지만 반대는 불가능

#### 다형성
- 객체지향 언어에서 여러 슈퍼클래스의 멤버인 인스턴스를 가르킴
- instanceof 연산자로 클래스의 인스턴스를 확인(prototype과 `__proto__`를 수정하지 않았다면 가능)
```javascript
class Motorcycle extends Vehicle {}
const c = new Car();
const m = new Motorcycle();
c instanceof Car;           // true
c instanceof Vehicle;       // true
m instanceof Car;           // false
m instanceof Motorcycle;    // true
m instanceof Vehicle;       // true
```
- 자바스크립트의 모든 객체 루트 클래스는 Object이다.

#### 객체 프로퍼티 나열 다시 보기

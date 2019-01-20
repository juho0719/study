# 객체 프로퍼티 설정과 프록시

## 접근자 프로퍼티 getter와 setter
- 객체 프로퍼티에는 데이터 프로퍼티와 접근자(accessor) 프로퍼티가 있음 
- 접근자 프로퍼티는 ES6의 단축 문법 때문에 잘 드러나지는 않았음 
- 접근자 프로퍼티는 메소드와 비슷한데 `getter`와 `setter` 두가지 함수로 구성된다는 것과 접근했을 때 함수라기보다는 데이터 프로퍼티와 비슷하게 동작한다는 점이 조금 다름 
- 이런 면에서 접근자 프로퍼티를 동적 프로퍼티라고 부르기도 함 
- 동적 프로퍼티를 생각해 보면 `User` 클래스가 있고 `setEmail`과 `getEmail`이 있다고 하자
- email 프로퍼티를 두면 사용자가 잘못된 이메일 주소를 설정하는 일을 막기 힘드므로 `getter`와 `setter`를 두기로 함
- @기호가 들어있는 문자열은 모두 유효한 이메일 주소라고 간주한다면 
```javascript
const USER_EMAIL = Symbol();
class User {
    setEmail(value) {
        if(!/@/.test(value)) throw new Error(`invalid email: ${value}`);
        this[USER_EMAIL] = value;
    }
    getEmail() {
        return this[USER_EMAIL];
    }
}
```
- 두 가지 메소드를 쓴 이유는 잘못된 이메일 주소가 저장되는 것을 막으려는 것 
- 프로퍼티에는 심볼을 써서 실수로 직접 접근하는 일을 막았지만 `email`이나 `_email`같은 문자열 프로퍼티를 썼다면 막을 수 없었음 
- 이런 패턴은 널리 쓰이고 잘 동작하긴 하지만 조금 불편함 
- 이 클래스는 다음과 같은 방식으로 사용해야 함
```javascript
const u = new User();
u.setEmail("juho@doe.com");
console.log(`User email: ${u.getEmail()}`);
```
- 하지만 우리는 아래와 같은 방식을 더 자연스럽게 느낌 
```javascript
const u = new User();
u.email = "juho@doe.com";
console.log(`User email: ${u.email}`);
```
- 접근자 프로퍼티를 사용하면 후자의 자연스러운 문법을 사용하면서도 부주의한 접근을 차단하는 전자의 장점을 누릴 수도 있음 
- 접근자 프로퍼티를 사용하도록 클래스를 다시 만들어보면 
```javascript
const USER_EMAIL = Symbol();
class User {
    set email(value) {
        if(!/@/.test(value)) throw new Error(`invalid email: ${value}`);
        this[USER_EMAIL] = value;
    },
    get email() {
        return this[USER_EMAIL];
    }
}
```
- 함수 두 개를 사용했지만 두 함수는 `email`프로퍼티 하나에 묶였음 
- 프로퍼티에 할당할 떄는 `setter`가 호출되고, 할당하는 값을 첫 번째 매개변수로 전달 
- 프로퍼티를 평가할 때는 `getter`가 호출 
- `setter`없이 `getter`만 만들 수도 있음
- 예를 들어 사각형의 둘레(perimeter)를 얻는 `getter`는 다음과 같이 만듦 
```javascript
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    },
    get perimeter() {
        return this.width*2 + this.height*2;
    }
}
```
- 사각형이 만들어질 때 이미 너비와 높이는 결정되므로 둘레는 읽기 전용 프로퍼티로 생각하는 것이 상식적임

## 객체 프로퍼티 속성 
- 프로퍼티에는 항상 키가 있고, 키는 문자열이나 심볼일 수 있음 
- 프로퍼티 값은 어떤 타입이든 상관없음 
- 객체 프로퍼티에는 순서가 없음 
- 객체 프로퍼티에 접근할 때는 점이나 대괄호를 사용 
- 프로퍼티에는 자신이 속한 객체 안에서 어떻게 동작할지 결정하는 속성(attribute)이 있음 
- `Object.getOwnPropertyDescriptor`를 사용하여 속성을 알아보면 
```javascript
const obj = { foo: "bar" };
Object.getOwnPropertyDescriptor(obj, 'foo');
```
```
{ value: "bar", writable: true, enumerable: true, configurable: true }
```
- 프로퍼티 속성 세 가지가 나타남
    - 쓰기 가능한지(writable) : 프로퍼티 값을 바꿀 수 있는 지 여부
    - 나열 가능한지(enumerable) : `for..in`문이나 `Object.keys`, 확산 연산자에서 객체 프로퍼티를 나열할 때 해당 프로퍼티가 포함될지 여부 
    - 설정 가능한지(configurable) : 프로퍼티 객체에서 삭제하거나 속성을 수정할 수 있는 지 여부
- `Object.defineProperty`로는 프로퍼티 속성을 컨트롤하거나(설정 가능한 경우) 새 프로퍼티를 만들 수 있음
- 예를 들어 `Object.defineProperty`로 obj의 foo 프로퍼티를 읽기 전용으로 만들 수 있음 
```javascript
Object.defineProperty(obj, 'foo', { writable: false });
```
- 이후 foo에 값을 할당하면 에러가 발생 
```javascript
obj.foo = 3;
// TypeError: Cannot assign to read only property 'foo' of [object Object]
```
- CAUTION
```
스트릭트 모드에서만 에러가 발생함. 스트릭트 모드가 아닐 때는 할당이 실패하지만 에러가 발생하지는 않음 
```
- `Object.defineProperty`를 써서 객체에 새 프로퍼티를 추가할 수도 있음 
- 일반적인 데이터 프로퍼티와 달리 객체가 생성된 뒤에는 접근자 프로퍼티를 추가할 다른 방법이 없고 `Object.defineProperty`를 쓰는 방법뿐이 없음 
- obj에 color프로퍼티를 추가해보면 
```javascript
Object.defineProperty(obj, 'color', {
    get: function() { return this._color; },
    set: function(value) { this._color = value; },
});
```
- `Object.defineProperty`로 데이터 프로퍼티를 추가할 때는 `value` 프로퍼티를 사용하면 됨 
- obj에 name과 greet 프로퍼티를 추가해 보면 
```javascript
Object.defineProperty(obj, 'name', {
    value: 'Cynthia',
});
Object.defineProperty(obj, 'greet', {
    value: function() { return 'Hello, my name is ${this.name}!`; }
});
```
- `Object.defineProperty`는 배열 프로퍼티를 나열할 수 없게 만들 때 주로 사용 
- 배열은 원래 프로퍼티를 사용하지 않도록 설계됐으므로 문자열이나 심볼 프로퍼티는 사용하지 않는게 좋다고 언급한적이 있지만 충분히 생각하고 조심스럽게 사용한다면 배열 프로퍼티도 유용하게 쓸 수 있음 
- 배열에서 `for...in`이나 `Object.keys`를 사용하는 것 역시 권장하지 않지만 다른 개발자가 사용하는 걸 막을 수는 없음 
- 따라서 배열에 숫자형 프로퍼티가 아닌 프로퍼티를 추가한다면 다른 누군가가 그 배열에서 `for...in`이나 `Object.keys`를 사용했을 때 노출되지 않도록 나열할 수 없게 만들어야 함 
- 다음 코드는 배열에 `sum`과 `avg`메서드를 추가하는 코드 
```javascript
const arr = [3, 1.5, 9, 2, 5.2];
arr.sum = function() { return this.reduce((a, x) => a+x); }
arr.avg = function() { return this.sum()/this.length; }
Object.defineProperty(arr, 'sum', { enumerable: false });
Object.defineProperty(arr, 'avg', { enumerable: false });
```
- 프로퍼티 하나를 문 하나로 완결하는 방법도 있음 
```javascript
const arr = [3, 1.5, 9, 2, 5.2];
Object.defineProperty(arr, 'sum', {
    value: function() { return this.reduce((a, x) => a+x); }
    enumerable: false
});
Object.defineProperty(arr, 'avg', {
    value: function() { return this.sum()/this.length; }
    enumerable: false
});
```
- `Object.defineProperties`도 있음. 
- 이 메소드는 객체 프로퍼티 이름과 프로퍼티 정의를 서로 연결.
- 바로 앞 예제를 `Object.defineProperties`로 변경하면 
```javascript
const arr = [3, 1.5, 9, 2, 5.2];
Object.defineProperties(arr, {
    sum: {
        value: function() { return this.reduce((a, x) => a+x); }
        enumerable: false
    },
    avg : {
        value: function() { return this.sum()/this.length; }
        enumerable: false
    }
});
```

## 객체 보호: 동결, 봉인, 확장 금지
- 자바스크립트에는 객체를 보호해서 의도하지 않은 수정을 막고, 의도적인 공격은 더 어렵게 만드는 세가지 메커니즘이 있음
- 동결(freezing), 봉인(sealing), 확장 금지(preventing extension)
- 동결된 객체는 수정할 방법이 없음. 일단 객체를 동결하면 다음과 같은 작업이 불가능해짐 
    - 프로퍼티 값 수정, 할당
    - 프로퍼티 값 수정하는 메소드 호출 
    - setter 호출 
    - 새 프로퍼티 추가 
    - 새 메소드 추가 
    - 기존 프로퍼티나 메소드 설정 변경 
- 객체를 동결할 때는 `Object.freeze`를 사용하고, 객체가 동결됐는지 확인할 때는 `Object.isFrozen`을 사용 
- 회사, 버전, 빌드ID, 저작권 정보 등 앞으로 바뀔 일이 없는 프로그램에 대한 정보를 객체에 보관한다고 하면 
```javascript
const appInfo = {
    company: 'White Knight Software, Inc.',
    version: '1.3.5',
    buildId: '0a995448-ead4-4a8b-b050-9c9083279ea2',
    // 이함수는 getter이므로 동결한 상태에서도 계속 동작 
    copyright() {
        return `${new Date().getFullYear()}, ${this.company}`;
    },
};
Object.freeze(appInfo);
Object.isFrozen(appInfo);   // true

appInfo.newProp = 'test';
// TypeError: Can't add property newProp, object is not extensible

delete appInfo.company;
// TypeError: Cannot delete property 'company' of [object Object]

appInfo.company = 'test';
// TypeError: Cannot assign to read-only property 'company' of [object Object]

Object.defineProperty(appInfo, 'company', { enumerable: false });
// TypeError: Cannot redefine property: company
```
- 객체를 봉인하면 새 프로퍼티를 추가하거나 기존 프로퍼티를 변경, 삭제할 수 없음 
- 클래스의 인스턴스를 사용하면서, 인스턴스의 프로퍼티를 수정하는 메소드는 동작하도록 할 때 봉인을 사용할 수 있음 
- 객체를 봉인할 때는 `Object.seal`, 객체가 봉인됐는 지 확인할 때는 `Object.isSealed`를 사용 
```javascript
class Logger {
    constructor(name) {
        this.name = name;
        this.log = [];
    }
    add(entry) {
        this.log.push({
            log: entry,
            timestamp: Date.now(),
        });
    }
}

const log = new Logger("Captain's Log");
Object.seal(log);
Object.isSealed(log);   // true

log.name = "Captain's Boring Log";          // OK
log.add("Another boring day at sea...");    // OK

log.newProp = 'test';
// TypeError: Can't add property newProp, object is not extensible

delete log.name;
// TypeError: Cannot delete property 'name' of [object Object]

Object.defineProperty(log, 'log', { enumerable: false });
// TypeError: Cannot redefine property: log
```
- 마지막으로 가장 약한 제약인 확장 금지 
- 확장 금지를 사용하면 객체에 새 프로퍼티를 추가하는 것만 금지 
- 확장을 금지할 때는 `Object.preventExtensions`, 확장이 금지됐는 지 확인할 때는 `Object.isExtensible`을 사용 
- 이번에도 `Logger` 클래스를 다시 사용하면 
```javascript
const log2 = new Logger("furst Mate's Log");
Object.preventExtensions(log2);
Object.isExtensible(log2);      // false

log2.name = "First Mate's Boring Log";      // OK
log2.add("Another boring day at sea...");   // OK

log2.newProp = 'test';
// TypeError: Can't add property newProp, object is not extensible

log2.name = 'test';     // OK
delete log2.name;       // OK
Object.defineProperty(log2, 'log', { enumerable: false });  // OK
```
- 객체 보호 옵션 표

|동작|일반 객체|동결 객체|봉인 객체|확장 금지 객체|
|---|---|---|---|---|
|프로퍼티 추가|허용됨|금지됨|금지됨|금지됨|
|프로퍼티 읽기|허용됨|허용됨|허용됨|허용됨|
|프로퍼티 값 설정|허용됨|금지됨|허용됨|허용됨|
|프로퍼티 속성 변경|허용됨|금지됨|금지됨|허용됨|
|프로퍼티 삭제|허용됨|금지됨|금지됨|허용됨|

## 프락시
- 프락시(proxies)는 ES6에서 새로 추가된 메타프로그래밍 기능 
- 메타프로그래밍이란 프로그램이 자기 자신을 수정하는 것 
- 객체 프락시는 객체에 대한 작업을 가로채고, 필요하다면 작업 자체를 수정하는 기능 
- 프로퍼티 접근을 수정하는 예제를 만들어 보면
```javascript
const coefficients = {
    a: 1,
    b: 2,
    c: 5,
};
```
- 이 객체의 프로퍼티가 수학의 계수(coefficient)라고 생각하면
```javascript
function evaluate(x, co) {
    return co.a + co.b * x + co.c * Math.pow(x, 2);
}
```
- 지금까지는 2차 방정식의 계수를 객체에 저장하고, x 값이 무엇이든 방정식을 계산할 수 있지만 계수 일부가 빠진 객체를 가지고 계산하려 한다면?
```javascript
const coefficients = {
    a: 1,
    c: 3,
};
evaluate(5, coefficients);      // NaN
```
- `cofficients.b`에 0을 할당하면 문제를 해결할 수 있지만, 프락시를 쓰는 방법이 더 나음 
- 프락시는 객체를 대상으로 한 작업을 가로채므로, 정의되지 않은 프로퍼티는 항상 0을 반환하게 만들 수 있음 
- coefficients 객체에 프락시를 만들면 
```javascript
const betterCoefficients = new Proxy(coefficients, {
    get(target, key) {
        return target[key] || 0;
    },
});
```
- CAUTION
```
프락시를 지원여부를 확인하고 사용해야 함. 파이어폭스 최신 버전은 프락시를 지원하므로 관련 코드를 파이어폭스에서 테스트 가능함 
```
- `Proxy` 생성자에 넘기는 첫 번째 매개변수는 타겟, 즉 프락시할 객체임 
- 두 번째 매개변수는 가로챌 동작을 가리키는 핸들러 
- 여기서는 프로퍼티에 접근하는 동작만 가로챗으며 `get`함수가 핸들러(프로퍼티 접근자인 get과 다름. 이 핸들러는 일반적인 프로퍼티나 접근자 프로퍼티 모두 동작)
- `get`함수는 매개변수로 타겟, 프로퍼티 키(문자열 또는 심볼), 수신자(프락시 자체 또는 프락시에서 파생되는 것)을 받음 
- 해당 키가 타겟에 있는지 확인하고 없으면 0을 반환 
```
betterCoefficients.a;           // 1
betterCoefficients.b;           // 0
betterCoefficients.c;           // 5
betterCoefficients.d;           // 0
betterCoefficients.anything;    // 0
```
- `coefficients`객체의 프락시에는 무한한 프로퍼티가 있고, 직접 정의한 프로퍼티를 제외하면 모두 값이 0인 것이나 마찬가지 
- 키로 소문자 한 글자를 받았을 때만 프락시가 동작하게 할 수도 있음
```javascript
const betterCoefficients = new Proxy(coefficients, {
    get(target, key) {
        if(!/^[a-z]$/.test(key)) return target[key];
        return target[key] || 0;
    },
});
```
- `target[key]`가 참 같은 값인지만 체크하지 않고, 키의 값이 숫자가 아닐 때는 항상 0을 반환하게 할 수도 있음 
- 마찬가지로 프로퍼티에 값을 할당하려 할 때 `set`핸들러로 가로 챌 수 있음 
- 객체에 위험한 프로퍼티가 있어서 한 단계를 더 거치지 않으면 값을 할당하거나 메서드를 호출할 수 없게 하려고 함 
- 거쳐야 할 단계는 `allowDangerousOperations setter`
- 이 값이 true일때만 위험한 프로퍼티에 접근할 수 있음 
```javascript
const cook = {
    name: "Walt",
    redPhosphorus: 100,     // 위험
    water: 500,             // 안전
};
const protectedCook = new Proxy(cook, {
    set(target, key, value) {
        if(key === 'redPhosphorus') {
            if(target.allowDangerousOperations)
                return target.redPhosphorus = value;
            else
                return console.log("Too dangerous!");
        }
        // 다른 프로퍼티는 모두 안전 
        target[key] = value;
    },
});

protectedCook.water = 550;              // 550
protectedCook.redPhosphorus = 150;      // Too dangerous!

protectedCook.allowDangerousOperations = true;
protectedCook.redPhosphorus = 150;      // 150
```
- 프락시에 대해 더 알고 싶다면 악셀 라우슈마이어(Axel Rauschmayer)의 ES6 프락시와 메타프로그래밍을 보자

## 요약
- 객체 프로퍼티가 어떻게 동작하며 그 동작 방식을 어떻게 수정할 수 있는 지 배움 
- 객체를 부주의하게 수정할 수 없도록 보호하는 방법도 배움 
- ES6에서 추가도니 프락시에 대해서도 배움 


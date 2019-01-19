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

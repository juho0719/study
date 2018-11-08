# 맵과 셋
- 맵은 키와 값을 연결한다는 점에서 객체와 비슷
- 셋은 중복을 허용하지 않는다는 점만 제외하면 배열과 비슷
  
## 맵
- ES6이전에는 키와 값을 연결하려면 객체를 사용해야 했음
- 객체를 이런 목적으로 사용하면 여러가지 단점이 생김
    - 프로토타입 체인 때문에 의도하지 않은 연결이 생길 수 있음
    - 객체 안에 연결된 키와 값이 몇 개나 되는지 쉽게 알아낼 수 있는 방법이 없음
    - 키는 반드시 문자열이나 심볼이어야 하므로 객체를 키로 써서 값과 연결할 수 없음
    - 객체는 프로퍼티 순서를 보장하지 않음
- Map객체는 이 결함들을 모두 해결
- 키와 값을 연결할 목적이면 객체보다 나음
- 사용자 객체가 여럿 있고, 이들에게 각각 역할을 부열한다고 하면
```javascript
const u1 = { name: 'Cynthia' };
const u2 = { name: 'Jackson' };
const u3 = { name: 'Olive' };
const u4 = { name: 'James' };
```
- 먼저 Map생성
```javascript
const userRoles = new Map();
```
- 맵의 set() 메서드 사용하여 역할을 할당
```javascript
userRoles.set(u1, 'User');
userRoles.set(u2, 'User');
userRoles.set(u3, 'Admin');
// James는 역할이 없음
```
- set() 메서드는 체인으로 연결할 수 있음
```javascript
userRoles
    .set(u1, 'User')
    .set(u2, 'User')
    .set(u3, 'Admin')
```
- 생성자에 배열의 배열을 넘기는 형태도 가능
```javascript
const userRoles = new Map([
    [u1, 'User'],
    [u2, 'User'],
    [u3, 'Admin'],
]);
```
- 맵에 존재하지 않는 키에 `get`하면 `undefined` 반환
- 맵에 키가 존재하는지 확인하는 `has()`도 존재
```javascript
userRoles.has(u1)   // true
userRoles.get(u1)   // "User"
userRoles.has(u4)   // false
userRoles.get(u4)   // undefined
```
- 이미 있는 키에 `set()`을 호출하면 값이 교체됨
- size 프로퍼티는 맵의 요소 숫자를 반환
```javascript
userRoles.set(u1, 'Admin');
userRoles.get(u1);          // 'Admin'

userRoles.size;             // 3
```
- `keys()`메서드는 맵의 키를, `values()`메서드는 값을
- `entries()`메서드는 첫 번째 요소가 키이고 두 번째 요소가 값인 배열을 각각 반환
- for...of 루프 가능
```javascript
for(let u of userRoles.keys())
    console.log(u.name);

for(let r of userRoles.values())
    console.log(r);

for(let ur of userRoles.entries())
    console.log(`${ur[0].name}: ${ur[1]}`);

// 맵도 분해(destruct) 가능
// 분해하면 좀 더 자연스러운 코드
for(let [u, r] of userRoles.entries())
    console.log(`${u.name}: ${r}`);

// entries() 메서드는 맵의 기본 이터레이터. 단축해서 사용 가능
for(let [u, r] of userRoles)
    console.log(`${u.name}: ${r}`);
```
- 이터러블 객체보다 배열이 필요하다면 확산 연산자(spread operator)를 사용하면 됨
```javascript
[...userRoles.values()];        // [ "User", "User", "Admin" ]
```
- 맵의 요소를 지울 때는 `delete()`
- 맵의 요소를 모두 지울 때는 `clear()`
```javascript
userRoles.delete(u2);
userRoles.size;     // 2
userRoles.clear();
userRoles.size;     // 0
```

## 위크 맵
- 다음 차이점을 제외하면 Map과 완전히 같음
    - 키는 반드시 객체여야 함
    - WeakMap의 키는 가비지컬렉션에 포함될 수 있음
    - WeakMap은 이터러블이 아니며 clear() 메서드도 없음
- 일반적으로 자바스크립트는 코드 어딘가에 객체를 참조하는 한 그 객체를 메모리에 계속 유지
- WeakMap에서는 그렇지 않음. 이런 특징은 객체 인스턴스의 전용(private)키를 저장하기에 알맞음
```javascript
const SecretHolder = (function() {
    const secrets = new WeakMap();
    return class {
        setSecret(secret) {
            secrets.set(this, secret);
        }
        getSecret() {
            return secrets.get(this);
        }
    }
})();
```
- WeakMap과 위크맵을 사용하는 클래스를 함께 IIFE에 넣었음
- IIFE 외부에서는 그 인스턴스에 비밀스런 내용을 저장할 수 있는 SecretHolder 클래스를 얻게 됨
```javascript
const a = new SecretHolder();
const b = new SecretHolder();

a.setSecret('secret A');
b.setSecret('secret B');

a.getSecret();      // "secret A"
b.getSecret();      // "secret B"
```
- 일반적인 Map을 썼다면 가비지컬렉션에 포힘되지 않음

## 셋
- 중복을 허용하지 않는 데이터 집합
```javascript
const roles = new Set();
roles.add("User");          // Set [ "User" ]
roles.add("Admin");         // Set [ "User", "Admin" ]
roles.size;                 // 2
```
- 이미 값이 있다면 아무 일도 일어나지 않음
```javascript
roles.add("User");          // Set [ "User", "Admin" ]
roles.size;                 // 2
```
- 역할을 제거 할 때는 `delete()`
```javascript
roles.delete("Admin");      // true
roels;                      // Set [ "User" ]
roles.delete("Admin");      // false
```

## 위크셋
- 객체만 포함 가능
- 가비지컬렉션 대상
- 위크셋의 실제 용도는 주어진 객체가 셋 안에 존재하는지 알아보는 것
```javascript
const naughty = new WeakSet();

const children = [
    { name: "Suzy" },
    { name: "Derek" },
];

naughty.add(children[1]);

for(let child of children) {
    if(naughty.has(child))
        console.log(`Coal for ${child.name}!`);
    else
        console.log(`Presents for ${child.name}!`);
}
```

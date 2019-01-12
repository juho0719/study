# 노드
- 2009년 조이언트(joyent)사에 근무하던 개발자 라이언 달(Ryan Dahl)은 자바스크립트를 서버에서 사용할 목적으로 노드를 만듦
- 노드는 원래 웹 애플리케이션 개발을 목적으로 만들어졌지만 서버에서 쓰이게 되면서 데스크탑 애플리케이션 개발이나 시스템 스크립트 같은 영역으로도 확장됨 
- 어떤 의미로는 노드가 나옴으로 자바스크립트가 성장해 주류 언어에 편입되도록 했다고 말할 수 있음

## 노드의 기초 
- 노드에는 DOM이 없음 
- 노드에만 해당되고 브라우저에는 존재하지 않는 API도 있음 
- 운영체제와 파일시스템 지원 같은 일부 기능은 보안상의 이유로 브라우저에는 사용할 수 없음 
- 무엇이 자바스크립트이고 무엇이 API의 일부인지 구분할 수 있어야 함 
- `window`와 `document`는 브라우저 환경에서 제공하는 API 

## 모듈
- 모듈(module)은 패키지를 만들고 코드를 네임스페이스(namespace)로 구분하는 메커니즘 
- 네임스페이스는 이름 충돌 방지 방법 
- amanda와 tyler가 모두 `calculate`함수를 만들고 두 함수를 그냥 복사해서 내 프로그램에 붙여 넣는다면?
- amanda.js
```javascript
function calculate(a, x, n) {
    if(x === 1) return a*n;
    return a*(1 - Math.pow(x, n))/(1 - x);
}
module.exports = calculate;
```
- tyler.js
```javascript
fundtion calculate(r) {
    return 4/3*Math.PI*Math.pow(r, 3);
}
module.exports = calculate;
```
- 이들 파일에서 중요한 부분은 `module.exports = calculate`임 
- `Module`은 노드에서 모듈을 구현하기 위해 만든 특별한 객체 
- `exports` 프로퍼티에 무엇을 할당하든, 모듈은 그것을 내 보냄(export)
- app.js파일을 만들고 그 파일에서 이들 모듈을 임포트 
```javascript
const amanda_caculate = require('./amanda.js');
const tyler_calculate = require('./tyler.js');

console.log(amanda_calculate(1, 2, 5));     // 31
console.log(tyler_calculate(2));            // 33.510321638291124
```
- 아만다는 등비급수(geometric series)의 합인 a + ax + ax^2 + ... + ax^(n-1)
- 타일러는 반지름이 r인 구체의 체적(volumn of a sphere)을 구하고 있음
- app.js에서 더 적당한 이름을 정해서 수정 
```javascript
const geometricSum = require('./amanda.js');
const sphereVolume = require('./tyler.js');

console.log(geometricSum(1, 2, 5));     // 31
console.log(sphereVolume(2));           // 33.510321638291124
```
- 모듈은 어떤 타입의 값이든 내보낼 수 있음 
- 그럴 이유는 없지만 원한다면 문자열이나 숫자 같은 원시 값을 내보낼 수도 있음 
- 보통은 모듈 하나에 여러 함수를 저장하고 그 함수를 메서드로 포함하는 객체를 내보내는 것이 일반적 
- 아만다가 등비급수의 합 외에도 여러가지 유용한 기하학 함수를 모듈로 내보내려 한다고 가정하면?
```javascript
module.exports = {
    geometricSum(a, x, n) {
        if(x === 1) return a*n;
        return a*(1 - Math.pow(x, n))/(1 - x);
    },
    arithmeticSum(n) {
        return (n + 1)*n/2;
    },
    quadraticFormula(a, b, c) {
        const D = Math.sqrt(b*b - 4*a*c);
        return [(-b + D)/(2*a), (-b - D)/(2*a)];
    }
}
```
- 좀 더 전통적인 네임스페이스 형태를 쓸 수 있음 
- 반환받은 것에만 이름을 붙이면, 그 안에 포함된 것들에는 이미 이름이 정해져 있음 
```javascript
const amanda = require('./amanda.js');
console.log(amanda.geometricSum(1, 2, 5));          // logs 31
console.log(amanda.quadraticFormula(1, 2 ,-15));    // logs [3, -5]
```
- 모듈은 단순히 일반적인 객체를 내보낼 뿐.
- 객체에 함수 프로퍼티가 있었을 뿐. 
```javascript
exports.geometricSum = function(a, x, n) {
    if(x === 1) return a*n;
    return a*(1 - Math.pow(x, n))/(1 - x);
};
exports.arithmeticSum(n) {
        return (n + 1)*n/2;
    }
exports.quadraticFormula(a, b, c) {
        const D = Math.sqrt(b*b - 4*a*c);
        return [(-b + D)/(2*a), (-b - D)/(2*a)];
    }
}
```
- 노트
```
exports를 사용한 단축 문법은 객체를 내보낼 때만 사용
```


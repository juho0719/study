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

## 코어 모듈, 파일 모듈, npm 모듈
- 모듈은 코어, 파일, npm 세가지로 나뉨 
- 코어 모듈은 fs나 os처럼 노드 자체에서 제공하는 모듈이며 이들은 모두 예약어
- 파일 모듈은 이전 예제에서 보듯, `module.exports`에 할당되는 파일을 만들고 그 파일을 불러 사용 
- npm 모듈은 `node_modules`에 저장되는 모듈 파일. `require`함수를 사용하면 노드는 함수의 매개변수를 보고 어떤 타입인지 판단함 

|타입|매개변수|예제|
|---|---|---|
|코어|/, ./, ../ 등으로 시작하지 않음|require('fs')<br>require('os')<br>require('http')<br>require('child_process')|
|파일|/, ./, ../ 등으로 시작|require('./debug.js')<br>require('/full/path/to/module.js')<br>require('../a.js')<br>require('../../a.js')|
|npm|코어 모듈이 아니며 /, ./, ../으로 시작하지도 않음|require('debug')<br>require('express')<br>require('chalk')<br>require('koa')|
- `process`와 `buffer` 같은 일부 코어 모듈은 전역이고, 명시적인 `require`문 없이 사용 가능

|모듈|전역여부|설명|
|---|---|---|
|assert|아님|테스트 목적 사용|
|buffer|전역|입출력 I/O 작업에 사용(주로 파일과 네트워크)|
|child_process|아님|외부 프로그램 실행시 필요|
|cluster|아님|다중 프로세스를 이용해 성능 향상|
|crypto|아님|내장 암호화 라이브러리|
|dns|아님|도메인 네임 시스템 함수|
|domain|아님|에러를 고립시키기 위해 I/O 작업이나 비동기적 작업을 그룹으로 묶을 수 있음|
|events|아님|비동기적 이벤트 지원|
|fs|아님|파일시스템 작업|
|http|아님|HTTP 서버 및 관련된 유틸|
|https|아님|HTTPS 서버 및 관련된 유틸|
|net|아님|비동기적 소켓 기반 네트워크 API|
|os|아님|운영체제 유틸리티|
|path|아님|파일시스템에서 사용하는 경로(path)관련 유틸리티|
|punycode|아님|유니코드 인코딩을 지원하며 ASCII 부분집합을 일부 사용|
|querystring|아님|URL 쿼리스트링 해석|
|readline|아님|대화형 I/O 유틸리티, 주로 콘솔 프로그램에서 사용|
|smalloc|아님|버퍼에 메모릴르 명시적으로 할당할 때 사용|
|stream|전역|스트림 기반 데이터 전송에 사용|
|string_decoder|아님|버퍼를 문자열로 변환|
|tls|아님|보언 전송 계층(TLS) 통신 유틸|
|tty|아님|저수준 TTY(TeleTYPewriter)함수|
|dgram|아님|사용자 데이터그램 프로토콜(UDP) 네트워크 유틸|
|url|전역|URL 파싱 유틸|
|util|아님|내부 노드 유틸|
|vm|아님|자바스크립트 가상 머신. 메타프로그래밍이나 컨텍스트 생성에 사용|
|zlib|아님|압축 유틸|

- npm 모듈은 특수한 이름 표기법을 사용하는 파일 모듈 
- 모듈 `x`를 가져올 때, `x`가 코어 모듈 이름이 아니라면 노드는 먼저 현재 디렉토리에 `node_modules`서브 디렉토리가 있는지 확인. 있으면 그안에서 `x`를 찾음. 모듈을 찾거나 루트 디렉토리에 도달할 때까지 이과정 반복
- 예를 들어 프로젝트가 `home/jdoe/test_project`에 있고 애플리케이션 파일에서 `require('x')`를 호출 한다면 다음과 같은 순서로 모듈 `x`를 찾음
    - home/jdoe/test_proejct/node_modules/x
    - home/jdoe/node_modules/x
    - home/node_modules/x
    - /node_modules/x
- `node_modules` 디렉토리에 직접 추가하거나 제거해서는 안되고, 반드시 npm에서 하도록 해야 함 

## 함수 모듈을 통한 모듈 커스터마이징
- 모듈은 대부분 객체를 내보내지만, 이따금 함수 하나만 내보낼 때도 있음 
- 함수 하나만 내보내는 경우는 그 모듈의 함수를 즉시 호출하려는 의도로 만들 때가 대부분
- 이런 경우 그 함수를 사용하려는 게 아니라 그 함수의 반환값을 사용하려는 의도임 
- 이런 패턴은 모듈을 일부 커스터마이즈 하거나, 주변 컨텍스트에서 정보를 얻어야 할 때 주로 사용
- 실제 쓰이는 npm 패키지 `debug`를 보면 `debug`를 임포트할 때는 문자열 매개변수를 하나 넘김 
- 이 문자열은 로그 앞에 접두사로 써서 프로그램의 다른 부분과 구별하는 역할 
```javascript
const debug = require('debug')('main');     // 모듈이 반환하는 함수를 즉시 호출
debug("starting");      // 디버그가 활성화 되어 있으면 "main starting +0ms"라는 로그를 남김 
```
- TIP
```
debug 모듈로 디버그를 할 때는 환경 변수 DEBUG를 수정. 위 예제라면 DEBUG=main으로 세팅했을 것임.
DEBUG=*를 써서 디버그 메시지를 모두 로그에 기록하게 할 수도 있음 
```
- 위 예제를 보면 `debug`모듈이 반환한 것을 즉시 호출했으므로 `debug`모듈이 함수를 반환한다는 것을 알 수 있고, 반환값인 함수 역시 함수를 반환하며 최종적으로 반환된 함수는 첫 번째 함수에 넘긴 문자열을 '기억'
- 최종적으로 반환된 함수는 첫 번째 함수에 넘긴 문자열을 '기억'한다는 걸 알 수 있음 
- `debug`모듈을 직접 만들었다면?
```javascript
let lastMessage;

module.exports = function(prefix) {
    return function(message) {
        const now = Date.now();
        const sinceLastMessage = now - (lastMessage || now);
        console.log(`${prefix}${message} + ${sinceLastMessage}ms`);
        lastMessage = now;
    }
}
```
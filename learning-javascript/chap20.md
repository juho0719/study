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
- 이 모듈이 내보내는 함수는 즉시 호출해서 `prefix`값으로 모듈 자체를 커스터마이즈 하도록 설계 
- `lastMessage`는 마지막 메시지를 기록했을 때의 타임스탬프. 이 값을 사용하여 메시지 사이 시간을 계산할 수 있음 
- 모듈을 여러번 임포트 하면 어떻게 되는가?
```javascript
const debug1 = require('./debug')('one');
const debug2 = require('./debug')('two');

debug1('started first debugger!');
debug2('started second debugger!');

setTimeout(function() {
    debug1('after some time...');
    debug2('what happens?');
}, 200);
```
- 다음과 같은 결과를 볼 거라 기대하지만?
```
one started first debugger! +0ms
two started second debugger! +0ms
one after some time... +200ms
two what happens? +200ms
```
- 실제 보이는 화면은?
```
one started first debugger! +0ms
two started second debugger! +0ms
one after some time... +200ms
two what happens? +0ms
```
- 노드는 노드 앱을 실행할 때 어떤 모듈이든 단 한 번만 임포트 
- 따라서 `debug`모듈을 두번 임포트하더라도, 노드는 해당 모듈을 이미 임포트했음을 인식하고 다시 임포트 하지 않음 
- TIP
```
npm의 debug 모듈 역시 우리가 만든 모듈과 비슷한 방법으로 동작 
독립적인 디버그 로그를 여러 개 기록하고 싶다면, lastMessage 타임스탬프를 모듈이 반환하는 함수로 옮기면 됨 
이렇게 하면 각 함수마다 서로 다른 타임스탬프를 유지하므로 디버그 로그 역시 독립적으로 운영 가능 
```

## 파일시스템 접근 
- 프로젝트 루트를 `/home/juho/fs`와 같이 임의로 정함
- 파일을 만들 때는 `fs.writeFile`을 사용 
- 프로젝트 루트에 다음과 같이 `write.js`파일을 생성 
```javascript
const fs = require('fs');

fs.writeFile('hello.txt', 'hello from Node!', function(err) {
    if(err) return console.log('Error writing to file.');
});
```
- `write.js`파일을 저장한 디렉토리에 쓰기 권한이 있고, 읽기 전용 `hello.txt`파일이 존재하지 않으면 `hello.txt`파일이 생성됨 
- 노드 애플리케이션을 실행하면 해당 애플리케이션은 자신이 실행된 작업 디렉토리를 `__dirname`변수로 보관 
- 이 변수를 사용해 `write.js`파일을 다음과 같이 고칠 수 있음 
```javascript

const fs = require('fs');
fs.writeFile(__dirname + '/hello.txt', 
        'hello from Node!', function(err) {
    if(err) return console.log('Error writing to file.');
});
```
- 이제 `write.js`는 항상 `/home/juho/fs`에 `hello.txt`를 생성함 
- 문자열 병합으로 `__dirname`과 파일 이름을 합쳐서 파일 경로를 얻으면 운영체제에 따라 호환되지 않을 수도 있음 
- 이 예제에서 사용한 방법은 윈도우에서 동작하지 않음 
- 노드의 `path`모듈에는 운영체제 독립적인 경로 이름 유틸리티가 있음 
```javascript
const fs = require('fs');
const path = require('path');

fs.writeFile(path.join(__dirname, 'hello.txt'), function(err, data) {
    if(err) return console.error('Error reading file.');
    console.log('Read file contents:');
    console.log(data);
});
```
- 실행결과는?
```
Read file contents:
<buffer 68 65 6c 6f 20 66 72 6d 4e 64 21>
```
- 이 16진수 코드를 ASCII/Unicode로 바꾸면 `hello from Node!`이긴 함
- `fs.readFile`에 인코딩 정보를 제공하지 않으면 `fs.readFile`은 가공되지 않은 바이너리 데이터인 버퍼를 반환 
- `read.js`에 UTF-8인코딩을 지정하면 원하는 문자로 나옴 
```javascript
const fs = require('fs');
const path = require('path');

fs.writeFile(path.join(__dirname, 'hello.txt'), 
        { encoding: 'utf8' }, function(err, data) {
    if(err) return console.error('Error reading file.');
    console.log('Read file contents:');
    console.log(data);
});
```
- 파일 관련 함수에는 모두 동기적으로 작업하는 짝이 있으며, 이들의 이름은 `Sync`로 끝남 
- `write.js`
```javascript
fs.writeFileSync(path.join(__dirname, 'hello.txt'), 'hello from Node!');
```
- `read.js`
```javascript
const data = fs.readFileSync(path.join(__dirname, 'hello.txt'),
    { encoding: 'utf8' });
```
- 동기적인 함수에서는 `try/catch`를 사용 
```javascript
try {
    fs.writeFileSync(path.join(__dirname, 'hello.txt'), 'hello from Node!');
} catch(err) {
    console.error('Error writing file.');
}
```
- CAUTION
```
웹 서버나 네트워크 애플리케이션을 만들 때는 항상 비동기적 함수를 써야 함
```
- 디렉토리에 어떤 파일이 있는 지 보기위해 `fs.readdir`을 찾고 왔어 
- `ls.js`파일 생성
```javascript
const fs = require('fs');

fs.readdir(__dirname, function(err, files) {
    if(err) return console.error('Unable to read directory contents');
    console.log(`Contents of ${__dirname}:`);
    console.log(files.map(f => '\t' + f).join('\n'));
})
```
- `fs` 모듈에는 여러가지 함수들이 있음  
- 파일 지울 때 `fs.unlink`, 파일을 옮기거나 이름을 바꿀때 `fs.rename`, 파일이나 디렉토리 정보를 얻을 때 `fs.stat`

## process
- 실행 중인 노드 프로그램은 모두 `process`에 접근할 수 있음 
- 이 변수는 해당 프로그램에 관한 정보를 담고 있으며 실행 자체를 컨트롤할 수도 있음 
- 예를 들어 애플리케이션이 치명적인 에러를 만나서 계속 실행하지 않는 편이 좋거나 더 실행해도 의미가 없는 상황이라면 (이런 에러를 fatal error라고 함) `process.exit`를 호출해 즉시 실행을 멈출 수 있음 
- 숫자형 종료 코드(exit code)를 쓰면 프로그램이 성공적으로 종료 했는 지 에러가 있었는 지 외부 스크립트를 통해 알 수 있음 
- 보통 에러 없이 끝냈을 땐 종료 코드 0을 사용
- data 서브 디렉토리에 있는 `.txt`파일을 모두 처리하는 프로그램이 있다고 치고 data 서브 디렉토리에 `.txt`파일이 없다면?
```javascript
const fs = require('fs');

fs.readdir('data', function(err, files) {
    if(err) {
        console.error("Fatal error: couldn't read data directory.");
        process.exit(1);
    }
    const txtFiles = files.filter(f => /\.txt$/i.test(f));
    if(txtFiles.length === 0) {
        console.log("No .txt files to process.");
        process.exit(0);
    }
    // .txt 파일 처리 
});
```
- `process` 객체를 통해 프로그램에 전달된 명령줄 매개변수 배열에 접근할 수도 있음 
- 노드 애플리케이션을 실행할 때 명령줄에서 매개변수를 지정할 수 있음 
- 예를 들어 파일 이름을 매개변수로 넘기고 각 파일이 몇 행인지 출력한다고 하면?
```
$ node linecount.js file1.txt file2.txt file3.txt
```
- 명령줄 매개변수는 `process.argv` 배열에 저장 
- `process.argv`를 보면 
```
[ 'node',
  '/home/juho/linecount.js',
  'file1.txt',
  'file2.txt',
  'file3.txt' ]
```
- 첫 번째 요소는 인터프리터, 두 번째 요소는 실행중인 프로그램의 전체 경로, 나머지는 매개변수
- 추가 정보는 필요 없으므로 `Array.slice`를 써서 걸러 냄 
```javascript
const fs = require('fs');

const filenames = process.argv.slice(2);

let counts = filenames.map(f => {
    try {
        const data = fs.readFileSync(f, { encoding: 'utf8' });
        return `${f}: ${data.split('\n').length}`;
    } catch(err) {
        return `${f}: couldn't read file`;
    }
});

console.log(counts.join('\n'));
```
- `process.env`를 통해 환경 변수에 접근할 수도 있음 
- 디버그 정보에 대한 기록 여부를 환경 변수로 컨트롤 한다라고 하면?(환경변수 DEBUG를 1로 설정하면 기록, 아니면 하지 않음)
```javascript
const debug = process.env.DEBUG === "1" ?
    console.log :
    function() {};

debug("Visible only if environment variable DEBUG is set!");
```
- `process.cmd`에는 현재 작업 디렉토리가 저장, `process.chdir`로 현재 작업 디렉토리를 바꿀 수 있음
- 현재 작업 디렉토리를 출력한 다음, 프로그램이 저장된 디렉토리로 현재 작업 디렉토리를 바꾸려면?
```javascript
console.log(`Current directory: ${process.cwd()}`);
process.chdir(__dirname);
console.log(`New current directory: ${process.cwd()}`);
```
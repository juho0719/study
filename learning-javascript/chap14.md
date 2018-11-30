# 비동기적 프로그래밍
- 자바스크립트 애플리케이션은 단일 스레드에서 동작
- 자바스크립트의 비동기적 프로그래밍에는 세 가지 패러다임이 있음
    - 콜백
    - 프라미스
    - 제너레이터
- 제너레이터가 콜백이나 프라미스보다 모든 면에서 더 좋다면 제너레이터만 공부하겠지만 제너레이터 자체는 비동기적 프로그래밍을 지원하지 않고, 프라미스나 특수한 콜백과 함께 사용되야 함
- 프라미스 역시 콜백에 의존
- 콜백은 제너레이터나 프라미스 외에도 이벤트 처리 등에 유용하게 쓸 수 있음
- 사용자 입력 외에 비동기적 테크닉을 사용해야 하는 경우는 다음 세가지가 있음
    - Ajax 호출을 비롯한 네트워크 요청
    - 파일을 읽고 쓰는 등의 파일시스템 작업
    - 의도적으로 시간 지연을 사용하는 기능(알람 등)

## 비유
- 콜백과 프라미스를 설명할 때 예약하지 않고 분주한 음식점에 방문한 경우로 자주 비유 됨
- 어떤 음식점은 줄을 서서 기다리지 않도록, 전화번호를 받아서 자리가 나면 전화를 해주는 경우가 있는 데 이런 경우가 콜백과 비슷함
- 자리가 나면 내가 알 수 있도록 하는 수단을 음식점 주인에게 넘겨주고 음식점은 다른 손님을 대접하다가 자리가 나면 호출하면 됨.
- 다른 음식점은 자리가 났을 때 진동하는 호출기를 넘겨줄 때가 있는 데 이런 경우는 프라미스와 비슷함

## 콜백
- 콜백은 간단히 말해 나중에 호출할 함수
- 콜백 함수도 일반적인 자바스크립트 함수
- 콜백 함수는 일반적으로 다른 함수에 넘기거나 객체의 프로퍼티로 사용
- 보통 익명 함수로 사용
- setTimeout을 사용하는 간단한 예제
```javascript
console.log("Before timeout: " + new Date());
function f() {
    console.log("After timeout: " + new Date());
}
setTimeout(f, 60*1000); // 1분
console.log("I happen after setTimeout!");
console.log("Me too!");
```
- 위와 같이 자바스크립트를 작성하면 아래와 같은 결과를 예상함
```
Before timeout: (현재 시간)
I happen after setTimeout!
Me too!
After timeout: (1분 후 시간)
```
- 하지만 실제론 아래와 같은 결과가 예상됨
```
Before timeout: (현재 시간)
After timeout: (1분 후 시간)
I happen after setTimeout!
Me too!
```
- `setTimeout`을 익명함수로 변경하면
```javascript
setTimeout(fucntion() {
    console.log("After timeout :" + new Date());
}, 60*1000);
```
- `setTimeout`에 문법적인 불편함이 하나 있음
- 지연 시간을 정하는 숫자 매개변수가 마지막 매개변수이기 때문에 익명 함수를 사용할 때, 특히 그 함수의 길이가 길다면 시간 매개변수를 찾기 어렵거나 익명 함수의 일부분으로 보일 때가 있음
- 지역 매개변수는 마지막 행에 쓴다는 원칙을 세워 두면 이런 혼란을 피할 수 있음

#### setInterval과 clearInterval
- `setTimeout`은 콜백 함수를 한 번만 실행하고 멈추지만, `setInterval`은 콜백을 정해진 주기마다 호출
- 분이 넘어가거나 10회째가 될 때까지 5초마다 콜백을 실행하는 예제
```javascript
const start = new Date();
let i=0;
const intervalId = setInterval(function() {
    let now = new Date();
    if(now.getMinutes() !== start.getMinutes() || ++i>10) {
        return clearInterval(intervalId);
    }
    console.log(`${i}: ${now}`);
}, 5*1000);
```
- 이 예제를 보면 `setInterval`이 ID를 반환하고 이 ID를 써서 실행을 멈출 수 있음
- `clearTimeout`은 `setInterval`이 반환하는 ID를 받아 타임아웃을 멈춤
- `setTimeout`, `setInterval`, `clearInterval`은 모두 전역 객체(브라우저에서는 window, 노드에서는 global)에 정의

#### 스코프와 비동기적 실행
- 스코프와 클로저가 비동기적 실행에 영향을 미치는 경우가 있음
- 함수를 호출하면 항상 클로저가 만들어지고 매개변수를 포함해 함수 안에서 만든 변수는 자신에 접근할 수 있는 무언가가 있는 한 계속 존재함
- 기존의 `countdown`함수를 보고 스코프와 비동기적 실행이 어떻게 연관되어 있는 지 이해해보자
- `countdown`을 호출하면 변수 i가 들어있는 클로저가 생성됨
- for루프 안에서 만드는 콜백은 모두 i에 접근할 수 있고, 그들이 접근하는 i는 똑같은 i임
- for루프 안에서 i를 두 가지 방법으로 사용함
- i를 써서 타임아웃을 계산하는 (5-i)*1000 부분은 예상대로 동작함
- 첫 번째 아웃은 0, 두 번째 아웃은 1000, 세 번째 아웃은 2000
- 이 계산이 예상대로 동작한 것은 동기적으로 실행됐기 때문
- `setTimeout`을 호출하는 것 역시 동기적
- `setTimeout`을 동기적으로 호출해야만 콜백을 언제 호출할지 계산할 수 있음
- 비동기적인 부분은 `setTimeout`에 전달된 함수이고, 문제는 여기서부터 복잡해짐
- 이 문제는 즉시 호출하는 함수 표현식(IIFE)으로 해결
```javascript
function countdown() {
    console.log("Countdown:");
    for(let i=5; i>=0; i--) {       // 이제 i는 블록 스코프 변수
        setTimeout(function() {
            console.log(i===0 ? "GO!" : i);
        }, (5-i)*1000);
    }
}
countdown();
```
- 여기서 주의할 부분이 콜백이 어느 스코프에서 선언됐느냐임
- 콜백은 자신을 선언한 스코프(클로저)에 있는 것에 접근할 수 있음
- 따라서 i의 값은 콜백이 실제 실행되는 순간마다 다를 수 있음

#### 오류 우선 콜백
- 콜백을 사용하면 예외 처리가 어려워지므로 콜백과 관련된 에러 처리할 방법의 표준이 필요해짐
- 이에 따라 나타난 패턴이 콜백의 첫 번째 매개변수에 에러 객체를 사용하자는 것
- 에러가 null이거나 undefined이면 에러가 없는 것
- 오류 우선 콜백을 다룰 때 가장 먼저 생각할 것은 에러 매개변수를 체크하고 그에 맞게 반응하는 것
- 노드에서 파일 컨텐츠를 읽는다고 할 때, 오류 우선 콜백을 사용한다면 다음과 같은 코드를 사용하게 됨
```javascript
const fs = require('fs');

const fname = 'may_or_may_not_exist.txt';
fs.readFile(fname, function(err, data) {
    if(err) return console.error(`error reading file ${fname}: ${err.message}`);
    console.log(`${fname} contents: ${data}`);
});
```
- 콜백에서 가장 먼저 하는 일은 err이 참 같은 값인지 확인하는 것
- err이 참 같은 값이라면 파일을 읽는 데 문제가 있다는 뜻으로 콘솔에 오류를 보고하고 즉시 빠져나옴
- 오류 우선 콜백을 사용할 때 가장 많이 벌어지는 실수는 빠져나와야 한다는 사실을 잊는 것
- 프라미스를 사용하지 않으면 오류 우선 콜백은 노드 개발의 표준이나 다름 없음

#### 콜백 헬
- 세 가지 파일의 컨텐츠를 읽고, 60초가 지난 다음 이들을 결합해 네 번째 파일에 기록하는 로직
```javascript
const fs = require('fs');

fs.readFile('a.txt', function(err, dataA) {
    if(err) console.error(err);
    fs.readFile('b.txt', function(err, dataB) {
        if(err) console.error(err);
        fs.readFile('c.txt', function(err, dataC) {
            if(err) console.error(err);
            setTimeout(function() {
                fs.writeFile('d.txt', dataA+dataB+dataC, function(err) {
                    if(err) console.error(err);
                })
            }, 60*1000);
        });
    });
});
```
- 이런 코드를 콜백 헬이라 부름
- 중괄호로 둘러싸여 끝없이 중첩된 삼각형의 코드 블록들은 마치 버뮤다 삼각지대처럼 보일 지경
- 더 골치 아픈 문제는 에러 처리
```javascript
const fs = require('fs');
function readSketchyFile() {
    try {
        fs.readFile('does_not_exist.txt', function(err, data) {
            if(err) throw err;
        });
    } catch(err) {
        console.log('warning: minor issue occurred, program continuing');
    }
}
readSketchyFile();
```
- 이 코드는 정상적인 것 같지만 실제로는 동작하지 않음
- 예외 처리가 의도대로 동작하지 않는 이유는 try...catch 블록은 같은 함수 안에서만 동작하기 때문
- try...catch 블록은 readSketchyFile 함수 안에 있지만, 정작 예외는 fs.readFile이 콜백으로 호출하는 익명 함수 안에서 일어남
- 이 밖에도 콜백이 우연히 두 번 호출되거나 아예 호출되지 않는 경우를 방지하는 안전장치도 없음
- 비동기적 코드가 늘어나면 늘어날수록 버그가 없고 관리하기 쉬운 코드를 작성하는 것이 매우 어려워짐. 그래서 프라미스가 등장함

## 프라미스
- 콜백의 단점을 보완하지만 대체하는 건 아님
- 프라미스에서도 콜백을 사용
- 프라미스 없이 콜백만 사용했을 때 나타날 수 있는 엉뚱한 현상이나 찾기 힘든 버그를 해결
- 비동기적 함수를 호출하면 프라미스 인스턴스를 반환
- 프라미스는 성공(fulfilled)하거나 실패(rejectec), 둘 중 하나만
- 프라미스는 객체이므로 어디든 전달할 수 있다는 점도 장점
- 비동기적 처리를 여기서 하지 않고, 다른 함수에서 처리하게 하고 싶다면 프라미스를 넘기기만 하면 됨

#### 프라미스 만들기
- resolve(성공), reject(실패) 콜백이 있는 함수로 새 프라미스 인스턴스를 만들면 됨
- `countdown`함수를 고쳐 매개변수를 받게 해 5초 카운트다운에 매이지 않게 하고 카운트다운이 끝나면 프라미스를 반환
```javascript
function countdown(seconds) {
    return new Promise(function(resolve, reject) {
        for(let i=seconds; i>=0; i--) {
            setTimeout(function() {
                if(i>0) console.log(i + '...');
                else resolve(console.log("GO!"));
            }, (seconds-i)*1000);
        }
    });
}
```
- 이대로라면 좋은 함수는 아님
- 너무 장황하고, 콘솔을 아예 쓰지 않기를 원할 수도 있음

#### 프라미스 사용
- 프라미스는 무시하고, `countdown(5)`처럼 호출해도 됨
- 하지만 프라미스의 장점을 이용하고 싶다면?
```javascript
countdown(5).then(
    function() {
        console.log("countdown completed successfully");
    },
    function(err) {
        console.log("countdown experienced an error: "+err.message);
    }
);
```
- 이 예제는 반환된 프라미스를 변수에 할당하지 않고, 바로 `then`핸들러를 호출
- `then`핸들러는 성공 콜백과 실패 콜백을 받음
- 경우의 수는 단 두가지, 성공 콜백이 실행되거나 에러 콜백이 실행되거나
- catch핸들러도 지원하므로 핸들러를 둘로 나눠서 써도 됨
```javascript
const p = countdown(5);
p.then(function() {
    console.log("countdown completed successfully");
});
p.catch(function(err) {
    console.log("countdown experienced an error: "+err.message);
});
```

- `countdown`함수를 수정해서 에러가 발생되도록 만들어 봄
```javascript
function countdown(seconds) {
    return new Promise(function(resolve, reject) {
        for(let i=seconds; i>=0; i--) {
            setTimeout(function() {
                if(i===13) return reject(new Error("Oh my god"));
                if(i>0) console.log(i + '...');
                else resolve(console.log("GO!"));
            }, (seconds-i)*1000);
        }
    });
}
```
- 13이상의 숫자를 사용하면 13에서 에러가 발생
- 하지만 콘솔에는 12부터 다시 카운트를 기록함.
- reject나 resolve가 함수를 멈추게 하지 않음. 그저 상태만 관리함

#### 이벤트
- 이벤트가 일어나면 이벤트 발생을 담당하는 개체(emitter)에서 이벤트가 일어났음을 알림
- 필요한 이벤트는 콜백을 통해 모두 주시(listen)할 수 있음
- 노드에는 이미 이벤트를 지원하는 모듈 `EventEmitter`가 내장되어 있음
- 이 모듈을 써서 `countdown`함수를 개선해 보면
```javascript
const EventEmitter = require('events').EventEmitter;

class Countdown extends EventEmitter {
    constructor(seconds, superstitious) {
        super();
        this.seconds = seconds;
        this.superstitious = !!superstitious;
    }
    go() {
        const coundown = this;
        return new Promise(function(resolve, reject) {
            for(let i=countdown.seconds; i>=0; i--) {
                setTimeout(function() {
                    if(countdown.superstitious && i === 13)
                        return reject(new Error("Oh my god"));
                    countdown.emit('tick', i);
                    if(i === 0) resolve();
                }, (countdown.seconds-i)*1000);
            }
        });
    }
}
```
- `EventEmitter`를 상속하는 클래스는 이벤트를 발생시킬 수 있음
- 카운트다운을 시작하고 프라미스를 반환하는 부분은 `go`메서드
- `countdown`에 `this`를 할당하여 카운트다운이 얼마나 남았는지, 13인지 아닌지 확인
- `this`는 특별한 변수이고 콜백안에서는 값이 달라짐
- 따라서 `this`의 현재 값을 다른 변수에 저장해야 프라미스 안에서 쓸 수 있음
- 여기에서 가장 중요한 부분은 `countdown.emit('tick', i)`임.
- `tick`이벤트를 발생시키고 필요하다면 프로그램의 다른부분에서 이 이벤트를 주시할 수 있음
```javascript
const c = new Countdown(5);

c.on('tick', function(i) {
    if(i>0) console.log(i + '...');
});
c.go()
    .then(function() {
        console.log('GO!');
    })
    .catch(function(err) {
        console.error(err.message);
    })
```
- `EventEmitter`의 on메서드가 이벤트를 주시하는 부분
- 이 예제는 `tick`이벤트 전체에 콜백을 등록
- tick이 0이 아니면 출력한 다음 끝나면 GO!를 출력
- `Countdown`인스턴스가 13에 도달했을 때 프라미스를 파기했는데도 카운트다운이 계속 진행되는 문제가 남음
```javascript
const c = new Countdown(15, true)
    .on('tick', function(i) {       // 체인으로 연결해도 됨
        if(i>0) console.log(i + '...');
    });

c.go()
    .then(function() {
        console.log('GO!');
    })
    .catch(function(err) {
        console.error(err.message);
    })
```
- 더 진행할 수 없다는 사실을 아는 즉시 대기중인 타임아웃을 모두 취소
```javascript
const EventEmitter = require('events').EventEmitter;

class Countdown extends EventEmitter {
    constructor(seconds, superstitious) {
        super();
        this.seconds = seconds;
        this.superstitious = !!superstitious;
    }
    go() {
        const coundown = this;
        const timeoutIds = [];
        return new Promise(function(resolve, reject) {
            for(let i=countdown.seconds; i>=0; i--) {
                timeoutIds.push(
                    setTimeout(function() {
                    if(countdown.superstitious && i === 13) {
                        // 대기중인 타임아웃을 모두 취소
                        timeoutIds.forEach(clearTimeout);
                        return reject(new Error("Oh my god"));                        
                    }
                    countdown.emit('tick', i);
                    if(i === 0) resolve();
                }, (countdown.seconds-i)*1000));
            }
        });
    }
}
```

#### 프라미스 체인

- 프라미스에는 체인으로 연결할 수 있다는 장점이 있음
- 프라미스가 완료되면 다른 프라미스를 반환하는 함수를 즉시 호출할 수 있음
- `launch`함수를 만들어 카운트다운이 끝나면 실행되게 함
```javascript
function launch() {
    return new Promise(function(resolve, reject) {
        console.log("Lift off!");
        setTimeout(function() {
            resolve("In orbit!");
        }, 2*1000);
    });
}
```
- 이 함수를 카운트다운에 묶을 수 있음
```javascript
const c = new Countdown(5)
    .on('tick', i => console.log(i + '...'));

c.go()
    .then(launch)
    .then(function(msg) {
        console.log(msg);
    })
    .catch(function(err) {
        console.error("Houston, we have a problem....");
    })
```
- 프라미스 체인을 사용하면 모든 단계에서 에러를 캐치할 필요 ㅇ벗음
- 체인 어디에서든 에러가 생기면 체인 전체가 멈추고 `catch`핸들러가 동작

#### 결정되지 않는 프라미스 방지하기
- 프라미스는 비동기적 코드를 단순화하고 콜백이 두 번 이상 실행되는 문제를 방지
- `resolve`나 `reject`를 호출하는 걸 잊어 프라미스가 결정되지 않는 문제까지 자동으로 해결하지는 못함
- 에러가 일어나지 않아 이런 실수는 찾기 매우 어려움
- 결정되지 않은 프라미스를 방지하는 한 가지 방법은 타임아웃을 거는 것
- `launch`함수에 에러 조건을 넣고, 발사하는 로켓은 열 번에 다섯 번은 실패하는 로켓으로 작성
```javascript
function launch() {
    return new Promise(function(resolve, reject) {
        if(Math.random() < 0.5) return;
        console.log("Lift off!");
        setTimeout(function() {
            resolve("In orbit!");
        }, 2*1000);
    });
}
```
- 이 코드는 `reject`를 호출하지 않는데다가 콘솔에 기록하지도 않음
- 열 번 시도하면 다섯 번은 영문도 모른 채 실패하는 셈
- 타임아웃을 거는 함수를 만듦
```javascript
function addTimeout(fn, timeout) {
    if(timeout === undefined) timeout = 1000;   // 타임아웃 값
    return function(...args) {
        return new Promise(function(resolve, reject) {
            const tid = setTimeout(reject, timeout, new Error("promise timed out"));
            fn(...args)
                .then(function(...args) {
                    clearTimeout(tid);
                    resolve(...args);
                })
                .catch(function(...args) {
                    clearTimeout(tid);
                    reject(...args);
                });
        });
    }
}
```
- 가장 느린 로켓도 10초안에는 궤도에 들어갈 수 있다고 가정하면 타임아웃 값은 11초면 충분함
```javascript
c.go()
    .then(addTimeout(launch, 11*1000))
    .then(tunction(msg) {
        console.log(msg);
    })
    .catch(function(err) {
        console.error("Houston, we have a problem: " + err.message);
    });
```

## 제너레이터
- 함수와 호출자 사이의 양방향 통신을 가능하게 함
- 원래 동기적인 성격을 가졌지만, 프라미스와 결합하면 비동기 코드를 효율적으로 관리할 수 있음
- 파일 세 개를 읽고 1분간 기다린 다음 그 내용을 합쳐서 네 번째 파일에 쓰는 문제를 다시 보면..
```javascript
dataA = read contentes of 'a.txt'
dataB = read contentes of 'b.txt'
dataC = read contentes of 'c.txt'
wait 60 seconds
write dataA + dataB + dataC to 'd.txt'
```
- 제너레이터를 사용하면 이런 비슷한 코드를 작성 할 수 있음
- 가장 먼저 할 일은 콜백을 프라미스로 바꾸는 일
```javascript
function nfcall(f, ...args) {
    return new Promise(function(resolve, reject) {
        f.call(null, ...args, function(err, ...args) {
            if(err) return reject(err);
            resolve(args.length<2 ? args[0] : args);
        });
    });
}
```
- [Q 프라미스 라이브러리](https://github.com/kriskowal/q)의 `nfcall`메서드를 참고
- setTimeout과 같은 기능을 가진 ptimeout(promise timeout) 함수를 새로 만듦
```javascript
function ptimeout(delay) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, delay);
    });
}
```
- 그 다음은 제너레이터 실행기 필요
- 제너레이터는 호출자와 통신할 수 있어 제너레이터와의 통신을 관리하고 비동기적 호출을 처리하는 함수를 만들 수 있음
```javascript
function grun(g) {
    const it = g();
    (function iterate(val) {
        const x = it.next(val);
        if(!x.done) {
            if(x.value instanceof Promise) {
                x.value.then(iterate).catch(err => it.throw(err));
            } else {
                setTimeout(iterate, 0, x.value);
            }
        }
    })();
}
```
- [카일 심슨이 제너레이터에 관해 쓴 글](http://davidwalsh.name/es6-generators)에 있는 runGenerator를 기초로 만듦
- `grun`은 기초적인 제너레이터 재귀 실행기
- `yield`로 값을 넘긴 제너레이터는 이터레이터에서 next를 호출할 때까지 기다립니다.
- `grun`은 그 과정을 재귀적으로 반복
- `nfcall`은 과거의 방법인 노드 오류 우선 콜백을 프라미스에 적응시키고, `grun`은 미래의 기능을 현재로 가져옴
```javascript
function* theFutureIsNow() {
    const dataA = yield nfcall(fs.readFile, 'a.txt');
    const dataB = yield nfcall(fs.readFile, 'b.txt');
    const dataC = yield nfcall(fs.readFile, 'c.txt');
    yield ptimeout(60*1000);
    yield nfcall(fs.writeFile, 'd.txt', dataA+dataB+dataC);
}
```
- 콜백 헬보다는 낫고, 프라미스 하나만 쓸 때보다 더 단순
- 실행 또한 간단함
```javascript
grun(theFutureIsNow):
```

#### 1보 전진과 2보 후퇴?
- 세 개의 파일을 동시에 읽으면 더 효율적이지 않나?
- `Promise`에는 `all`메서드가 있음
- 이 메서드는 배열로 받은 프라미스가 모두 완료될 때 완료되며 가능하다면 비동기적 코드를 동시에 실행
```javascript
function* theFutureIsNow() {
    const data = yield Promise.all([
        nfcall(fs.readFile, 'a.txt'),
        nfcall(fs.readFile, 'b.txt'),
        nfcall(fs.readFile, 'c.txt'),
    ]);
    yield ptimeout(60*1000);
    yield nfcall(fs.writeFile, 'd.txt', data[0]+data[1]+data[2]);
}
```
- `Promise.all`이 반환하는 프라미스에는 매개변수로 주어진 각 프라미스의 완료 값이 배열에 들어있던 순서대로 있음
- `c.txt`를 `a.txt`보다 먼저 읽더라도 data[0]에는 `a.txt`의 내용이 있음
- `Promise.all`도 중요하지만 이 섹션에서 가장 중요한 것은 프로그램에서 어떤 부분을 동시에 실행할 수 있고 없는 지를 판단하는 것
- 세 파일을 읽은 다음 60초를 기다리고 그 다음에 병합 결과를 파일에 저장하는 것이 중요하다면 예제와 같이 하면 됨
- 세 파일을 읽는 것과 무관하게 60초 이상이 흐른 다음 네번째 파일에 결과를 저장하는 것이 중요하다면 타임아웃을 `Promise.all`에 옮기는 편이 좋음

#### 제너레이터 실행기를 직접 만들지 마세요
- [co](https://github.com/tj/co)는 기능이 풍부하고 잘 만들어진 제너레이터 실행기
- 웹 사이트를 만들고 있다면 [Koa 미들웨어](http://koajs.com/)를 살펴보길 권함
- `Koa`는 `co`와 함께 사용하도록 설계된 미들웨어

#### 제너레이터 실행기와 예외 처리
- 제너레이터 실행기를 쓰면 `try/catch`를 써서 예외 처리를 할 수 있다는 것도 중요한 장점
- 콜백이나 프라미스를 사용하면 예외 처리가 쉽지 않음
- 콜백에서 일으킨 예외는 그 콜백 밖에서 캐치할 수 없음
- 제너레이터 실행기는 비동기적으로 실행하면서 동기적인 동작 방식을 유지하므로 `try/catch`와 함께 사용가능
```javascript
function* theFutureIsNow() {
    let data;
    try {
        data = yield Promise.all([
            nfcall(fs.readFile, 'a.txt'),
            nfcall(fs.readFile, 'b.txt'),
            nfcall(fs.readFile, 'c.txt'),
        ]);
    } catch(err) {
        console.error("Unable to read one or more input files: " + err.message);
        throw err;
    }
    yield ptimeout(60*1000);
    try { 
        yield nfcall(fs.writeFile, 'd.txt', data[0]+data[1]+data[2]);
    } catch(err) {
        console.error("Unable to write output file: " + err.message);
        throw err;
    }
}
```
- `try/catch`를 통한 예외 처리가 프라미스의 catch 핸들러나 오류 우선 콜백보다 낫다고 하는 건 아님
- `try/catch`도 널리 사용되는 구조이니, 동기적인 처리가 더 익숙하다면 예외처리에 `try/catch`를 사용하는 것도 좋음

## 요약
- 자바스크립트의 비동기적 실행은 콜백을 통해 이루어짐
- 프라미스를 콜백 대신 사용할 수 있는 것은 아님. 프라미스도 콜백을 사용함
- 프라미스는 콜백이 여러번 호출되는 문제를 해결
- 콜백을 여러 번 호출해야 한다면 이벤트와 결합하는 방법을 생각할 수 있음(프라미스도 함께 쓸 수 있음)
- 프라미스는 반드시 결정된다는(성공 또는 실패) 보장은 없음. 프라미스에 타임아웃을 걸면 이 문제가 해결
- 프라미스는 체인으로 연결할 수 있음
- 프라미스와 제너레이터 실행기를 결합하면 비동기적 실행의 장점을 그대로 유지하면서도 동기적인 사고방식으로 문제를 해결할 수 있음
- 제너레이터를 써서 동기적인 사고방식으로 문제를 해결할 때는 프로그램의 어느 부분을 동시에 실행할 수 있는지 파악해야 함. 동시에 실행할 수 있는 부분은 `Promise.all`을 써서 실행
- 제너레이터 실행기를 직접 만드는 고생말고, `co`나 `Koa`를 사용
- 노드 스타일 콜백을 프라미스를 바꾸는 고생도 필요 없음. `Q` 사용
- 제너레이터 실행기를 쓰면 예외 처리도 익숙한 방식으로 할 수 있음


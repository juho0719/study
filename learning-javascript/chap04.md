# 제어문

## 제어문의 기초
- 크라운 앤 앵커 게임 예제
- 여섯 개의 사각형(크라운, 앵커, 하트, 클럽, 스페이드, 다이아몬드)에 마음대로 돈을 걸고, 주사위를 굴려 사각형의 숫자와 일치하면 해당 사각형에 건 돈만큼 따게 되는 게임 (주사위 총 3번)
- 목표: 50펜스로 시작, 100펜스를 따던가 50펜스를 잃던가

#### while 루프
- 첫 번째 조건인 자금이 1보다 크고 100보다 작으면 계속 수행
```javascript
let funds = 50;     // 시작 금액

while(funds > 1 && funds < 100) {
    // 돈을 건다

    // 주사위를 굴린다

    // 그림을 맞추면 돈을 가져온다.
}
```

#### 블록 문
- 블록은 엄밀히 말해 제어문이 아니지만, 같이 쓰임
- 블록 문은 문 여러개를 중괄호로 묶은 것이며 자바스크립트는 이들을 하나의 단위로 취급
```javascript
{   // 블록문 시작
    console.log("statement 1");
    console.log("statement 2");
}   // 블록문 끝

console.log("statement 3");
```

#### 공백
- 자바스크립트는 줄바꿈 문자를 포함해 추가 공백을 신경쓰지 않음
- 스페이스 1개나 10개나 마찬가지
- 가독성을 위해 적당한 공백이 필요

#### 보조 함수
- 여기서는 난수 발생시키는 함수와 여섯가지 도형 중 무작위 하나를 반환하는 함수가 필요
```javascript
// m이상 n이하의 무작위 정수를 반환
function rand(m, n) {
    return m + Math.floor((n - m + 1)*Math.random());
}

// 크라운 앤 앵커 게임의 여섯 가지 도형 중 하나를 무작위 반환
function randFace() {
    return ["crown", "anchor", "heart", "spade", "club", "diamond"][rand(0, 5)];
}
```

#### if ... else문
- 돈이 주머니에 있다는 가정하에 손을 넣고 잡히는 대로 돈을 꺼내는 규칙 추가
- 숫자 7은 행운의 상징이라고 믿어, 우연히 7펜스가 나오면 주머니 있는 돈을 모두 털어 하트에 거는 규칙 추가
```javascript
const bets = { crown: 0, anchor: 0, heart: 0, spade: 0, club: 0, diamond: 0 };
let totalBet = rand(1, funds);
if(totalBet === 7) {
    totalBat = funds;
    bets.heart = totalBet;
} else {
    // 그 판에 걸 돈을 분배
}
funds = funds - totalBet;
```

#### do ... while문
- 7펜스를 꺼내지 않았다면 무작위 도형에 돈을 검
- 돈을 한 개를 걸때도, 전부를 걸때도 있고 같은 사각형에 여러 번 걸 때도 있음
```javascript
let remaining = totalBat;
do {
    let bet = rand(1, remaining);
    let face = randFace();
    bets[face] = bets[face] + bet;
    remaining = remaining - bet;
} while(remaining > 0);
```

#### for 루프
- for 루프가 가장 잘 어울리는 경우는 어떤 일을 정해진 숫자만큼 반복하려 할 때, 특히 그 일을 지금 몇 번재 하는지 알아야 할 때임
- 주사위를 정해진 숫자만큼 굴리는 작업(3번)에는 for 루프가 알맞음
```javascript
const hand = [];
for(let roll = 0; roll < 3; roll++) {
    hand.push(randFace());
}
```

#### if문
- 이제 남은 일은 딴돈을 가져오는 것
```javascript
let winings = 0;
for(let die=0; die < hand.length; die++) {
    let face = hand[die];
    if(bets[face] > 0) winnings = winnings + bets[face];
}
funds = funds + winnings;
```

### 하나로 합치기
```javascript
// m 이상 n 이하의 무작위 정수 반환
function rand(m, n) {
    return m + Math.floor((n - m + 1)*Math.random());
}

// 크라운 앤 앵커 게임의 여섯 그림 중 하나에 해당하는 문자열을 무작위 반환
function randFace() {
    return ["crown", "anchor", "heart", "spade", "club", "diamond"][rand(0, 5)];
}

let funds = 50;     // 시작 조건
let round = 0;

while(funds > 1 && funds < 100) {
    round++;
    console.log(`round ${round}:`);
    console.log(`\tstarting funds: ${funds}p`);
    
    // 돈을 건다
    let bets = { crown: 0, anchor: 0, heart: 0, spade: 0, club: 0, diamond: 0 };
    let totalBet = rand(1, funds);
    if(totalBet === 7) {
        totalBat = funds;
        bets.heart = totalBet;
    } else {
        // 판돈을 나눔
        let remaining = totalBet;
        do {
            let bet = rand(1, remaining);
            let face = randFace();
            bets[face] = bets[face] + bet;
            remaining = remaining - bet;
        } while(remaining > 0)
    }
    funds = funds - totalBet;
    console.log('\tbets: ' + 
        Object.keys(bets).map(face => `${face}: ${bets[face]} pence`).join(', ') + 
        `(total: ${totalBet} pence)`);

    // 주사위를 굴림
    const hand = [];
    for(let roll=0; roll<3; roll++) {
        hand.push(randface());
    }
    console.log(`\thand: ${hand.join(', ')}`);

    // 딴 돈을 가져온다.
    let winnings = 0;
    for(let die=0; die < hand.length; die++) {
        let face = hand[die];
        if(bets[face] > 0) winnings = winnings + bets[face];
    }
    funds = funds + winnings;
    console.log(`\twinnings: ${winnings}`);
}
console.log(`\tending funds: ${funds}`);
```

## 자바스크립트의 제어문
- 크게 조건문과 반복문으로 나뉨
- 조건문은 if...else문, switch문, 반복문은 while문, do...while문, for문

#### 제어문의 예외
- break : 루프 중간에 빠져나감
- continue : 루프에서 다음 단계로 바로 건너뜀
- return : 제어문을 무시하고 현재 함수에서 빠져나감
- throw : 예외를 일으킴

#### if...else문을 체인으로 연결하기
- if...else문을 여러개 연결 시키는 걸 의미
```javascript
if(new Date().getDay() === 3) {
    totalBet = 1;
} else if(funds === 7) {
    totalBet = funds;
} else {
    console.log("No superstition here!");
}
```

#### 메타 문법
- 다른 문법을 설명하는 문법
- `배커스-나우르 표기법 확장(EBNF, Extended Backus-Naur Form)`
- 대괄호로 감싼 것은 옵션, 생략 부호(...)는 '여기에 들어갈 내용이 더 있다' 라는 뜻
- 단어는 플레이스홀더로 사용

while문
```
while(condition)
    statement
```

if...else문
```
if(condition)
    statement1
[else
    statement2]
```

do...while문
```
do
    statement
while(condition);
```

for문
```
for([initialization]; [condition]; [final-expression])
    statement
```

#### for 루프의 다른 패턴
- 쉼표 연산자를 쓰면 초기화와 마지막 표현식에 여러 문을 결합할 수 있음
```javascript
// 초기화 하면서 temp, i, j를 동시 선언, 마지막 표현식에서 세 변수를 동시 조작
for(let temp, i=0, j=1; j<30; temp = i, i = j, j = i + temp)
    console.log(j);
```
- for 루프의 제어부에 아무것도 쓰지 않으면 무한 루프
```javascript
for(;;) console.log("I will repeat forever!");
```
- for 루프는 보통 정수 인덱스를 사용하지만, 꼭 그래야 하는 것은 아님
```javascript
let s = '3';                        // 숫자가 들어가는 문자열
for(; s.length<10; s = ' ' + s);    // 문자열의 길이가 조건
                                    // for 루프 마지막에 세미콜론이 없으면 에러
for(let x=0.2; x<3.0; x+=0.2) {     // 제어 변수가 정수가 아니어도 OK
    console.log(x);
for(; !player.isBroke;)             // 조건에 객체 프로퍼티
    console.log("Still playing!");    
}
```

#### switch 문
- 조건 하나로 여러가지 중 하나를 선택할 때 유용
```
switch(expression) {
    case value1:
        // expression을 평가한 결과가 value1일 때 실행
        [break;]
    case value2:
        // expression을 평가한 결과가 value2일 때 실행
        [break;]
    ...
    case valueN:
        // expression을 평가한 결과가 valueN일 때 실행
        [break;]
    default:
        expression을 평가한 결과에 맞는 것이 없을 때 실행
        [break;]
}
```
- return문은 즉시 함수를 빠져나가므로 break 사용 불가
```javascript
function adjustBet(totalBet, funds) {
    switch(totalBet) {
        case 7:
            return funds;
        case 13:
            return 0;
        default:
            return totalBet;
    }
}
```

#### for...in 루프
- 객체의 프로퍼티에 루프를 실행하도록 설계
```
for(variable in object)
    statement
```
```javascript
const player = { name: 'Tomas', rank: 'Midshipman', age: 25};
for(let prop in player) {
    if(!player.hasOwnProperty(prop)) continue;
    console.log(prop + ': ' + player[prop]);
}
```

#### for...of 루프
- ES6에 새로 생김.
- 컬렉션의 요소에 루프를 실행하는 다른 방법
```
for(variable of object)
    statement
```
```javascript
const hand = [randFace(), randFace(), randFace()];
for(let face of hand)
    console.log(`You rolled...${face}!`);
```
- 배열에 루프를 실행해야 하지만 각 요소의 인덱스를 알 필요는 없을 때 알맞음

## 유용한 제어문 패턴

#### continue 문을 사용하여 조건 중첩 줄이기
- 반복문안에 조건문을 써야 하는 경우
```javascript
while(funds > 1 && funds < 100) {
    let totalBet = rand(1, funds);
    if(totalBet === 13) {
        console.log("Unlucky! Skip this round...");
    } else {
        // 플레이
    }
}
```
- 이런 경우를 `제어문 중첩(nested contorl flow)`이라 부름
- continue문을 써서 이 구조를 더 간결하게
```javascript
while(funds > 1 && funds < 100) {
    let totalBet = rand(1, funds);
    if(totalBet === 13) {
        console.log("Unlucky! Skip this round...");
        continue;
    } 
    // 플레이...
}
```

#### break나 return문을 써서 불필요한 연산 줄이기
```javascript
let firstPrime = null;
for(let n of bigArrayOfNumbers) {
    firstPrime = n;
    break;
}
```
- 이 루프가 함수 안에 있었다면 break대신 return문 써도 됨

#### 루프를 완료한 뒤 인덱스 값 사용하기
- break문을 사용하여 루프를 일찍 종료 했을 때에도 인덱스 값은 남아 있음
- 이 패턴을 써서 break걸린 항목의 인덱스를 알 수 있음

#### 배열을 수정할 때 감소하는 인덱스 사용하기
- 인덱스는 커지는 데 요소를 제거하는 로직에서는 누락될 염려가 있음
- 그럴 때 for문에서 감소하는 인덱스로 구현하면 괜찮음

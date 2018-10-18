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




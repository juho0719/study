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


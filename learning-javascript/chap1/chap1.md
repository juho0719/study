# 첫 번째 애플리케이션

## 사용할 프로그램
- 브라우저 : 파이어폭스
- 텍스트 에디터 사용 권장
  : 문법 하이라이트, 괄호 맞추기, 코드 접기, 자동 완성 등

## 주석에 관해
코드의 의미를 설명. 나 외에 사람들이 알아 보기 쉽도록..
종류는 //, /* */ 가 있음

## 시작하기
- HTML, CSS, JS 3개를 만듦
- 이번 장은 ES5기준으로 작성하되, 이후 장에서는 ES6기준으로 작성됨
---
1. main.js 생성
```javascript
console.log('main.js loaded');
```

2. main.css 생성
```css
/* 추후 추가 예정 */
```

3. index.html 생성
```html
<html>
    <head>
        <link rel="stylesheet" href="css/main.css">
    </head>
    <body>
        <h1>My first application</h1>
        <p>Welcome to <i>Learning Javascript, 3rd Edition</i>.</p>
        <script src="js/main.js"></script>
    </body>
</html>
```
---

## 자바 스크립트 콘솔
- 프로그램을 진단할 때 사용하는 텍스트 전용 도구
- 브라우저마다 단축키가 다름
    - 파이어폭스(윈도우/리눅스) : Ctrl + Shift + K
    - 파이어폭스(맥) : Command + Option + K
- 위 index.html 불러온 페이지에서 자바스크립트 콘솔을 열면 해당 로그가 보여야함

## 제이쿼리
- 많이 사용하는 스크립트 라이브러리
- CDN을 통해 가져오는 방법 (인터넷에 연결되어 있어야 함)
```html
<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
```
- main.js 수정
```javascript
$(document).ready(function() {
    'use strict';
    console.log('main.js loaded');
});
```
- `'use strict'`는 코드를 엄격하게 처리하라는 뜻 (문법 엄격하게 체크)) 

## 단순한 그래픽 그리기
- HTML5 캔버스를 사용해 단순한 도형 그리기
- 여기서는 Paper.js(http://paperjs.org) 사용
- 다음행을 `<Body>`에 추가
```html
<canvas id="mainCanvas"></canvas>
```
- 모든 HTML 요소에 id 부여 가능. 너무 남발하지 말고, 적절히 사용해야 함.
- main.css 수정
```css
#mainCanvas {
    width: 400px;
    height: 400px;
    border: solid 1px black;
}
```
- Paper.js를 링크. jquery 링크 다음에 위치
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.9.25/paper-full.min.js"></script>
```
- Paper.js 설정 작업 필요. 이처럼 어떤 일을 하기 전에 항상 먼저 실행해야 하는 코드를 보통 `템플릿`, 또는 `보일러플레이트`라고 부름
- main.js의 `'use strict'` 다음에 추가
```javascript
paper.install(window);
paper.setup(document.getElementById('mainCanvas'));

// TO-DO

paper.view.draw();
```
- 캔버스 중앙에 녹색 원을 그림 (TO-DO주석을 다음 행으로 교체)
```javascript
var c = Shape.Circle(200, 200, 50);     //x좌표, y좌표, 반지름
c.fillColor = 'green';
```

## 반복적인 작업 자동화하기
- 캔버스 전체에 바둑판 모양으로 채움. main.js 수정
```javascript
var c;
for(var x=25; x<400; x+=50) {
    for(var y=25; y<400; y+=50) {
        c = Shape.Circle(x, y, 20);
        c.fillColor = 'green';
    }
}
```

## 사용자 입력 처리하기
- Paper.js는 Tool객체를 통해 사용자 입력을 처리. main.js에서 원 그리는 코드를 다음 코드로 교체
```javascript
var tool = new Tool();
tool.onMouseDown = function(event) {
    var c = Shape.Circle(event.point.x, event.point.y, 20);
    c.fillColor = 'green';    
};
```
- Tool객체에 onMouseDown 이벤트 핸들러를 연결하여 클릭 할때마다 원이 생기도록 작성함

## Hello, World
- onMouseDown 핸들러 앞에 다음 코드를 추가
```javascript
var c = Shape.Circle(200, 200, 80);
c.fillColor = 'black';
var text = new PointText(200, 200);
text.justification = 'center';
text.fillColor = 'white';
text.fontSize = 20;
text.content = 'hello world';
```
- 텍스트 배경으로 쓸 원을 만들고, 텍스트 객체가 캔버스 중앙에 위치하고, 텍스트로 `hello world`를 지정

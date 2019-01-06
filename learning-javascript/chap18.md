# 브라우저의 자바스크립트 
- 원래 브라우저 스크립트 언어로 시작했고, 현재 거의 독점하고 있음
- 브라우저에서 자바스크립트를 사용할 때 특별히 알아야 할 사항과 API가 있음 

## ES5와 ES6
- 서버에서는 ES6기능 중 무엇이 지원되는지 확실히 알 수 있고, 자바스크립트 엔진을 선택할 수도 있지만 웹은 아님 
- 웹은 자바스크립트 엔진을 선택하는 것이 불가능하고 어떤 브라우저인지 알 수 있는 정보도 없음 
- 에버그린 브라우저는 자동으로 사용자의 의사를 묻지 안혹 업데이트하는 방법으로 새 웹 표준을 더 빨리 적용
- 하지만 이것도 문제를 줄이는 것이지 해결하는 것은 아님 
- 사용자의 환경을 컨트롤하지 않는 한 당분간은 ES5를 사용해야 함 
- 트랜스컴파일을 통해 ES6를 ES5로 바꾸면 ES6를 사용할 수도 있음 

## 문서 객체 모델 
- DOM(문서객체모델)은 HTML문서의 구조를 나타내는 표기법인 동시에 브라우저가 HTML문서를 조작하는 핵심이기도 함 
- DOM은 트리구조로 표현 
- DOM트리는 노드(node)로 구성 
- 루트 노드를 제외하면 모든 노드에 부모가 있으며 자식 노드는 있어도 되고 없어도 됨 
- 루트 노드는 문서(document)이며 자식 노드는 `<html>`요소 하나 뿐
- `<html>`요소에는 자식으로 `<head>`와 `<body>` 요소가 있음 
- DOM트리의 모든 노드는 Node클래스의 인스턴스 
- Node객체에는 트리 구조를 나타내는 parentNode와 childNodes 프로퍼티, 자신에 대한 프로퍼티인 nodeName과 nodeType 프로퍼티가 있음 
- `simple.html`
```html
<!doctype html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>Simple HTML</title>
        <style>
            .callout {
                border: solid 1px #ff0080;
                margin: 2px 4px;
                padding: 2px 6px;
            }
            .code {
                background: #ccc;
                margin: 1px 2px;
                padding: 1px 4px;
                font-family: monospace;
            }
        </style>
    </head>
    <body>
    <header>
        <h1>Simple HTML</h1>
    </header>
    <div id="content">
        <p>This is a <i>simple</i> HTML file.</p>
        <div class="callout">
            <p>This is as fancy as we'll get!</p>
        </div>
        <p>IDs (such as <span class="code">#content</span>) are unique (there can only be one per page).</p>
        <p>Classes (such as <span class="code">.callout</span>) can be used on many elements.</p>
        </p>
        <div id="callout2" class="callout fancy">
            <p>A single HTML element can have multiple classes. </p>
        </div>
    </div>
    </body>
</html>
```
- 모든 노드에는 `nodeType`, `nodeName`프로퍼티가 있음
- `nodeType`은 그 노드가 어떤 타입인지 나타내는 정수
- 이 장에서는 HTML요소인 `Node.ELEMENT_NODE`(nodeType 1)과 보통 HTML 요소의 텍스트 컨텐츠로 쓰이는 `Node.TEXT_NODE`(nodeType 3)를 주로 설명함
- `document`에서 시작해 DOM 전체를 순회(traverse)하면서 콘솔에 출력하는 함수 예제
```javascript
function printDOM(node, prefix) {
    console.log(prefix + node.nodeName);
    for(let i=0; i<node.childNodes.length; i++) {
        printDOM(node.childNodes[i], prefix + '\t');
    }
}
printDOM(document, '');
```
- 깊이 우선(depth-first), 전위 순회(pre-order traversal)라고 부르는 방법을 사용해 트리를 순회
- DOM API에서 제공하는 TreeWalker객체를 활용하면 DOM 요소 전체를 순회할 수 있고, 원하는 타입의 요소만 핉터링 할 수도 있음. [document.createTreeWalker](https://developer.mozilla.org/en-US/docs/Web/API/Document/createTreeWalker)

## 용어 사용
- 트리는 단순하고 직관적인 개념이며, 용어 역시 직관적임
- 부모 노드는 직접적인 부모, 즉 바로 윗 단계를 말함. 자식 노드 마찬가지

## get 메서드
- DOM에서 원하는 HTML요소를 빨리 찾을 수 있는 메서드는 `document.getElementById`임 
- 모든 HTML요소는 고유한 ID를 할당 받을 수 있고, `document.getElementById`를 통해 요소를 찾음
- `document.getElementsByClassName`은 주어진 클래스 이름에 해당하는 요소를 반환 
```javascript
const callouts = document.getElementsByClassName('callout');
```
- `document.getElementsByTagName`은 주어진 태그 이름에 해당하는 요소들을 반환
```javascript
const paragraphs = document.getElementsByTagName('p');
```
- DOM 객체가 반환하는 컬렉션은 자바스크립트 배열이 아니라 HTMLCollection의 인스턴스로 배열과 비슷한 객체
- 이 컬렉션에 for루프를 사용할 수는 있지만 map, filter, reduce 같은 Array.prototype메서드는 사용할 수 없음 
- 확산 연산자를 써서 HTMLCollection을 배열로 바꿀 수 있음 

## DOM 요소 쿼리
- 앞서 본 get메서드도 유용하지만 ID나 클래스, 태그 이름같은 한가지 조건이 아니라 다른 요소와의 관계를 사용해 원하는 요소를 찾는 메서드가 있음 
- `querySelector`와 `querySelectorAll`은 CSS선택자를 사용해 요소를 찾는 메서드
- CSS 선택자는 `<p>`, `<div>`같은 요소 이름, ID, 클래스, 클래스의 조합, 요소 이름과 클래스의 조합등 다양한 방식으로 요소를 찾음 
- CSS 선택자에서 요소 이름을 사용할 때는 꺽쇠(<>)없이 요소 이름만 씀
- 클래스로 요소를 찾을 때는 클래스 이름 앞에 점을 찍음
- 클래스를 여러개 사용할 때는 찾으려는 클래스 앞에 모드 점을 찍음
- 이를 조합할 수도 있음
- `a#callout2.callout.fancy`는 ID가 callout2인 동시에 callout과 fancy클래스가 모두 있는 `<a>`요소를 찾음 
- `document.querySelectorAll('.callout')`을 실행하면 해당 페이지에서 callout클래스를 가진 요소를 모두 찾음
- 위치를 기준으로 요소를 찾을 수도 있음 
- 요소 선택자 사이에 스페이스를 넣으면 특정 노드의 자손인 요소를 찾는다는 의미
- 요소 선택자 사이에 `>`기호를 넣으면 자손이 아니라 자식만 선택
- 자식 : 부모 안에 있는 자식 요소에만 영향
- 자손 : 부모 안에 있는 모든 자손에 영향 (자식, 손자등)

## DOM 요소 조작
- 모든 요소에는 `textContent`와 `innerHTML` 프로퍼티가 있음 
- `textContent`는 HTML태그를 모두 제거하고 순수한 텍스트 데이터만 제공하며, `innerHTML`은 HTML태그를 그대로 제공 
- `innerHTML`을 통해 HTML태그를 수정하면 DOM이 그에 맞게 변경됨 
```javascript
const para1 = document.getElementsByTagName('p')[0];
para1.textContent;      // "This is a simple HTML file."
para1.innerHTML;        // "This is a simple HTML file."
para1.textContent = "Modified HTML file";
para1.innerHTML = "Modified HTML file";
```
- `textContent`나 `innerHTML`를 조작하는 것은 파괴적인 작업 
- 이 프로퍼티들을 수정하면 원래 컨텐츠는 전부 사라지니 주의 필요 

## 새 DOM 요소 만들기 
- `document.createElement`를 통해 새 노드를 만들 수 있음 
- 이 함수는 새 노드를 만들지만 DOM에 추가하지는 않음
```javascript
const p1 = document.createElement('p');
const p2 = document.createElement('p');
p1.textContent = "I was created dynamically!";
p2.textContent = "I was also created dynamically!";
```
- 새로 만든 요소를 DOM에 추가할 때는 `insertBefore`와 `appendChild`를 사용 
```javascript
const parent = document.getElementById('content');
const firstChild = parent.childNodes[0];
parent.insertBefore(p1, firstChild);
parent.appendChild(p2);
```
- `insertBefore`는 매개변수를 두 개 받음. 첫 번째 매개변수는 삽입할 요소이고, 두 번째 매개변수는 삽입할 위치를 정하는 요소
- `appendChild`는 항상 마지막 자식 요소로 추가 

## 요소 스타일링
- 요소의 스타일을 바꾸고 싶으면 CSS 클래스를 이용 
- `unique`란 단어가 들어있는 문단을 모두 하이라이트로 만드는 예제 
```css
.highlight {
    background: #ff0;
    font-style: italic;
}
```
- `<p>`태그를 모두 찾은 다음 `unique`가 들어있다면 highlight 클래스를 추가
- 모든 요소에는 클래스를 나열하는 `classList` 프로퍼티가 있음 
- `classList`의 `add`메서드로 클래스를 추가할 수 있음 
- `highlightParas`함수를 만드는 예제 
```javascript
function highlightParas(containing) {
    if(typeof containing === 'string')
        containing = new RegExp(`\\b${containing}\\b`, 'i');
    const paras = document.getElementsByTagName('p');
    console.log(paras);
    for(let p of paras) {
        if(!containing.test(p.textContent)) continue;
        p.classList.add('highlight');
    }
}
highlightParas('unique');
```
- 클래스를 제거할 때는 `classList.remove`를 사용 
```javascript
function removeParaHighlights() {
    const paras = document.querySelectorAll('p.highlight');
    for(let p of paras) {
        p.classList.remove('highlight');
    }
}
```

## 데이터 속성 
- HTML5에서는 데이터(data-)속성을 도입 
- 이 속성으로 HTML요소에 임의의 데이터를 추가할 수 있음 
- 브라우저는 이 데이터를 완전히 무시하므로 자바스크립트에서 쉽게 요소에 관한 정보를 읽거나 수정할 수 있음
- HTML을 수정해서 버튼 두 개를 추가
```html
<button data-action="highlight" data-containing="unique">
    Highlight paragraphs containing "unique"
</button>
<button data-action="removeHighlights">
    Remove highlights
</button>
```
- 데이터 속성의 이름은 무엇이든 상관없음
- `document.querySelectorAll`을 사용해 `action`데이터 속성에 "highlight"가 들어있는 요소를 모두 찾을 수 있음 
```javascript
const highlightActions = document.querySelectorAll('[data-action="highlight"]');
```
- 대괄호 문법을 쓰면 어떤 속성으로든 찾을 수 있음 
- 버튼이 하나만 있으므로 `querySelector`를 사용해도 됨 
- `highlightActions`의 요소를 보면 `dataset`프로퍼티가 있는걸 알 수 있음 
```javascript
highlightActions[0].dataset;
// DOMStringMap { containing: "unique", action: "highlight" }
```
- DOM API는 데이터 속성의 값을 문자열 형태로 저장하므로 객체 데이터는 저장할 수 없음
- 제이쿼리에서는 데이터 속성의 기능을 확장하는 인터페이스를 만들어서 객체도 데이터 속성에 저장할 수 있게 만들었음 (19장 참조)
- 자바스크립트에서 데이터 속성을 수정하거나 추가하는 것도 가능
```javascript
highlightActions[0].dataset.containing = "giraffe";
highlightActions[0].dataset.caseSensitive = "true";
```

## 이벤트
- 꼭 알아야 하는 이벤트만 정리
- `click`이벤트를 통해 하이라이트 버튼과  `highlightParas`함수를 연결 
```javascript
const highlightActions = document.querySelectorAll('[data-action="highlight"]');
for(let a of highlightActions) {
    a.addEventListener('click', evt => {
        evt.preventDefault();
        highlightParas(a.dataset.containing);
    });
}

const removeHighlightActions = document.querySelectorAll('[data-aciton="removeHighlihgts"]');
for(let a of removeHighlightActions) {
    a.addEventListener('click', evt => {
        evt.preventDefault();
        removeParaHighlights();
    });
}
```
- 모든 요소에는 `addEventListener`라는 메소드가 있음 
- 이 메소드를 통해 이벤트가 일어났을 때 호출할 함수를 지정할 수 있음 
- 호출할 함수는 `Event`타입의 객체 하나만 매개변수로 받음 
- 이벤트 객체에는 해당 이벤트에 관한 정보가 모두 포함(clientX, clientY, target등)
- 이벤트 모델은 이벤트 하나에 여러가지 함수(핸들러)를 연결할 수 있도록 설계
- 기본 핸들러가 지정된 이벤트도 많아 기본 핸들러 동작을 막고 다른 동작으로 변경할 수 있음 
- 예를 들어 `<a>`태그에서 클릭이벤트는 링크호출을 하게 되어 있는데 이를 막고(preventDefault()) 다른 동작을 하게 할 수 있음 

#### 이벤트 버블링과 캡처링
- HTML은 계층적이기 때문에 이벤트를 한 곳에서만 처리해야 하는 것은 아님
- 버튼이벤트 처리시 해당 버튼의 부모나 부모의 부모에서 처리해도 됨 
- 여러 요소에서 이벤트 처리할 수 있다면 그 이벤트에 응답하는 기회는 어떤 순서로 주어지는가?
- 확인 방법 첫 번째로 가장 먼 조상부터 시작하는 방법인 캡처링이 있음 
- HTML에서 버튼은 `<div id="content">`에 들어있고 `<div id="content">`는 `<body>`에 들어있다고 하면 `<body>`도 버튼에서 일어난 이벤트를 `캡처`할 수 있음 
- 다른 방법은 이벤트가 일어난 요소에서 거슬로 올라가는 방법인 버블링이 있음 
- HTML5 이벤트 모델에서는 두 방법을 모두 지원하기 위해 먼저 해당 요소의 가장 먼 조상에서 시작해 해당 요소까지 내려온 다음, 다시 해당 요소에서 시작해 가장 먼 조상까지 거슬러 올라가는 방법을 택함 
- 이벤트 핸들러에는 다른 핸들러가 어떻게 호출될지 영향을 주는 세 가지 방법이 있음 
- 첫 번째는 가장 많이 쓰이느 `preventDefault`. 이벤트를 취소함.
- 두 번째는 `stopPropagation`. 이벤트를 현재 요소에서 끝내고 더이상 전달되지 않게 막음 
- 즉, 해당 요소에 연결된 이벤트 핸들러는 동작하지만 다른 요소에 연결된 이벤트 핸들러는 동작하지 않음 
- 세 번째는 `stopImmediatePropagation` 다른 이벤트 핸들러, 심지어 현재 요소에 연결된 이벤트 핸들러도 동작하지 않게 막음 
```html
<!doctype html>
<html>
    <head>
        <title>Event Propagation</title>
        <meta charset="utf-8">
    </head>
    <body>
        <div>
            <button>Click Me!</button>
        </div>
        <script>
            // 이벤트 핸들러를 만들어 반환 
            function logEvent(handlerName, type, cancel, stop, stopImmediate) {
                // 실제 이벤트 핸들러 
                return function(evt) {
                    if(cancel) evt.preventDefault();
                    if(stop) evt.stopPropagation();
                    if(stopImmediate) evt.stopImmediatePropagation();
                    console.log(`${type}: ${handlerName}` +
                        (evt.defaultPrevented ? '(canceled)' : ''));
                }
            }
            // 이벤트 핸들러를 요소에 추가 
            function addEventLogger(elt, type, action) {
                const capture = type === 'capture';
                elt.addEventListener('click', 
                    logEvent(elt.tagName, type, action === 'cancel', action === 'stop', action === 'stop!'), capture);
            }
            const body = document.querySelector('body');
            const div = document.querySelector('div');
            const button = document.querySelector('button');
            addEventLogger(body, 'capture');
            addEventLogger(body, 'bubble');
            addEventLogger(div, 'capture');
            addEventLogger(div, 'bubble');
            addEventLogger(button, 'capture');
            addEventLogger(button, 'bubble');
        </script>
    </body>
</html>
```
- 버튼을 클릭하면 다음과 같은 내용이 출력 
```
capture: BODY
capture: DIV
capture: BUTTON
bubble: BUTTON
bubble: DIV
bubble: BODY
```
- 캡처링이 먼저 시작되고 그 후에 버블링이 이어짐
- 버튼에서는 핸들러가 캡처링 다음 버블링이라는 일반적인 순서를 무시하고 추가된 순서대로 실행됨 
- 앞의 예제에서 버튼에 핸들러를 추가한 순서를 반대로 하면 콘솔에도 반대로 기록 됨 
- 이벤트를 취소하는 예제를 구현하기 위해 다음과 같이 수정 
```javascript
addEventLogger(body, 'capture');
addEventLogger(body, 'bubble');
addEventLogger(div, 'capture', 'cancel');
addEventLogger(div, 'bubble');
addEventLogger(button, 'capture');
addEventLogger(button, 'bubble');
```
- 이벤트 전달은 계속 되지만, 이벤트가 취소됐다고 기록
```
capture: BODY
capture: DIV (canceled)
capture: BUTTON (canceled)
bubble: BUTTON (canceled)
bubble: DIV (canceled)
bubble: BODY (canceled)
```
- 버튼의 캡처단계에서 이벤트 전달을 중지해보면 
```javascript
addEventLogger(body, 'capture');
addEventLogger(body, 'bubble');
addEventLogger(div, 'capture', 'cancel');
addEventLogger(div, 'bubble');
addEventLogger(button, 'capture', 'stop');
addEventLogger(button, 'bubble');
```
- 버튼 요소에서 이벤트 전달이 멈춤 
- 캡처링까지 진행하고 멈추게 했지만, 버튼의 버블링 이벤트는 여전히 발생 
- 하지만 `<div>`와 `<body>`요소는 이벤트 버블링을 받지 못함 
```
capture: BODY
capture: DIV (canceled)
capture: BUTTON (canceled)
bubble: BUTTON (canceled)
```
- 마지막으로 버튼의 캡처 단계에서 즉시 멈추게 변경 
```javascript
addEventLogger(body, 'capture');
addEventLogger(body, 'bubble');
addEventLogger(div, 'capture', 'cancel');
addEventLogger(div, 'bubble');
addEventLogger(button, 'capture', 'stop!');
addEventLogger(button, 'bubble');
```
- 버튼의 캡처 단계에서 이벤트 전달이 완전히 멈춤 
```
capture: BODY
capture: DIV (canceled)
capture: BUTTON (canceled)
```

- 참고사항
```
addEventLitener는 이벤트를 추가하는 구식 방법인 on프로퍼티를 대체할 목적으로 만들어 짐.
예전에는 elt에 클릭 핸들러를 추가할 때 elt.onclick = function(evt) { /* handler */ }같은 문법을 사용했는 데 이런 문법의 가장 큰 단점은 이벤트에 핸들러 하나만 등록할 수 있다는 점 
``` 
```
제이쿼리 이벤트 리스너에서 명시적으로 false를 반환하는 것은 stopPropagation을 호출하는 것과 동등한 효과가 있음. 단 이것은 제이쿼리의 단축 문법이며 DOM API에서는 동작하지 않음 
```

#### 이벤트 카테고리 

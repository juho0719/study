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
- 
# 제이쿼리
- DOM을 조작하거나 Ajax요청을 실행할 때 널리 쓰이는 라이브러리 
- 제이쿼리로 할 수 있는 일은 모두 DOM API로도 가능 
- 제이쿼리 장점 
    - 제이쿼리를 사용하면 브라우저 호환성을 걱정하지 않아도 됨 
    - 제이쿼리가 제공하는 Ajax API는 무척 단순한 편 
    - 제이쿼리는 내장된 DOM API를 더 유용하고 단순하게 바꾼 메소드 제공 
- DOM API와 브라우저 지원이 개선되면서 '원본' 자바스크립트의 성능과 순수함을 강조함 
- 브라우저가 개선되기는 했지만 아직 완전히 사라진 것은 아님 
- DOM API로 직접 구현하려면 시간이 많이 걸리는 기능들을 간편하게 제공하여 아직까지는 쓸만함 
- 제이쿼리의 기본은 익히는 것이 좋음 

## 맥가이버 나이프, 달러 기호
- 제이쿼리는 자바스크립트에서 달러 기호를 식별자로 쓸 수 있다는 장점을 활용한 첫 번째 라이브러리 
- 제이쿼리를 사용할 때는 jQuery나 $를 씀

## 제이쿼리 불러오기
- CDN
```html
<script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
```
- 참고사항 
```
제이쿼리는 2.x버전부터 ie8이하에 대한 지원을 중단함.
따라서 ie 구 버전을 지원하려면 1.x버전을 써야 함 
```

## DOM 기다리기
- 경험이 부족한 웹 개발자는 DOM을 구축하기도 전에 요소에 접근하려 하다가 에러를 겪는 일이 많음
- 제이쿼리에서는 브라우저가 페이지를 다 읽고 DOM을 구축한 다음에만 호출되는 콜백안에 코드를 작성하여 이런 문제를 피할 수 있음 
```javascript
$(document).ready(function() {
    // 여기 있는 코드는 HTML을 모두 불러오고 
    // DOM이 구성된 다음 실행됨
});
```
- 다음과 같은 단축 표기도 있음
```javascript
$(function() {
    // 여기 있는 코드는 HTML을 모두 불러오고 
    // DOM이 구성된 다음 실행됨
})
```

## 제이쿼리로 감싼 DOM 요소 
- 제이쿼리로 DOM을 조작할 때 가장 많이 쓰는 방법은 제이쿼리로 DOM 요소를 감싸는(wrap) 방법 
- 제이쿼리로 DOM을 조작할 때는 우선 DOM 요소 셋을 감싸는 제이쿼리 객체를 생성함
- 제이쿼리 함수($)로 DOM 요소 셋을 감싼 것을 제이쿼리 객체라 부름
- 제이쿼리 함수를 호출할 때는 주로 CSS선택자나 HTML을 사용 
- CSS 선택자로 제이쿼리를 호출하면 해당 선택자와 일치하는 제이쿼리 객체가 반환 
- `document.querySelectorAll`과 비슷 
- 모든 문단에 해당하는 제이쿼리 객체를 만들 때
```javascript
const $paras = $('p');
$paras.length;              // 문단의 수
typeof $paras;              // "object"
$paras instanceof $;        // true
$paras instanceof jQuery;   // true
```
- 요소의 `innerHTML`프로퍼티를 조작했을 때와 비슷한 결과가 나옴 
```javascript
const $newPara = $('<p>Newly created paragraph...</p>');
```
- 제이쿼리 객체를 가리키는 변수 이름을 달러 기호로 시작

## 요소 조작
- 매우 쉽게 컨텐츠를 추가하거나 제거할 수 있음 
- 제이쿼리에는 `text`와 `html`메서드가 있음 
- 각각 요소의 `textContent`, `innerHTML` 프로퍼티에 대응 
- 모든 문단의 텍스트를 똑같이 바꾸려면 다음과 같이 함 
```javascript
$('p').text('ALL PARAGRAPHS REPLACED');
```
- `html` 메서드를 사용하면 DOM을 수정할 수 있음
```javascript
$('p').html('<i>ALL</i> PARAGRAPHS REPLACED');
```
- 위와 같이 제이쿼리는 여러 요소를 동시에 수정 가능. DOM API로 같은 일을 하려면 `document.querySelectorAll()`이 반환하는 컬렉션을 순회하면서 작업해야 함 
- 세 번째 문단 하나만 바꾸려면? 제이쿼리의 `eq`메서드를 써서 요소 하나만 들어있는 새 제이쿼리 객체를 만들면 됨 
```javascript
$('p')          // 모든 문단에 일치
    .eq(2)      // 세 번째 문단(인덱스는 0부터 시작)
    .html('<i>THIRD</i> PARAGRAPH REPLACED');
```
- 요소를 제거할 때는 `remove`호출
```javascript
$('p').remove();
```
- 제이쿼리를 사용할 때 중요한 개념 중에 하나는 체인(chain)임 
- 제이쿼리 메서드는 모두 제이쿼리 객체를 반환
- 따라서 반환된 객체에서 다시 메서드를 호출하는 식으로, 메서드를 체인으로 연결할 수 있음 
- 새 컨텐츠를 추가하는 메서드도 여러가지 있음
- `append` 메서드는 제이쿼리 객체에 들어있는 모든 요소에 매개변수로 넘긴 컨텐츠를 이어붙임 
```javascript
$('p')
    .append('<sup>*</sup>');
```
- `append`는 일치하는 요소에 자식을 추가 
- 형제를 삽입할 때는 `before`와 `after`를 사용 
- 다음은 모든 문단 앞뒤에 `<hr>`요소를 추가하는 코드 
```javascript
$('p')
    .after('<hr>');
    .before('<hr>');
```
- 삽입 메서드는 삽입할 자리에서 호출하지만, 반대로 삽입할 '요소'에서 호출하는 `appendTo`, `insertBefore`, `insertAfter` 메서드도 있음 
```javascript
$('<sup>*</sup>').appendTo('p');        // $('p').append('<sup>*</sup>') 와 같음
$('<hr>').insertBefore('p');            // $('p').before('<hr>')와 같음
$('<hr>').insertAfter('p');             // $('p').after('<hr>')와 같음
```
- 제이쿼리에서는 요소의 스타일도 쉽게 바꿀 수 있음 
- 클래스를 추가할 때는 `addClass`, 클래스를 제거할 때는 `removeClass`를 사용 
- 클래스를 토글하는 `toggleClass`메서드도 있음 
- 이 메서드는 요소에 특정 클래스가 없으면 추가하고, 있으면 제거 
- css메서드를 써서 스타일을 직접 수정할 수도 있음 
- `:even`과 `:odd` 선택자를 써서 짝수 번째, 홀수 번째 요소를 선택할 수도 있음 
```javascript
$('p:odd').css('color', 'red');
```
- 제이쿼리 체인을 사용하다 보면 선택한 요소의 부분집합만 남겨야 할 때가 있음 
- 제이쿼리 객체를 요소 하나로 줄이는 eq는 이미 봤지만, `filter`, `not`, `find`를 써서 선택범위를 줄일 수 있음
- `filter`는 셋 요소 일치 선택자에 맞는 요소만 남도록 선택 범위를 줄임
```javascript
$('p')
    .after('<hr>')
    .append('<sup>*</sup>')
    .not('.highlight')
    .css('color', 'red');
```
- `not`은 filter의 반대 
- 모든 문단 다음에 `<hr>`을 붙이고 `highlight`클래스가 없는 문단을 모두 들여 쓰는 예제
```javascript
$('p')
    .after('<hr>')
    .not('.highlight')
    .css('margin-left', '20px');
```
- `find`는 주어진 선택자에 일치하는 자손만 남김 
- `filter`가 현재 선택된 요소 전체에 필터를 적용하는 것과는 다름 
- 모든 문단 앞에 `<hr>`을 붙인 다음, 클래스가 `code`인 자손 요소의 폰트 크기를 키우려면?
```javascript
$('p')
    .after('<hr>')
    .find('.code')
    .css('font-size', '30px');
```

## 제이쿼리 취소 
- 제이쿼리 객체로 감싼 것을 취소하고 DOM요소에 직접 접근하려면 `get`메서드 사용 
```javascript
const para2 = $('p').get(1);    // 두 번째 <p> (0으로 시작하는 인덱스)
```
- 모든 문단이 들어있는 배열 
```javascript
const paras = $('p').get();     // <p>요소가 모두 들어있는 배열 
```

## Ajax
- 제이쿼리에는 Ajax호출을 간편하면서도 세밀히 컨트롤할 수 있는 메서드가 있음 
- 가장 널리 쓰는 `get`과 `post`가 있음 
- 이들 메서드는 콜백을 지원하기도 하지만, 서버 응답을 처리할 때 권장하는 방법인 프라미스를 반환하기도 함 
```javascript
function refreshServerInfo() {
    const $serverInfo = $('.serverInfo')
    $.get('http://localhost:7070').then(
        // 성공
        function(data) {
            Object.keys(data).forEachp(p => {
                $(`[data-replace="${p}"`]).text(data[p]);
            });
        },
        function(jqXHR, textStatus, err) {
            console.error(err);
            $serverInfo.address('error')
                .html('Error Connecting to server.')
        }
    );
}
```


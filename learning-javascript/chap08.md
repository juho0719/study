# 배열과 배열처리

## 배열의 기초
- 순서가 있는 데이터 집합. 0으로 시작하는 숫자형 인덱스 사용
- 한 배열의 요소가 모두 같은 타입일 필요는 없다. 배열은 다른 배열이나 객체도 포함할 수 있음
- 배열 리터럴은 대괄호([]). 배열 요소에 인덱스로 접근할 때도 대괄호([])
- length 프로퍼티 있음
- 배열 길이보다 큰 인덱스를 사용해서 요소를 할당하면 자동으로 그 인덱스에 맞게 늘어나며, 빈자리는 undefined로 채워짐
```javascript
// 배열 리터럴
const arr1 = [1, 2, 3];
const arr2 = ["one", 2, "three"];
const arr3 = [[1, 2, 3], ["one", 2, "three"]];
const arr4 = [
    { name: "Fred", type: "object", luckyNumbers = [5, 7, 13]},
    [
        { name: "Susan", type: "object" },
        { name: "Anthony", type: "object" },
    ],
    1,
    function() { return "arrays can contain functions too"; },
    "three",
];

// 배열 요소에 접근하기
arr1[0];        // 1
arr1[2];        // 3
arr3[1];        // ["one", 2, "three"]
arr4[1][0];     // { name: "Susan", type: "object" }

// 배열 길이
arr1.length;        // 3
arr4.length;        // 5
arr4[1].length;     // 2

// 배열 길이 늘리기
arr1[4] = 5;
arr1;               // [1, 2, 3, undefined, 5]
arr1.length;        // 5

// 배열의 현재 길이보다 큰 인덱스에 접근하는 것만으로 배열의 길이가 늘어나지는 않는다.
arr2[10];           // undefined
arr2.length         // 3

// Array 생성자
const arr5 = new Array();           // 빈 배열
const arr6 = new Array(1, 2, 3);    // [1, 2, 3]
const arr7 = new Array(2);          // 길이가 2인 배열, 요소는 모두 undefined
const arr8 = new Array("2");        // ["2"]
```

## 배열 요소 조작
- `push`는 배열 자체를 수정
- `concat`은 새 배열 반환

#### 배열의 처음이나 끝에서 요소 하나를 추가하거나 제거하기
- 배열의 처음은 인덱스가 0인 요소
- 배열의 끝은 배열이 arr이라면 arr.length - 1인 요소
- push와 pop은 각각 배열의 끝에 요소를 추가하거나 제거
- shift와 unshift는 각각 배열의 끝에 요소를 제거하거나 추가
- push와 unshift는 새 요소를 추가해서 늘어난 길이를 반환하고, pop과 shift는 제거된 요소를 반환
```javascript
const arr = ["b", "c", "d"];
arr.push("e");      // 4. arr은 이제 ["b", "c", "d", "e"]
arr.pop();          // "e". arr은 이제 ["b", "c", "d"]
arr.unshift("a");   // 4. arr은 이제 ["a", "b", "c", "d"]
arr.shift();        // "a". arr은 이제 ["b", "c", "d"]
```

#### 배열의 끝에 여러 요소 추가하기
- concat메서드는 배열의 끝에 여러 요소를 추가한 사본을 반환
- concat에 배열을 넘기면 분해해서 원래 배열에 추가한 사본을 반환
```javascript
const arr = [1, 2, 3];
arr.concat(4, 5, 6);        // [1, 2, 3, 4, 5, 6]. arr은 바뀌지 않습니다.
arr.concat([4, 5, 6]);      // [1, 2, 3, 4, 5, 6]. arr은 바뀌지 않습니다.
arr.concat([4, 5], 6);      // [1, 2, 3, 4, 5, 6]. arr은 바뀌지 않습니다.
arr.concat(4, [5, 6]);      // [1, 2, 3, 4, [5, 6]]. arr은 바뀌지 않습니다.
```
- concat은 제공받은 배열을 한 번만 분해. 배열 안에 있는 배열을 다시 분해하지 않음

#### 배열의 일부 가져오기
- `slice`메서드를 사용하여 배열의 일부를 가져올 수 잇음
- `slice`메서드는 매개변수를 두개 받음
- 첫 번째는 어디서부터 가져올지, 두 번째 매개변수는 어디까지 가져올지 (ㅏ)
- 음수 인덱스도 사용 가능. 음수를 사용하면 배열의 끝부터 요소를 셈
```javascript
const arr = [1, 2, 3, 4, 5];
arr.slice(3);       // [4, 5]. arr은 바뀌지 않았음
arr.slice(2, 4);    // [3, 4]. arr은 바뀌지 않았음
arr.slice(-2);      // [4, 5]. arr은 바뀌지 않았음
arr.slice(1, -2);   // [2, 3]. arr은 바뀌지 않았음
arr.slice(-2, -1);  // [4]. arr은 바뀌지 않았음
```

#### 임의의 위치에 요소 추가하거나 제거하기
- `splice`는 배열을 자유롭게 수정
- 첫 번째 매개변수는 수정을 시작할 인덱스
- 두 번째 매개변수는 제거할 요소 숫자
- 아무것도 제거하지 않을 때는 0을 넘김
- 나머지 매개변수는 배열에 추가될 요소
```javascript
const arr = [1, 5, 7];
arr.splice(1, 0, 2, 3, 4);      // []. arr은 이제 [1, 2, 3, 4, 5, 7] 
arr.splice(5, 0, 6);            // []. arr은 이제 [1, 2, 3, 4, 5, 6, 7]
arr.splice(1, 2);               // [2, 3]. arr은 이제 [1, 4, 5, 6, 7]
arr.splice(2, 1, 'a', 'b');     // [5]. arr은 이제 [1, 4, 'a', 'b', 6, 7]
```

#### 배열안에서 요소 교체하기
- copyWithin은 ES6에서 도입한 새 메서드
- 배열 요소를 복사하여 다른위치에 붙여 넣고, 기존 요소는 덮어 씀
- 첫 번째 매개변수는 복사한 요소를 붙여넣을 위치
- 두 번째 매개변수는 복사를 시작할 위치
- 세 번째 매개변수는 복사를 끝낼 위치 (생략가능. 생략시 배열 끝까지)
```javascript
const arr = [1, 2, 3, 4];
arr.copyWithin(1, 2);       // '2'요소에서 [3, 4]를 덮어씀. [1, 3, 4, 4]
arr.copyWithin(2, 0, 2);    // 첫 '4'요소에서 [1, 3]을 덮어씀. [1, 3, 1, 3]
arr.copyWithin(0, -3, -1);  // 첫 '1'요소에서 [3, 1]을 덮어씀. [3, 1, 1, 3]
```

#### 특정 값으로 배열 채우기
- fill은 ES6에서 도입
- 정해진 값으로 배열을 채움
- 배열의 일부만 채우려면 시작과 끝 인덱스를 지정하면 되고, 음수 인덱스도 가능
```javascript
const arr = new Array(5).fill(1);   // [1, 1, 1, 1, 1]
arr.fill("a");                      // ["a", "a", "a", "a", "a"]
arr.fill("b", 1);                   // ["a", "b", "b", "b", "b"]
arr.fill("c", 2, 4);                // ["a", "b", "c", "c", "b"]
arr.fill(5.5, -4);                  // ["a", 5.5, 5.5, 5.5, 5.5]
arr.fill(0, -3, -1);                // ["a", 5.5, 0, 0, 5.5]
```

#### 배열 정렬과 역순 정렬
- reverse는 배열 요소의 순서를 반대로 바꿈
```javascript
const arr = [1, 2, 3, 4, 5];
arr.reverse();      // [5, 4, 3, 2, 1]
```
- sort는 배열 요소의 순서를 정렬
```javascript
const arr = [5, 4, 3, 2, 1];
arr.sort();      // [1, 2, 3, 4, 5]
```
- sort는 정렬함수를 받을 수 있음
```javascript
const arr = [{ name: "Suzanne" }, { name: "Jim" }, { name: "Trevor" }, { name: "Amanda" }];
arr.sort();                                 // 배열 요소가 객체라 정렬되지 않음
arr.sort((a, b) => a.name > b.name);        // name 프로퍼티의 알파벳 순으로 정렬
arr.sort((a, b) => a.name[1] < b.name[1]);  // name 프로퍼티의 값 중 두번째 글자의 알파벳 역순으로 정렬
```

## 배열 검색
- indexOf는 찾고자 하는 것과 정확히 일치(===)하는 첫 번째 요소의 인덱스를 반환 (0부터 시작)
- lastIndexOf는 배열의 끝부터 검색
- 시작 인덱스 지정 가능
- indexOf, lastIndexOf 둘 다 일치하는 것을 찾지 못하면 -1 반환
```javascript
cosnt o = { name: "Jerry" };
const arr = [1, 5, "a", o, true, 5, [1, 2], "9"];
arr.indexOf(5);                     // 1
arr.lastIndexOf(5);                 // 5
arr.indexOf("a");                   // 2
arr.lastIndexOf("a");               // 2
arr.indexOf({ name: "Jerry" });     // -1
arr.indexOf(o);                     // 3
arr.indexOf([1, 2]);                // 6
arr.indexOf("9");                   // 7
arr.indexOf(9);                     // -1

arr.indexOf("a", 5);                // -1
arr.indexOf(5, 5);                  // 5
arr.lastIndexOf(5, 4);              // 1
arr.lastIndexOf(true, 3);           // -1
```
- findIndex는 보조 함수를 써서 검색 조건 지정 가능
- 단, 시작 인덱스 지정불가, findLastIndex같은 짝도 없음
```javascript
const arr = [{ id: 5, name: "Judith" }, { id: 7, name: "francis" }];
arr.findIndex(o => o.id === 5);             // 0
arr.findIndex(o => o.name === "Francis");   // 1
arr.findIndex(o => o === 3);                // -1
arr.findIndex(o => o.id === 17);            // -1
```
- 인덱스가 아니라 요소 자체를 받고 싶을 때는 find를 사용
- findIndex와 마찬가지로 검색 조건을 함수로 전달할 수 있음
- 조건에 맞는 요소가 없을 때는 undefined 반환
```javascript
const arr = [{ id: 5, name: "Judith" }, { id: 7, name: "francis" }];
arr.find(o => o.id === 5);  // { id: 5, name: "Judith" }
arr.find(o => o.id === 2);  // undefined
```
- find와 findIndex에 전달하는 함수는 배열의 각 요소를 첫 번째 매개변수로 받고, 현재 요소의 인덱스와 배열 자체도 매개변수로 받음
```javascript
// 제곱 수 찾기
const arr = [1, 17, 16, 5, 4, 16, 10, 3, 49];
arr.find((x, i) => i > 2 && Number.isInteger(Math.sqrt(x)));    // 4
```
- find와 findIndex에 전달하는 함수의 this도 수정 가능
- 이를 이용하여 함수의 메서드인 것처럼 호출할 수 있음
```javascript
Class Person {
    constructor(name) {
        this.name = name;
        this.id = Person.nextId++;
    }
}
Person.nextId = 0;
cosnt jamie = new Person("Jamie"),
    juliet = new Person("Juliet"),
    peter = new Person("Peter"),
    jay = new Person("Jay");
const arr = [jamie, juliet, peter, jay];

// 옵션 1 : ID를 직접 비교하는 방법
arr.find(p => p.id === juliet.id);      // juliet 객체

// 옵션 2 : "this" 매개변수를 이용
arr.find(function(p) {
    return p.id === this.id;
}, juliet);                             // juliet 객체
```
- some은 조건에 맞는 요소를 찾으면 즉시 검색을 멈추고 true, 찾지 못하면 false
```javascript
const arr = [5, 7, 12, 15, 17];
arr.some(x => x%2 === 0);                       // true. 12는 짝수
arr.some(x => Number.isInteger(Math.sqrt(x)));  // false. 제곱수는 없음
```
- every는 배열의 모든 요소가 조건에 맞아야 true, 아니면 false
- 조건에 맞지 않는 요소를 찾아야만 검색을 멈추고 false반환
```javascript
const arr = [4, 6, 16, 36];
arr.every(x => x%2 === 0);                          // true. 홀수가 없음
arr.every(x => Number.isInteger(Math.sqrt(x)));     // false. 6는 제곱수가 아님
```
- some과 every도 콜백 함수 호출 시 this로 사용할 값을 두 번째 매개변수로 받을 수 있음

## map과 filter
- map은 배열 요소르 변형
```javascript
const cart = [ { name: "Widget", price: 9.95 }, { name: "Gadget", price: 22.95 }];
const names = cart.map(x => x.name);            // ["Widget", "Gadget"]
const prices = cart.map(x => x.price);          // [9.95, 22,95]
const discountPrices = prices.map(x => x*0.8);  // [7.96, 18.36]
```
- 콜백 함수는 각 요소에서 호출될 때 요소 자체와 인덱스, 배열 전체를 받음
```javascript
const items = ["Widget", "Gadget"];
const prices = [9.95, 22.95];
const cart = items.map((x, i) => ({ name: x, price: prices[i]}));
// cart: [{ name: "Widget", price: 9.95 }, { name: "Gadget", price: 22.95 }]
```
- 객체를 괄호로 감싼 이유는 화살표 표기법에서 객체 리터럴의 중괄호를 블록으로 판단하기 때문
- filter는 배열에서 필요한 것만 남길 목적
- map과 마찬가지로 사본을 반환하며, 새 배열에는 필요한 요소만 남음
```javascript
// 카드 덱을 만듭니다.
const cards = [];
for(let suit of ['H', 'C', 'D', 'S'])
    for(let value=1; value<=13; value++)
        cards.push({ suit, value });

// value가 2인 카드
cards.filter(c => c.value === 2);
// [
//     { suit: 'H', value: 2 },
//     { suit: 'C', value: 2 },
//     { suit: 'D', value: 2 },
//     { suit: 'S', value: 2 },
// ]
```
- map이 배열의 각 요소를 변형한다면 reduce는 배열 자체를 변형
- map이나 filter처럼 콜백 함수를 받음
- 첫 번째 매개변수는 배열이 줄어드는 대상인 어큐뮬레이터(accumulator)
- 두 번째 매개변수부터는 기존에 설명했던 콜백의 순서대로, 현재 배열 요소, 현재 인덱스, 배열 자체
- 초기값도 옵션으로 받을 수 있음
```javascript
const arr = [5, 7, 2, 4];
const sum = arr.reduce((a, x) => a += x, 0);
```




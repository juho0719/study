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

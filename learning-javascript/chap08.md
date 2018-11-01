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

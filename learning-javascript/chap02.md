# 자바스크립트 개발 도구
- 깃(Git) : 협업에 특화된 버전 컨트롤 도구
- 노드(Node) : 브라우저 밖에서 자바스크립트를 실행할 수 있게 하는 도구. 함께 설치되는 npm은 다른 도구를 설치할 때 필요
- 걸프(Gulp) : 반복적인 개발 작업을 자동화하는 빌드 도구. (Grunt도 널리 쓰임)
- 바벨(Babel) : ES6 코드를 ES5 코드로 변환하는 트랜스 컴파일러
- ES린트(ESLint) : 자주 하는 실수를 피하고 더 나은 코드를 작성하기 위해 도와주는 프로그램

## ES6 사용하기
- 어디서든 사용하기 위해서 아직까지는 더 `안전한` ES5 코드로 트랜스컴파일 해야함
    - 현재 브라우저가 ES6의 일부 기능만 지원하기 때문
    - 최신 브라우저가 지원을 하더라도, 사용자가 예전 버전을 쓰고 있으면 사용하지 못하는 건 마찬가지

## ES6 기능
- ES6에 새 기능이 너무 많아 트랜스컴파일러조차도 아직 72% 지원에 불과
- 트랜스컴파일을 시작하기 전에 아래와 같은 준비 작업 필요
1. 깃 설치
2. 터미널 사용법을 익히는 게 유리
3. 프로젝트 루트 생성
    - 프로젝트별로 디렉토리를 따로 만드는 게 좋음
4. 깃 사용법 숙지
    - 프로젝트 루트에 저장소를 초기화 (.git 디렉토리 자동 생성)
    ```
    $ git init
    ```
    - 버전 관리하지 않을 파일 목록 작성 (.gitignore파일 작성)
    ```
    # npm 디버그 기록
    npm-debug.log*

    # 프로젝트 의존성
    node_modules

    # macOS 폴더 속성
    .DS_Store

    # 임시 파일
    *.tmp
    ```
    - 저장소의 현재 상태 출력
    ```
    $ git status
    ```
    - 파일을 커밋하기 위해선 stage모드로 등록해야 함 (add)
    ```
    $ git add .gitignore
    ```
    - 파일 커밋 (메시지 작성 필수)
    ```
    $ git commit -m "Initial commit: added .gitignore"
    ```
5. npm 패키지 관리
    - 노드 설치시 같이 설치됨
    - node, npm 버전 확인
    ```
    $ node -v
    $ npm -v
    ```
    - 패키지 설치 시 전역, 로컬로 설치 할 수 있음
    - 전역으로 설치하는 패키지는 보통 개발 과정에서 사용하는 터미널 실행 도구들을 말함
    - 로컬로 설치하는 패키지는 각 프로젝트에 종속되는 패키지를 말함
    - 패키지 설치 방법 (예:underscore설치)
    ```
    $ npm install underscore
    ```
    - 특정 버전 설치 방법
    ```
    $ npm install underscore@1.8.0
    ```
    - 설치 모듈이 늘어나면 모듈을 추적하고 관리할 방법이 필요
    - npm은 package.json을 통해 의존성을 관리
    - 다음 명령을 통해 package.json 생성 가능
    ```
    $ npm init
    ```
    - 질문에 적절한 답을 하여 package.json을 구성해도 되고, 일단 모든 질문에 엔터를 쳐 기본 값으로 생성 후 나중에 수정해도 됨
    - 의존성은 일반 의존성과 개발 의존성으로 나뉨
    - 개발 의존성은 앱을 실행할 때는 필요 없지만, 프로젝트 개발 시 필요하거나 도움을 주는 패키지를 말함
    - 로컬 패키지 설치 시 `--save` 또는 `--save-dev` 플래그를 사용해야 package.json에 등록됨
    ```
    $ npm install --save underscore
    ```
    - 로컬 패키지 설치 위치는 프로젝트 하위의 `node_modules`에 설치
    - 다음 명령어를 통해 package.json에 작성된 내역을 기준으로 `node_modules`에 자동 설치 해줌
    ```
    $ npm install
    ```
6. 빌드도구 : 걸프와 그런트
    - 반복 작업을 자동화하는 빌드 도구
    - 둘다 훌륭한 도구이지만 여기서는 걸프 사용
    - 걸프 전역 설치 (관리자 권한 필요시 맨 앞에 sudo 추가)
    ```
    $ npm install -g gulp
    ```
    - 프로젝트별로 로컬 걸프도 필요
    ```
    $ npm install --save-dev gulp
    ```
    - 최종 사용자에게는 필요없지만 개발 과정에서는 도움이 됨. 설치가 완료되면 gulpfile.js를 만듦
    ```javascript
    const gulp = require('gulp');
    // 걸프 의존성을 여기에 기술

    gulp.task('default', function() {
        // 걸프 작업을 여기에 기술
    });
    ```
7. 프로젝트 구조
    - 보통 클라이언트(브라우저) 코드는 디렉토리 시작을 public으로 하고, 서버(노드)는 일반 패키지명으로 시작
    (예: 서버 - es6, 클라이언트 - public/es6)
    - ES6코드를 ES5로 변환한 소스는 `dist` 디렉토리에 저장하는 경우가 많음
    - 보통 아래와 같은 구조를 가짐
    ```
    .git            # Git
    .gitignore

    package.json    # npm
    node_modules

    es6             # 서버(노드) 소스
    dist

    public/
        es6         # 클라이언트(브라우저) 소스
        dist
    ```

## 트랜스 컴파일러

- 주로 바벨과 트레이서가 사용됨 (여기서는 바벨 사용)
- 바벨 버전 6부터 ES5를 ES6로 변환하려면 ES6 변환 프리셋을 설치, 설정해야 함 
- 프로젝트마다 사용되는 코드 스타일이 다르므로 로컬로 설치
- (책에서 나온 babel-preset-es2015는 현재 deprecated 상태임. 따라서 env로 변경)
```
$ npm install --save-dev babel-preset-env
```
~~
- 프로젝트 루트에 .babelrc파일 생성 
```
{ "presets": ["env"] }
```

#### 바벨을 걸프와 함께 사용하기
- ES6코드를 ES5로 변환, dist에 저장함
- gulp-babel패키지 설치
- (실제 테스트해보니 @bable/core, @babel/preset-env이 추가로 더 필요)
```
$ npm install --save-dev gulp-babel @babel/core @babel/preset-env
```
- gulpfile.js 수정
```javascript
const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', function() {
    // 노드 소스
    gulp.src("es6/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist"));
    // 브라우저 소스
    gulp.src("public/es6/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("public/dist"));
});
```
- 걸프는 파이프라인 개념으로 작업을 처리
- 샘플 코드 작성 (es6/test.js)
```javascript
'use strict'
// es6 기능 : 블록 스코프 변수 선언
const sentences = [
    { subject: 'JavaScript', verb: 'is', object: 'great' },
    { subject: 'Elephants', verb: 'are', object: 'large' },
];
// es6 기능 : 객체 분해
function say({ subject, verb, object }) {
    // es6 기능 : 템플릿 문자열
    // 아래 사용한 것은 따옴표가 아니라 백틱(`)
    console.log(`${subject} ${verb} ${object}`);
}
// es6 기능: for..of
for(let s of sentences) {
    say(s);
}
```

## 린트
- 내 코드를 검토하여 자주 일어나는 실수를 알려줌
- ESLint 설치
```
$ npm install -g eslint
```
- `eslint --init` 을 통해 .eslintrc 파일 생성 (질문에 따른 파일 생성)
- 파일을 일일이 실행해서 확인해도 되고, 걸프에 연동시켜도 됨
- 걸프에 연동시 다음 라이브러리 추가
```
$ npm install --save-dev gulp-eslint
```
- gulpfile.js를 수정
```javascript
const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');

gulp.task('default', function() {
    // ESLint를 실행합니다.
    gulp.src(["es6/**/*.js", "public/es6/**/*.js"])
        .pipe(eslint())
        .pipe(eslint.format());
    // 노드 소스
    gulp.src("es6/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist"));
    // 브라우저 소스
    gulp.src("public/es6/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("public/dist"));
});
```
- `.eslintrc` 파일 수정으로 설정 변경 가능
- 각 규칙의 첫번째 숫자는 에러표시 구분 (0: 규칙을 적용하지 않음, 1: 실수, 2: 에러)
```
{
    "rules": {
        /*  마지막 쉽표 사용 가능으로 규칙 수정
            하지만 이 파일은 JSON이므로, 마지막 쉽표를 쓸 수 없음 */
        "comma-dangle": [
            2,
            "always-multiline"
        ],
        "indent": [
            2,
            4
        ],
        /* ... */
    }
}
```
# Spring-Boot-Devtools



pom.xml에 의존성 추가

```properties
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
</dependency>
```



캐시 설정을 개발 환경에 맞게 변경

클래스패스에 있는 파일이 변경 될 때마다 자동으로 재시작

- 직접 재시작(cold start)보다 빠르다. 왜?

- 리로딩 보다는 느리다. (JRebel 같은건 아님)

- 리스타트 하고 싶지 않은 리소스는? spring.devtools.restart.exclude

- 리스타트 기능 끄려면? spring.devtools.enabled=false

라이브 리로드? 리스타트 했을 때 브라우저 자동 리프레시 하는 기능

- 브라우저 플러그인 설치 해야 함.

- 라이브 리로드 끄려면? spring.devtools.liveload.enabled=false

글로벌 설정

- ~/.spring-boot-devtools.properties


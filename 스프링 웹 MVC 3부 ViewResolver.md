# 스프링 웹 MVC 3부 ViewResolver



ContentNagotiationViewResolver

(accept 헤더에 따라 응답이 달라짐)



contentType은 요청 포멧

accept는 응답 포멧



XML을 파싱하려면 의존성 추가해야 함

```properties
<dependency>
    <groupId>com.fasterxml.jackson.dataformat</groupId>
    <artifactId>jackson-dataformat-xml</artifactId>
    <version>2.9.6</version>
</dependency>
```



뷰리졸버 설정 제공

(HttpMessageConvertersAutoConfiguration)
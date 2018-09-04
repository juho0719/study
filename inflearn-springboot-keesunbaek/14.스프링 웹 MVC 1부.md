# 스프링 웹 MVC 1부



### 스프링 MVC

자동 설정으로 제공하는 여러 기본 기능



### 스프링 MVC 확장

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    ...
}
```



### 스프링 MVC 재정의

```java
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    ...
}
```


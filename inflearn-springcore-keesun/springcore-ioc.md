# Spring IoC컨테이너와 Bean
- 의존 관계 주입
- 객체를 사용할 때 직접 만들어서 사용하는 것이 아니라, 주입 받아 사용하는 방법
- 최근에는 xml로 설정하는 것보다 자바 클래스로 설정파일을 생성하고, 객체 주입을 받을 때도 설정이나, 생성자를 이용하기보다 애노테이션을 많이 사용

## 스프링 IoC 컨테이너이란?
- BeanFactory
- 애플리케이션 컴포넌트의 중앙 저장소
- 빈 설정 소스로 부터 빈 정의를 읽어들이고, 빈을 구성하여 제공

## Bean이란?
- 스프링 IoC 컨테이너가 관리하는 객체
- 장점
	- Scope
		- 싱글톤 : 하나의 객체만 사용
		- 프로토타입 : 매번 다른 객체 생성
	- 라이프사이클 인터페이스 제공
		- @PostConstruct을 사용하면 빈 생성 이후의 작업을 정의할 수 있음
	- 의존성 주입 가능
		- 테스트 용이 (Mock객체를 생성하여 주입가능)
	```java
	...생략
	@Mock
	BookRepository bookRepository;

	@Test
	public void save() {
		Book book = new Book();

		when(bookRepository.save()).thenReturn(book);
		... 생략
	}
	```

## ApplicationContext와 빈 설정 방법
- 빈 설정 방법 2가지
	- XML 설정
	- 자바 클래스 설정
- 빈 주입 방법 2가지
	- @Autowired
	- setter 주입

#### XML 설정 (고전적)
```xml
<!-- xml 설정파일 -->
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

	<bean id="bookService" class="com.juho.springapplicationcontext.BookService">
	</bean>

	<bean id="bookRepository" class="com.juho.springapplicationcontext.BookRepository">
	</bean>
</bean>
```
- 위와 같이 설정하면 `bean`으로 등록
- @Autowired의 경우 애노테이션 붙은 객체가 빈으로 등록되어 있으면 알아서 주입시켜 주지만, setter 주입의 경우 `property`로 맵핑 시켜줘야 함
```xml
<!-- xml 설정파일 -->
... 생략
<bean id="bookService" class="com.juho.springapplicationcontext.BookService">
	<property name="bookRepository" ref="bookRepository" />
</bean>

<bean id="bookRepository" class="com.juho.springapplicationcontext.BookRepository">
</bean>
... 생략
```
```java
@Service
public class BookService {
    BookRepository bookRepository;

    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }
}
```
- XML로 설정한 내역을 토대로 빈을 가져오려면?
```java
public class DemoApplication {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("application.xml");
        String[] beanDefinitionNames = context.getBeanDefinitionNames();
        System.out.println(Arrays.toString(beanDefinitionNames));

        BookService bookService = (BookService) context.getBean("bookService");
        System.out.println(bookService.bookRepository != null);
    }
}
```
- `bean`이 많을 경우 일일이 등록하기 어려움
- 'componentScan`을 사용하면 해당 디렉토리 하위에 있는 모든 `@Component`를 `bean`으로 등록시켜줌 
- @Service, @Repository등 모두 @Component를 상속받아 구현한 애노테이션. 따라서 해당 애노테이션들도 `bean`으로 등록
```xml
<!-- xml 설정파일 -->
... 생략
<context:component-scan base-package="com.juho.springapplicationcontext"/>
... 생략
```

#### 자바 클래스 설정
- `@Configuration`을 붙이면 자바 객체도 설정파일로 사용할 수 있음
```java
@Configuration
public class ApplicationConfig {
    @Bean
    public BookRepository bookRepository() {
        return new BookRepository();
    }

    @Bean
    public BookService bookService() {
        BookService bookService = new BookService();
        bookService.setBookRepository(bookRepository());
        return bookService;
    }
}
```
- 해당 설정파일을 사용하려면
```java
public class DemoApplication {
    public static void main(String[] args) {
        ApplicationContext context = new AnnotationConfigApplicationContext(ApplicationConfig.class);
				
        String[] beanDefinitionNames = context.getBeanDefinitionNames();
        System.out.println(Arrays.toString(beanDefinitionNames));

        BookService bookService = (BookService) context.getBean("bookService");
        System.out.println(bookService.bookRepository != null);
    }
}
```
- 자바 객체에도 애노테이션을 사용하여 `componentScan`을 할 수 있음
```java
@Configuration
@ComponentScan(basePackageClasses = DemoApplication.class)
public class ApplicationConfig {
	...생략
```
- 특정 패키지를 지정할 수도 있지만 위와 같이 클래스를 지정하면 해당 클래스 하위에 있는 빈들을 등록시킨다는 의미

#### Autowired
- 해당 객체에 주입시킬 빈을 찾아 주입시켜줌
- `required` 속성의 기본값은 true, 따라서 빈을 찾지 못하면 오류 발생 (어플리케이션 구동 실패)
- 사용 할 수 있는 위치
	- 생성자(스프링4.3부터는 생략 가능)
	- setter
	- 필드
- 생성자 예제
```java
@Service
public class BookService {
	BookRepository bookRepository;
	
	@Autowired
	public void bookService(BookRepository bookRepository) {
			this.bookRepository = bookRepository;
	}
}
```
- setter 예제
```java
@Service
public class BookService {
	BookRepository bookRepository;
	
	@Autowired
	public void setBookRepository(BookRepository bookRepository) {
			this.bookRepository = bookRepository;
	}
}
```
- 필드 예제
```java
@Service
public class BookService {
	@Autowired
	BookRepository bookRepository;
}
```
- 빈 주입시 경우의 수
	- 해당 타입의 빈이 없는 경우 : 에러 (required=false사용 시 오류 안남. 빈 등록만 안됨)
	- 해당 타입의 빈이 한 개인 경우 : 주입
	- 해당 타입의 빈이 여러개인 경우
		1. 빈 이름으로 시도
		2. 같은 이름의 빈 찾으면 해당 빈 사용
		3. 같은 이름 못찾으면 실패 

- 같은 타입의 빈이 여러개 일때
	- `@Primary`를 붙이면 해당 객체를 주입 시키라는 의미
	- 해당 타입의 빈 모두 주입 받기
	- `@Qualifier`를 붙이면 빈 이름으로 주입시킬 수 있음

- BeanPostProcessor를 통해 새로 만든 빈 인스턴스를 수정할 수 있는 라이프 사이클 인터페이스 
```java
@PostConstruct
public void setup() {
	...생략
}
```

- AutowiredAnnotationBeanPostProcessor extends BeanPostProcessor
	- 스프링에서 제공하는 @Autowired, @Value, @Inject(JSR-330) 애노테이션을 지원하는 애노테이션 처리기

#### @Component와 ComponentScan
- ComponentScan의 주요 기능
	- 스캔 기능 설정
	- 필터 : 어떤 애노테이션을 스캔 할지, 안할지
- ComponentScan예제 (패키지명)
```java
// com.juho.demo 하위에 있는 빈 등록
@ComponentScan(value = "com.juho.demo")
```
- 위의 방법은 타입 세이프하지 않아 버그를 유발. 아래와 같은 방법으로 변경 가능
```java
// DemoApplication.class위치의 하위에 있는 빈 등록
@ComponentScan(basePackages = DemoApplication.class)
```
- 필터를 사용하여 스캔하지 않을 파일 지정 가능
```java
@ComponentScan(excludeFilters = {
		@Filter(type = FilterType.CUSTOM, classes = TypeExcludeFilter.class),
		@Filter(type = FilterType.CUSTOM, classes = AutoConfigurationExcludeFilter.class) })
```

- @Component 목록. 아래의 애노테이션들 또한 Component이므로 빈으로 등록
	- @Repository
	- @Service
	- @Controller
	- @Configuration

- @ComponentScan은 스캔할 패키지와 애노테이션에 대한 정보
- 실제 스캐닝은 `ConfigurationClassPostProcessor`라는 `BeanFactoryPostProcessor`에 의해 처리

- 펑션을 사용하여 빈 등록 가능
```java
@SpringBootApplication
public class Demospring51Application {
    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(Demospring51Application.class);
        app.addInitializers((ApplicationContextInitializer<GenericApplicationContext>) ctx -> ctx.registerBean(BookService.class));
        app.run(args);
    }
}
```
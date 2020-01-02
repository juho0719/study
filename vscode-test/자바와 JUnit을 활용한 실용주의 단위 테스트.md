# 테스트 조직

## AAA로 테스트 일관성 유지
- 준비(Arrange) : 테스트 실행 전 시스템이 적절한 상태에 있는 지 확인하기 위해 객체를 생성하거나 커뮤니케이션, 또는 다른 API를 호출하는 것등의 준비과정
- 실행(Act) : 테스트 코드를 실행
- 단언(Assert) : 실행한 코드가 예상대로 동작하는지 확인
- 사후(After) : 자원을 할당했을 경우 잘 정리했는지 확인 (때에 따라 필요) 

## 동작테스트 vs 메서드 테스트
- 테스트를 작성할 때는 클래스 동작에 집중, 개별 메서드를 테스트한다고 생각하면 안됨
- 은행 ATM을 예로 들면 
	- ATM클래스의 메서드로 `deposit()`, `withdraw()`, `getBalance()` 생성 후 테스트 시작
	- `makeSingleDepoit`, `makeMultipleDoposits` 테스트 케이스 생성
	- 각 테스트 결과를 검증하려면 `getBalance()` 메서드를 호출해야 하는데 `getBalance()`만 검사하는 테스트는 만들고 싶지 않을 것임
	- 입금과 출금 같은 다른 동작들도 같이 포함 시켜 테스트
	- `withdraw()`도 마찬가지. 출금 테스트 전 먼저 입금할 필요가 있음.
- 단위 테스트를 작성할 때는 먼저 전체적인 시각에서 시작해야 함

## 테스트와 프로덕션 코드의 관계
- 테스트는 프로젝트 안에서 프로덕션 코드와 분리해야 함
- 단위 테스트는 일방향성 -> 테스트 코드는 프로덕션 시스템 코드를 의존하지만 프로덕션 코드는 테스트 코드의 존재를 모름

### 테스트와 프로덕션 코드 분리
- 프로덕션 코드를 배포할 때 테스트는 포함 시키지 않음
  - JAR파일 용량 증가로 인한 약간의 성능 저하
	- 코드 베이스 공격도 증가
- 테스트 코드를 넣을 수도 있지만, 다음 사항을 고려해야 함
  - 테스트를 프로덕션 코드와 같은 디렉토리, 패키지에 넣기
	  - 구현하기 쉽지만, 배포시 테스트 코드를 걷어 내는 스크립트가 필요하므로 번거로움
	- 테스트를 별도 디렉토리로 분리하지만 프로덕션 코드와 같은 패키지에 넣기
	  - 대부분 이렇게 구현. 메이븐 같은 도구는 이 모델을 권장

### 내부 데이터 노출 vs 내부 동작 노출
- 어떤 개발자들은 프로덕션 코드의 public 인터페이스만 사용해야 한다고 믿음
- private 메서드를 테스트 코드에서 호출하면 정보 은닉 원칙을 위배한다고 생각
- private 메서드를 호출하는 테스트는 그 자체로 구현 세부 사항과 결속하게 되어 좋지 않음
- 내부의 세부 사항을 테스트하는 것은 서비스 저품질로 이어질 수 있음 (구현 세부 사항과 결속하여 있기 때문)
- 또한, 테스트하려는 객체에 과도하게 사소한 질의를 할 수도 있음.
- 내부 데이터를 노출하는 것은 테스트와 프로덕션 코드 사이에 과도한 결합을 초래. 내부 동작을 노출하는 것과는 별개 문제
- 내부 행위를 테스트하려는 충동이 든다면 설계에 문제가 있는 것
- 가장 좋은 해결책은 테스트하려는 private 메서드를 추출하여 다른 클래스로 이동, public 메서드로 만듬

## 집중적인 단일 목적 테스트의 가치
- `ProfileTest.java`에서 구현한 테스트들을 하나로 합쳐서 구현할 수도 있지만 Junit이 제공하는 테스트 고립의 중요한 이점을 잃게 됨
- 테스트를 분리하면 다음과 같은 이점이 있음
	- `assert`가 실패했을 때 실패한 테스트 이름이 표시되기 때문에 어느 동작에서 문제가 있는지 빠르게 파악 가능
	- 현재 실패한 테스트에 대해 다른 테스트의 영향을 제거할 수 있음
	- `assert`가 실패하면 테스트 메서드는 중단되기 때문에 모든 케이스 실행 보장 가능

## 문서로서의 테스트
- 테스트 코드 자체로 쉽게 설명할 수 없는 것들을 알려줄 수 있음
- 주석을 대신 하기도 함

### 일관성 있는 이름으로 테스트 문서화
- 테스트가 작을 수록 분명한 행위에 집중하고, 테스트 이름에 더 많은 의미를 부여할 수 있음
- 테스트하려는 맥락을 제한하기보다, 일련의 작업을 호출했을 때 어떤 결과가 나오는지를 명시해야 함

### 테스트를 의미 있게 만들기
- 테스트가 어떤 일을 하는지 파악하기 어려워한다면 주석을 추가하는 것뿐만 아니라 테스트 이름도 개선해야 함
  - 지역 변수 이름 개선
	- 의미 있는 상수 도입
	- hamcrest의 `assert` 사용
	- 커다란 테스트를 작게 나누어 특정 행위에 집중
	- `@Before` 메서드 활용 

## @Before와 @After 더 알기
- `@Before` 와 `@After` 메서드는 매 테스트 케이스 시작 전과 후 동작
- 예제
```
@Before createAccount
@Test depositIncreasesBalance
@After closeConnections
@Before createAccount
@Test hasPositiveBalance
@After closeConnections
```

### BeforeClass와 AfterClass 애너테이션
- 클래스에 있는 어떤 테스트를 처음 실행하기 전, 후에 한 번만 실행
- 예제
```
@BeforeClass initializeSomethingReallyExpensive
@Before createAccount
@Test depositIncreasesBalance
@After closeConnections
@Before createAccount
@Test hasPositiveBalance
@After closeConnections
@AfterClass cleanUpSomethingReallyExpensive
```

## 녹색이 좋다: 테스트를 의미 있게 유지
- 실패하는 테스트가 있다면 더 늘리지 말고 곧바로 고쳐서 모든 테스트가 항상 통과하도록 해야 함

### 테스트를 빠르게
- 항상 녹색을 유지하는 방법은 필요하다고 생각하는 테스트만 실행
- 하지만 테스트 개수를 한정하면 피드백을 받지 못하는 확률이 늘어나고, 피드백을 받지 못하는 시간이 길어지면 어떤 부분을 깨뜨리는 코드를 작성할 확률이 늘어남.
- 테스트 코드에 느린 자원을 통제하는 부분이 없다면 수 초안에 수 천개의 테스트 실행 가능
- 혹은 백그라운드에서 테스트를 항상 실행하는 도구를 사용해도 됨
- 모든 테스트 실행을 기다릴 수 없다면, 패키지단위로 테스트 해도 됨
- JUnit은 카테고리 기능을 제공하여 특정 카테고리에 해당하는 테스트만 별도로 실행 가능

### 테스트 제외
- 다수의 실패를 다루는 해결책 중 하나는 문제가 있는 테스트에 집중하고 다른 실패 테스트는 주석 처리
- JUnit에서는 `@Ignore`를 제공
```java
@Test
@Ignore("don't forget me!")
public void somethingWeCannotHandleRightNow() {
	// ...
}
```
- `@Ignore`의 설명 메시지는 선택 사항


# 좋은 테스트의 FIRST 속성
- 좋지 않은 테스트
  - 테스트를 사용하는 사람에게 어떤 정보도 주지 못하는 테스트
	- 산발적으로 실패하는 테스트
	- 어떤 가치도 증명하지 못하는 테스트
	- 실행하는 데 오래 걸리는 테스트
	- 코드를 충분히 커버하지 못하는 테스트
	- 구현과 강하게 결합되어 있어, 작은 변화에도 다수의 테스트가 깨지는 테스트들
	- 수많은 설정 고리로 점프하는 난해한 테스트

## FIRST: 좋은 테스트 조건
- `[F]ast` : 빠른
- `[I]solated` : 고립된
- `[R]epeatable` : 반복 가능한
- `[S]elf-validating` : 스스로 검증 가능한
- `[T]imely` : 적시의
- 테스트 코드를 먼저 작성하고 구현을 하면 더 좋은 결과를 얻을 수도 있음(TDD : 테스트 주도 개발)
- 테스트를 먼저 작성하든 이후에 작성하든 FIRST 원리를 고수하면 테스트 코드를 잘 작성할 수 있음

## [F]IRST: 빠르다
- 단위 테스트를 하루에 서너 번 실행하기도 버겁다면 무언가 잘못된 것
- 대상 시스템에 대한 지속적이고 종합적인 빠른 피드백을 주지 못하면 그만큼 저하됨
- 느린 테스트에 대한 의존성을 줄이면 빠른 테스트를 유지하는 데 효과적
```java
public class StatCompiler {
	private QuestionController controller = new QuestionController();

	public Map<String, Map<Boolean, AtomicInteger>> responsesByQuestion(List<BooleanAnswer> answers) {
		Map<Integer, Map<Boolean, AtomicInteger>> responses = new HashMap<>();
		answers.stream().forEach(answer -> incrementHistogram(response, answer));
		
		return convertHistogramIdsToText(responses);
	}

	private Map<String, Map<Boolean, AtomicInteger>> convertHistogramIdsToText(Map<Integer, Map<Boolean, AtomicInteger>> responses) {
		Map<String, Map<Boolean, AtomicInteger>> textResponses = new HashMap<>();
		responses.keySet().stream().forEach(id -> textResponses.put(controller.find(id).getText(), responses.get(id)));
		return textResponses;
	}

	private void incrementHistogram(Map<Integer, Map<Boolean, AtomicInteger>> responses, BooleanAnswer answer) {
		Map<Boolean, AtomicInteger> histogram = getHistogram(responses, answer.getQuestionId());
		histogram.get(Boolean.valueOf(answer.getValue())).getAndIncrement();
	}

	private Map<Boolean, AtomicInteger> getHistogram(Map<Integer, Map<Boolean, AtomicInteger>> responses, int id) {
		Map<Boolean, AtomicInteger> histogram = null;
		if(responses.containsKey(id)) {
			histogram = responses.get(id);
		} else {
			histogram = createNewHistogram();
			responses.put(id, histogram);
		}
		return histogram;
	}

	private Map<Boolean, AtomicInteger> createNewHistogram() {
		Map<Boolean, AtomicInteger> histogram;
		histogram = new HashMap<>();
		histogram.put(Boolean.FLASE, new AtomicInteger(0));
		histogram.put(Boolean.TRUE, new AtomicInteger(0));
		return histogram;
	}
}
```

- 히스토그램은 `Boolean` 값의 개수에 대한 맵
- `responses` 맵은 질문 ID와 그에 대한 히스토그램을 맵핑
- `incremetHistogram()` 메서드는 주어진 질문에 대해 히스토그램을 갱신
- `convertHistogramIdsToText()` 메서드는 `responses` 맵을 질문 텍스트 대 히스토그램으로 맵핑
- `convertHistogramIdsToText()` 메서드를 보면 `QuestonController` 객체의 `find()` 메서드를 호출할 때 영속성 저장소와 상호 작용함으로써 느린 테스트가 될 수 있다.
- 질문 개체를 얻어 오기 위해 테이터베이스도 실행해야 함
- 따라서 질문을 얻기 위해 컨트롤러에 질의하기보다는 먼저 질문을 가져오고, 그 텍스트를 `responseByQuestion()` 메서드의 인수로 넘긴다.
- 먼저 대답에 대한 질문 ID와 질문 내용의 맵을 생성하는 `questionText()`에서 메서드를 생성한다.
```java
public Map<Integer, String> questionText(List<BooleanAnswer> answers) {
	Map<Integer, String> questions = new HashMap<>();
	answers.stream().forEach(answer -> {
		if(!questions.containsKey(answer.getQuestionId())) {
			questions.put(answer.getQuestionId(), controller.find(answer.getQuestionId()).getText();
		}
	});
	return questions;
}
```

- `responsesByQuestion()` 메서드에 질문 ID와 내용을 맵핑하는 `questions` 변수 추가
```java
public Map<String, Map<Boolean, AtomicInteger>> responsesByQuestion(List<BooleanAnswer> answers, Map<Integer, String> questions) {
	Map<Integer, Map<Boolean, AtomicInteger>> responses = new HashMap<>();
	answers.stream().forEach(answer -> incrementHistogram(response, answer));

	return convertHistogramIdsToText(responses, questions);
}
```

- `responseByQuestion()` 메서드는 `convertHistogramIdsToText()` 메서드에 `questions` 맵을 넘김
```java
private Map<String, Map<Boolean, AtomicInteger>> convertHistogramIdsToText(Map<Integer, Map<Boolean, AtomicInteger>> responses, 
	Map<Integer, String> questions) {
	
	Map<String, Map<Boolean, AtomicInteger>> textResponses = new HashMap<>();
	responses.keySet().stream().forEach(id -> textResponses.put(questions.get(id), responses.get(id)));
	return textResponses;
}
```

- `questionText()` 메서드에 있는 코드는 여전히 느린 DB 저장소에 의존하지만 우리가 테스트하려는 코드는 작은 부분
- `convertHistogramIdsToText()` 메서드는 메모리상의 해시 맵만 사용하며 느린 DB 저장소는 조회하지 않음
```java
public class StatCompilerTest {

	@Test
	public void responsesByQuestionAnswersCountsByQuestionText() {
		StatCompiler stats = new StatCompiler();
		List<BooleanAnswer> answers = new ArrayList<>();
		answers.add(new BooleanAnswer(1, true));
		answers.add(new BooleanAnswer(1, true));
		answers.add(new BooleanAnswer(1, true));
		answers.add(new BooleanAnswer(1, true));
		answers.add(new BooleanAnswer(1, false));
		answers.add(new BooleanAnswer(2, true));
		answers.add(new BooleanAnswer(2, true));
		Map<Integer, String> questions = new HashMap<>();
		questions.put(1, "Tuition reimbursement?");
		questions.put(2, "Relocation package?");

		Map<String, Map<Boolean, AtomicInteger>> responses = stats.responsesByQuestion(answers, questions);
		assertThat(responses.get("Tuition reimbursement?").get(Boolean.TRUE).get(), equalTo(3));
		assertThat(responses.get("Tuition reimbursement?").get(Boolean.FALSE).get(), equalTo(1));
		assertThat(responses.get("Relocation package?").get(Boolean.TRUE).get(), equalTo(2));
		assertThat(responses.get("Relocation package?").get(Boolean.FALSE).get(), equalTo(0));
	}
}
```

- `responsesByQuestionAnswersCountsByQuestionText()` 테스트는 빠름
- 세 메서드를 조합하여 흥미로운 테스트를 작성
- 더 많은 로직을 커버하는 소수의 빠른 테스트는 DB호출에 의존하는 단일 테스트보다 수월하게 실행
- 하지만 여전히 컨트롤러에 의존하는 `questionText()` 메서드를 테스트하고 싶음

## F[I]RST: 고립시킨다
- 좋은 단위 테스트는 적은 양의 코드를 검증하는 데 집중
- 데이터 의존성 최소화 (데이터 의존성은 많은 문제를 야기 - 외부 요인에 의해 테스트가 깨질 가능성 농후)
- 다른 단위 테스트에 의존하지 않아야 함
- 테스트 코드는 어떤 순서나 시간에 관계없이 실행할 수 있어야 함
- SRP(Single Responsibility Principle)는 테스트 메서드에 훌륭한 지침임

## FI[R]ST: 좋은 테스트는 반복 가능해야 한다.
- 실행 결과가 항상 같아야 함
- 따라서 반복 가능한 테스트를 만들려면 직접 통제할 수 없는 외부 환경에 있는 항목들과 분리 시켜야 함
- 하지만 시간과 같이 외부 환경에 따라 달라지는 로직들을 테스트하려면 적절한 목 객체를 사용하여 테스트 해야 함
	- 자바 8에서는 `java.time.Clock` 객체를 사용하여 고정된 시간을 반환할 수 있음
	```java
	@Test
	public void questionAnswersDataAdded() {
		Instant now = new Date().toInstant();
		controller.setClock(Clock.fixed(now, ZoneId.of("Asia/Seoul")));
		int id = controller.addBooleanQuestion("text");

		Question question = controller.find(id);

		assertThat(question.getCreateTimestamp(), equalTo(now));
	}
	```
	```java
	public class QuestionController {
		private Clock clock = Clock.systemUTC();

		public int addBooleanQuestion(String text) {
			return persist(new BooleanQuestion(text));
		}

		void setClock(Clock clock) {
			this.clock = clock;
		}

		private int persist(Persistable object) {
			object.setCreateTimestamp(clock.instant());
			executeInTransaction((em) -> em.persist(object));
			return object.getId();
		}
	}
	```
	- `QuestionController` 클래스는 `Clock`객체의 출처는 신경쓰지 않고, 현재 인스턴스 객체로 동작

## FIR[S]T : 스스로 검증 가능하다
- 테스트는 `assert`를 통해 기대하는 결과 값을 작성해야 함
- 테스트에 필요한 어떤 설정 단계든 자동화 해야 함

## FIRS[T] : 적시에 사용한다
- 언제라도 단위 테스트를 작성할 수 있어야 함
- 단위 테스트는 좋은 습관
- 단위 테스트를 많이 할수록 테스트 대상 코드가 줄어들고 그러면 단위 테스트 작성이 쉬워짐
- 옛날 코드에 대한 테스트는 시간 낭비가 될 수도 있음. 코드에 큰 결함이 없고 당장 변경할 예정이 없다면 버그 유발 가능성이 높고, 자주 변경되는 부분에 시간을 투자


# Right-BICEP: 무엇을 테스트할 것인가?
- `Right-BICEP`는 무엇을 테스트할지에 대해 쉽게 선별하게 함
  - `Right` : 결과가 올바른가?
	- `B` : 경계 조건(boundary conditions)은 맞는가?
	- `I` : 역 관계(inverse relationship)를 검사할 수 있는가?
	- `C` : 다른 수단을 활용하여 교차 검사(cross-check) 할 수 있는가?
	- `E` : 오류 조건(error conditions)을 강제로 일어나게 할 수 있는가?
	- `P` : 성능 조건(performance characteristics)은 기준에 부합하는가?

## [Right]-BICEP : 결과가 올바른가?
- 테스트 코드는 기대한 결과를 산출하는지 검증할 수 있어야 함
- 산술 평균 테스트는 `ScoreCollection` 클래스가 `5`와 `7`을 넣었을 때 평균으로 `6`을 반환하는 지 보여줌
```java
@Test
	public void answersArithmeticMeanOfTwoNumbers() {
		ScoreCollection collection = new ScoreCollection();
		collection.add(() -> 5);
		collection.add(() -> 7);

		int actualResult = collection.arithmeticMean();

		assertThat(actualResult, equalTo(6));
	}
```
- 더 많은 숫자나 더 큰 수를 넣어 테스트를 강화할 수도 있지만 그러한 테스트는 `Happy Path` 테스트의 영역에 해당
- 행복 경로 테스트는 중요한 질문에서 한가지 답변을 나타냄
	- `나는 코드가 정상적으로 동작한다면, 그것을 알 수 있을까?`
	- 어떤 작은 부분의 코드에 대해 `Happy Path` 테스트를 할 수 없다면 그 내용을 완전히 이해하지 못한 것
	- 이럴 경우 잠시 추가 개발은 보류하는 것이 좋음
- 단, 모든 질문에 대답할 수 있을 때까지 기다릴 필요는 없음
- 최선의 판단을 하고 나중에 답변이 명확해졌을 때 개선하면 됨
- 단위 테스트는 선택을 문서화함. 어떤 변경이 발생하면 적어도 현재까지 코드가 어떻게 동작했는지는 알게 됨

## Right-[B]ICEP : 경계 조건은 맞는가?
- 생각해야 하는 경계 조건은 다음과 같음
	- 모호하고 일관성 없는 입력 값. 예를 들어 특수 문자가 포함된 파일 이름
	- 잘못된 양식의 데이터. 예를 들어 최상위 도메인이 빠진 이메일 주소(fred@foobar.)
	- 수치적 오버플로우를 일으키는 계산
	- 비거나 빠진 값. 예를 들어 `0`, `0.0`, `""` 혹은 `null`
	- 이성적인 기댓값을 훨씬 벗어나는 값. 예를 들어 150세의 나이
	- 중복을 허용해서는 안 되는 목록에서 중복 값이 있는 경우
	- 정렬이 안된 정렬 리스트 혹은 정렬된 리스트. 정렬 알고리즘에 이미 정렬된 입력 값을 넣는 경우나 정렬 알고리즘에 역순 데이터를 넣는 경우
	- 시간 순이 맞지 않는 경우. 예를 들어 HTTP 서버가 OPTIONS 메서드의 결과를 POST 메서드보다 먼저 반환해야 하지만 그 후에 반환하는 경우
- 1장의 `ScoreCollection` 클래스의 코드는 문제가 없어 보임
```java
public class ScoreCollection {
	private List<Scoreable> scores = new ArrayList<>();

	public void add(Scoreable scoreable) {
		scores.add(scoreable);
	}

	public int arithmeticMean() {
		int total = scores.stream().mapToInt(Scoreable::getScore).sum();
		return total / scores.size();
	}
}
```

- 입력된 `Scoreable` 인스턴스는 `null`일 수 있음
```java
@Test(expected = IllegalArgumentException.class)
public void throwsExceptionWhenAddingNull() {
	collection.add(null);
}
```

- `arithmeticMean()` 메서드에서는 `NullPointerException`이 발생함
- 클라이언트에 유효하지 않은 값을 넣자마자 오류가 발생하도록 하는 것이 좋음. `add()`메서드에 보호절(guard clause)을 넣어 입력 범위를 분명하게 함
```java
public void add(Scoreable scoreable) {
	if (scoreable == null)
		throw new IllegalArgumentException();
	scores.add(scoreable);
}
```

- `ScoreCollection` 객체에 `Scoreable` 인스턴스가 없을 수도 있음
```java
@Test
public void answersZeroWhenNoElementsAdded() {
	assertThat(collection.arithmeticMean(), equalTo(0));
}
```

- 코드는 `0으로 나누기 오류`인 `ArithmeticException`이 발생할 수도 있음
- `arithmeticMean()` 메서드에 있는 보호절은 컬렉션이 비었을 때 0 값을 기대한다고 명시
```java
public int arithmeticMean() {
	if (scores.size() == 0)
		return 0;
	int total = scores.stream().mapToInt(Scoreable::getScore).sum();
	return total / scores.size();
}
```

- 큰 정수 입력을 다룬다면 숫자들의 합이 `Integer.MAX_VALUE`를 초과할 수도 있음
```java
@Test
public void dealsWithIntergerOverflow() {
	collection.add(() -> Integer.MAX_VALUE);
	collection.add(() -> 1);

	assertThat(collection.arithmeticMean(), equalTo(1073741824));
}
```

- 한가지 해결 방법은
```java
public int arithmeticMean() {
	if (scores.size() == 0)
		return 0;
	int total = scores.stream().mapToLong(Scoreable::getScore).sum();
	return (int)(total / scores.size());
}
```

- 클래스 설계시 이러한 오버플로우를 고려할지 여부는 스스로 결정하는 것이지만 외부에 노출되는 API라면 나쁜 데이터에 대한 보호가 필요함
- 보호절을 제거한다면 코드 주석으로 경고할 수 있음
- 더 좋은 방법은 문서화하는 테스트를 추가하는 것
```java
@Test
public void doesNotProperlyHandleIntegerOverflow() {
	collection.add(() -> Integer.MAX_VALUE);
	collection.add(() -> 1);

	assertTrue(collection.arithmeticMean() < 0);
}
```

- 대부분의 시스템에서 검사하지 않은 오버플로우 자체를 허용하고 싶지는 않을 것
- 하지만 발생한다면 예외를 던지는 것이 좋음

## 경계 조건에서는 CORRECT를 기억하라
- CORRECT 약어는 잠재적은 경계 조건을 기억하는 데 도움을 줌
- 각 항목에 대해 유사한 조건을 테스트하려는 메서드에 해당하며, 이 조건을 위반했을 때 어떤 일이 일어날 수 있는 지 고려
  - [C]onformance(준수) : 값이 기대한 양식을 준수하고 있는가?
	- [O]rdering(순서) : 값의 집합이 적절하게 정렬되거나 정렬되지 않았나?
	- [R]ange(범위) : 이성적인 최소값과 최대값 안에 있는가?
	- [R]eference(참조) : 코드 자체에서 통제할 수 없는 어떤 외부 참조를 포함하고 있는가?
	- [E]xistence(존재) : 값이 존재하는 가?
	- [C]ardinality(기수) : 정확히 충분한 값들이 있는가?
	- [T]ime(절대적 혹은 상대적 시간) : 모든 것이 순서대로 일어나는가? 정확한 시간에?

## Right-B[I]CEP : 역 관계를 검사할 수 있는가?
- 때때로 논리적인 역 관계를 적용하여 행동을 검사할 수 있음
- 뉴턴의 알고리즘을 활용하여 제곱근을 구해보자
```java
import static org.hamcrest.MatcherAssert.*;
import static org.hamcrest.number.IsCloseTo.*;
import static java.lang.Math.abs;
import org.junit.jupiter.api.Test;

public class NewtonTest {
	static class Newton {
		private static final double TOLERANCE = 1E-16;

		public static double squareRoot(double n) {
			double approx = n;
			while (abs(approx - n / approx) > TOLERANCE * approx) {
				approx = (n / approx + approx) / 2.0;
			}
			return approx;
		}
	}

	@Test
	public void squareRoot() {
		double result = Newton.squareRoot(250.0);
		assertThat(result * result, closeTo(250.0, Newton.TOLERANCE));
	}
}
```

- 테스트에서는 250을 인자로 `Newton.squareRoot()`메서드를 호출하여 `result`변수에 저장
- `assert`에서는 `result`값을 제공하여 원래의 250에 충분히 가까운지 검사

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
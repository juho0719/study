# Environment
- applicationContext가 BeanFactory 역할만 하는 것은 아님
- 다른 것 중 하나가 EnvironmentCapable
- Environment는 프로파일과 프로퍼티를 다루는 인터페이스

- ApplicationContext extends EnvironmentCapable
  - getEnvironment()
- 프로파일
  - 빈들의 그룹
  - Environment의 역할은 활성화할 프로파일 확인 및 설정 

- 프로파일 유스케이스
  - 테스트환경에서는 A라는 빈을 사용하고, 배포 환경에서는 B라는 빈을 쓰고싶을 때
  - 이 빈은 모니터링 용도니 테스트할 때는 필요없고 배포할 때만 필요한 경우 

- 프로파일 정의하기
  - 클래스에 정의
    - @Configuration @Pofile("test")
    - @Component @Profile("test")
  - 메소드에 정의
    - @Bean @Profile("test")

- 프로파일 설정하기
  - -Dspring.profiles.active="test"
  - @ActiveProfiles (테스트용)

- 프로파일 표현식
  - ! (not)
  - & (and)
  - | (or)
  
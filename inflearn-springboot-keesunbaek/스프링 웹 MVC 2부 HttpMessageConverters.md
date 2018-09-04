# 스프링 MVC 웹 2부 HttpMessageConverters



HTTP 요청 본문을 객체로 변경하거나, 객체를 HTTP 응답 본문으로 변경할 때 사용

{"username": "juho", "password": "123"} <-> User

- @RequestBody

- @ResponseBody (@RestController의 경우 @ResponseBody 생략 가능)



UserController.java

```java
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @GetMapping("/hello")
    public String hello() {
        return "hello";
    }

    @PostMapping("/users/create")
    public @ResponseBody User create(@RequestBody User user) {
        return user;
    }
}
```



UserControllerTest.java

```java
@RunWith(SpringRunner.class)
@WebMvcTest(UserController.class)
public class UserControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    public void hello() throws Exception {
        mockMvc.perform(get("/hello"))
                .andExpect(status().isOk())
                .andExpect(content().string("hello"));
    }

    @Test
    public void createUser_JSON() throws Exception {
        String userJson = "{\"username\":\"juho\", \"password\":\"123\"}";
        mockMvc.perform(post("/users/create")
                    .contentType(MediaType.APPLICATION_JSON_UTF8)
                    .accept(MediaType.APPLICATION_JSON_UTF8)
                    .content(userJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is(equalTo("juho"))))
                .andExpect(jsonPath("$.password", is(equalTo("123"))));
    }

}
```


package com.example.vscode.test.vscodetest;

import static org.hamcrest.CoreMatchers.*;
import static org.hamcrest.MatcherAssert.*;
import static org.hamcrest.number.IsCloseTo.*;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import java.util.*;

public class AssertTest {
	@Test
	public void test() {
		Account account = new Account("my big fat acct");

		assertThat(account.getBalance(), equalTo(100));

		account.deposit(50);
		assertThat(account.getBalance() > 0, is(true)); // is메소드는 아무것도 안함. 가독성을 높여줌

		assertThat(account.getName(), startsWith("xyz"));

		assertThat(new String[] { "a", "b", "c" }, equalTo(new String[] { "a", "b" }));

		assertThat(Arrays.asList(new String[] { "a" }), equalTo(Arrays.asList(new String[] { "a", "ab" })));

		assertThat(new String[] { "a", "b" }, equalTo(new String[] { "a", "b" }));

		assertThat(Arrays.asList(new String[] { "a" }), equalTo(Arrays.asList(new String[] { "a" })));

		assertThat(account.getName(), is(equalTo("my big fat acct")));

		assertThat(account.getName(), not(equalTo("plunderings")));

		assertThat(account.getName(), is(not(nullValue())));
		assertThat(account.getName(), is(notNullValue())); // 유용하지 않음

		assertThat(account.getName(), equalTo("my big fat acct"));

		assertThat(2.32 * 3, equalTo(6.96)); // 테스트 실패 (소수점 허용오차 적용안됨)
		assertTrue(Math.abs((2.32 * 3) - 6.96) < 0.0005); // 가독성 떨어짐
		assertThat(2.32 * 3, closeTo(6.96, 0.0005)); // closeTo로 표현 가능

	}

	// 예외 처리 1: Annotation
	@Test(expected = InsufficientFundsException.class)
	public void throwsWhenWithdrawingTooMuch() {
		account.withdraw(100);
	}

	// 예외 처리 2: try-catch
	@Test
	public void trycatchWhenWithdrawingTooMuch() {
		try {
			account.withdraw(100);
			fail();
		} catch (InsufficientFundsException expected) {
			assertThat(expected.getMessage(), equalTo("balance only 0"));
		}
	}

	// 예외 처리 3: ExpectedException
	@Rule
	public ExpectedException thrown = ExpectedException.none();

	@Test
	public void expectedExceptionWhenWithdrawingTooMuch() {
		thrown.expect(InsufficientFundsException.class);
		thrown.expectMessage("balance only 0");

		account.withdraw(100);
	}
}
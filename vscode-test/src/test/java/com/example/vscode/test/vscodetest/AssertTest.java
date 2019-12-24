package com.example.vscode.test.vscodetest;

import static org.hamcrest.CoreMatchers.*;
import static org.hamcrest.MatcherAssert.*;

import org.junit.jupiter.api.Test;

public class AssertTest {
	@Test
	public void test() {
		Account account = new Account("my big fat acct");

		assertThat(account.getBalance(), equalTo(100));

		account.deposit(50);
		assertThat(account.getBalance() > 0, is(true)); // is메소드는 아무것도 안함. 가독성을 높여줌

		assertThat(account.getName(), startsWith("xyz"));

		assertThat(new String[] { "a", "b", "c" }, equalTo(new string[] { "a", "b" }));

		assertThat(Arrays.asList(new String[] { "a" }), equalTo(Arrays.asList(new String[] { "a", "ab" })));

		assertThat(new String[] { "a", "b" }, equalTo(new String[] { "a", "b" }));

		assertThat(Arrays.asList(new String[] { "a" }), equalTo(Arrays.asList(new String[] { "a" })));

		assertThat(account.getName(), is(equalTo("my big fat acct")));

		assertThat(account.getName(), not(equalTo("plunderings")));

		assertThat(account.getName(), is(not(nullValue())));
		assertThat(account.getName(), is(notNullValue())); // 유용하지 않음

		assertThat(account.getName(), equalTo("my big fat acct"));
	}
}
package com.example.vscode.test.vscodetest;

import static org.hamcrest.CoreMatchers.*;
import static org.hamcrest.MatcherAssert.*;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

public class ScoreCollectionTest {

	@Test
	public void answersArithmeticMeanOfTwoNumbers() {
		ScoreCollection collection = new ScoreCollection();
		collection.add(() -> 5);
		collection.add(() -> 7);

		int actualResult = collection.arithmeticMean();

		assertThat(actualResult, equalTo(6));
	}

	@Test(expected = IllegalArgumentException.class)
	public void throwsExceptionWhenAddingNull() {
		collection.add(null);
	}

	@Test
	public void answersZeroWhenNoElementsAdded() {
		assertThat(collection.arithmeticMean(), equalTo(0));
	}

	@Test
	public void dealsWithIntergerOverflow() {
		collection.add(() -> Integer.MAX_VALUE);
		collection.add(() -> 1);

		assertThat(collection.arithmeticMean(), equalTo(1073741824));
	}

	@Test
	public void doesNotProperlyHandleIntegerOverflow() {
		collection.add(() -> Integer.MAX_VALUE);
		collection.add(() -> 1);

		assertTrue(collection.arithmeticMean() < 0);
	}
}
package com.example.vscode.test.vscodetest;

import static org.hamcrest.MatcherAssert.*;
import static org.hamcrest.number.IsCloseTo.*;

import org.junit.jupiter.api.Test;

import static java.lang.Math.abs;

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
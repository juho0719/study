package com.juho.restapiexam.events;


import junitparams.JUnitParamsRunner;
import junitparams.Parameters;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.TestExecutionListeners;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(JUnitParamsRunner.class)
public class EventTest {

    @Test
    public void builder() {
        Event event = Event.builder()
                .name("Inflearn Spring REST API")
                .description("REST API description")
                .build();

        assertThat(event).isNotNull();
    }

    @Test
    public void javaBean() {
        // Given
        String name= "Event";
        String description = "Spring";

        // When
        Event event = new Event();
        event.setName(name);
        event.setDescription(description);

        // Then
        assertThat(event.getName()).isEqualTo(name);
        assertThat(event.getDescription()).isEqualTo(description);
    }

    // parametersFor테스트메소드명 하면 해당 테스트에 자동으로 파라미터로 들어감
    // 아님 명시적으로 @Parameters(method = "파라미터메소드명")와 같이 작성해야 함
    private Object[] parametersForTestFree() {
        return new Object[][] {
            new Object[] {0, 0, true},
            new Object[] {100, 0, false},
            new Object[] {0, 100, false},
            new Object[] {100, 100, false}
        };
    }
    @Test
    @Parameters
    public void testFree(int basePrice, int maxPrice, boolean isFree) {
        // Given
        Event event = Event.builder()
                .basePrice(basePrice)
                .maxPrice(maxPrice)
                .build();

        // When
        event.update();

        // Then
        assertThat(event.isFree()).isEqualTo(isFree);
    }

    private Object[] parametersForTestOffline() {
        return new Object[][] {
            new Object[] {"강남", true},
            new Object[] {null, false},
            new Object[] {"   ", false}
        };
    }

    @Test
    @Parameters
    public void testOffline(String location, boolean isLocation) {
        // Given
        Event event = Event.builder()
                .location(location)
                .build();

        // When
        event.update();

        // Then
        assertThat(event.isOffline()).isEqualTo(isLocation);
    }
}
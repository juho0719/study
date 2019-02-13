package com.juho.restapiexam.events;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

import java.time.LocalDateTime;

@Component
public class EventValidator {

    public void validate(EventDto eventDto, Errors errors) {
        if(eventDto.getBasePrice() > eventDto.getMaxPrice() && eventDto.getMaxPrice() != 0) {
            errors.reject("wrongPrices", "Values of prices are wrong");
        }

        LocalDateTime endEventDateTime = eventDto.getEndEventDateTime();
        if(endEventDateTime.isBefore(eventDto.getBeginEventDateTime()) ||
            endEventDateTime.isBefore(eventDto.getCloseEnrollmentDateTime()) ||
            endEventDateTime.isBefore(eventDto.getBeginEnrollmentDateTime())) {

            errors.rejectValue("endEventDateTime", "wrongValue", "EndEventDateTime is wrong.");
        }

        LocalDateTime beginEventDateTime = eventDto.getBeginEventDateTime();
        if(beginEventDateTime.isAfter(eventDto.getEndEventDateTime()) ||
                beginEventDateTime.isBefore(eventDto.getCloseEnrollmentDateTime()) ||
                beginEventDateTime.isBefore(eventDto.getBeginEnrollmentDateTime())) {

            errors.rejectValue("beginEventDateTime", "wrongValue", "BeginEventDateTime is wrong.");
        }

        LocalDateTime closeEnrollmentDateTime = eventDto.getCloseEnrollmentDateTime();
        if(closeEnrollmentDateTime.isAfter(eventDto.getBeginEventDateTime()) ||
                closeEnrollmentDateTime.isAfter(eventDto.getEndEventDateTime()) ||
                closeEnrollmentDateTime.isBefore(eventDto.getBeginEnrollmentDateTime())) {

            errors.rejectValue("closeEnrollmentDateTime", "wrongValue", "CloseEnrollmentDateTime is wrong.");
        }

        LocalDateTime beginEnrollmentDateTime = eventDto.getBeginEnrollmentDateTime();
        if(beginEnrollmentDateTime.isAfter(eventDto.getBeginEventDateTime()) ||
                beginEnrollmentDateTime.isAfter(eventDto.getEndEventDateTime()) ||
                beginEnrollmentDateTime.isAfter(eventDto.getCloseEnrollmentDateTime())) {

            errors.rejectValue("beginEnrollmentDateTime", "wrongValue", "BeginEnrollmentDateTime is wrong.");
        }
    }
}

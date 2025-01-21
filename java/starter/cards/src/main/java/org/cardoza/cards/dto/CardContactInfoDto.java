package org.cardoza.cards.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;
import java.util.Map;

//@ConfigurationProperties(prefix = "cards")
//public record CardContactInfoDto(String message, Map<String,String> contactDetails, List<String> onCallSupport) {
//
//}

@ConfigurationProperties(prefix = "cards")
@Getter
@Setter
public class CardContactInfoDto{

    String message;

    Map<String,String> contactDetails;

    List<String> onCallSupport;

}

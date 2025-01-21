package org.cardoza.account.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;
import java.util.Map;

//@ConfigurationProperties(prefix = "accounts")
//public record AccountContactInfoDto(String message, Map<String,String> contactDetails, List<String> onCallSupport) {
//
//}

@ConfigurationProperties(prefix = "accounts")
@Getter @Setter
public class AccountContactInfoDto{

    String message;

    Map<String,String> contactDetails;

    List<String> onCallSupport;

}

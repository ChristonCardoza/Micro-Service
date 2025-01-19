package org.cardoza.account;

import io.swagger.v3.oas.annotations.ExternalDocumentation;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditAwareImpl")
@OpenAPIDefinition(info = @Info(
        title = "Account microservice REST API Documentation",
        description = "CardoBank Account microservice REST API Documentation",
        version = "v1",
        contact = @Contact(
                name = "Christon Cardoza",
                email = "generatltest96@gmail.com",
                url = "https://cardoza.in"
        ),
        license = @License(
                name = "Appache 2.0",
                url = "https://cardoza.in"
        )),
        externalDocs = @ExternalDocumentation(
                description = "CardoBank Accounts microservice REST API Documentation",
                url = "https://cardoza.in/swagger-ui.html"
        )
)
public class AccountApplication {

    public static void main(String[] args) {
        SpringApplication.run(AccountApplication.class, args);
    }

}

package org.cardoza.loans;

import io.swagger.v3.oas.annotations.ExternalDocumentation;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import org.cardoza.loans.dto.LoanContactInfoDto;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableDiscoveryClient
/*@ComponentScans({ @ComponentScan("org.cardoza.loans.controller") })
@EnableJpaRepositories("org.cardoza.loans.repository")
@EntityScan("org.cardoza.loans.model")*/
@EnableJpaAuditing(auditorAwareRef = "auditAwareImpl")
@EnableConfigurationProperties(value = {LoanContactInfoDto.class})
@OpenAPIDefinition(
		info = @Info(
				title = "Loans microservice REST API Documentation",
				description = "CardoBank Loans microservice REST API Documentation",
				version = "v1",
				contact = @Contact(
						name = "Christon Cardoza",
						email = "generaltest96@gmail.com",
						url = "https://cardoza.in"
				),
				license = @License(
						name = "Apache 2.0",
						url = "https://cardoza.in"
				)
		),
		externalDocs = @ExternalDocumentation(
				description = "Cardo Bank Loans microservice REST API Documentation",
				url = "https://cardoza.in/swagger-ui.html"
		)
)
public class LoansApplication {

	public static void main(String[] args) {
		SpringApplication.run(LoansApplication.class, args);
	}
}

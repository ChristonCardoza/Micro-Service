package org.cardoza.gatewayserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;

@SpringBootApplication
public class GatewayserverApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayserverApplication.class, args);
	}

	@Bean
	public RouteLocator cardoBankRouteConfig(RouteLocatorBuilder builder) {
		return builder.routes()
				.route(p ->
						p.path("/cardobank/accounts/**")
								.filters(f -> f.rewritePath("/cardobank/accounts/(?<segment>.*)", "/${segment}")
										.addResponseHeader("X-Response-Time", LocalDateTime.now().toString()))
								.uri("lb://ACCOUNTS"))
				.route(p ->
						p.path("/cardobank/loans/**")
								.filters(f -> f.rewritePath("/cardobank/loans/(?<segment>.*)", "/${segment}")
										.addResponseHeader("X-Response-Time", LocalDateTime.now().toString()))
								.uri("lb://LOANS"))
				.route(p ->
						p.path("/cardobank/cards/**")
								.filters(f -> f.rewritePath("/cardobank/cards/(?<segment>.*)", "/${segment}")
										.addResponseHeader("X-Response-Time", LocalDateTime.now().toString()))
								.uri("lb://CARDS"))
				.build();
	}

}

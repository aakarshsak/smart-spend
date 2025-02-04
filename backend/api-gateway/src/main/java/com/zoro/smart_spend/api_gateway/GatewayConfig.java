package com.zoro.smart_spend.api_gateway;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator routeLocator(RouteLocatorBuilder locatorBuilder) {
        return locatorBuilder
                .routes()
                .route(p -> p.path("/api/user-profile/**")
                        .filters(f -> f
                                .rewritePath("/api/user-profile/(?<segment>.*)", "/${segment}"))
                        .uri("lb://USER-PROFILE"))
                .route(p -> p.path("/api/expense-management/**")
                        .filters(f -> f
                                .rewritePath("/api/expense-management/(?<segment>.*)", "/${segment}"))
                        .uri("lb://expense-management"))
                .build();
    }
}

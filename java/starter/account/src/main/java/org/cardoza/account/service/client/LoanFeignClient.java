package org.cardoza.account.service.client;

import org.cardoza.account.dto.LoansDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name="loans", fallback = LoansFallback.class)
public interface LoanFeignClient {

    @GetMapping("/api/fetch")
    ResponseEntity<LoansDto> fetchLoanDetails(@RequestHeader("cardobank-correlation-id") String correlationId, @RequestParam String mobileNumber);
}

package org.cardoza.account.service.impl;

import lombok.AllArgsConstructor;
import org.cardoza.account.dto.*;
import org.cardoza.account.entity.Accounts;
import org.cardoza.account.entity.Customer;
import org.cardoza.account.exception.ResourceNotFoundException;
import org.cardoza.account.mapper.AccountMapper;
import org.cardoza.account.mapper.CustomerMapper;
import org.cardoza.account.respository.AccountsRepository;
import org.cardoza.account.respository.CustomerRepository;
import org.cardoza.account.service.ICustomersService;
import org.cardoza.account.service.client.CardsFeignClient;
import org.cardoza.account.service.client.LoanFeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CustomerServiceImpl implements ICustomersService {

    private AccountsRepository accountsRepository;
    private CustomerRepository customerRepository;
    private CardsFeignClient cardsFeignClient;
    private LoanFeignClient loanFeignClient;
    /**
     * @param mobileNumber - Input Mobile Number
     * @return Customer details based on given mobile number
     */
    @Override
    public CustomerDetailsDto fetchCustomerDetails(String mobileNumber, String correlationId) {

        Customer customer = customerRepository.findByMobileNumber(mobileNumber).orElseThrow(
                () -> new ResourceNotFoundException("Customer", "mobileNumber", mobileNumber));

        Accounts accounts = accountsRepository.findByCustomerId(customer.getCustomerId()).orElseThrow(
                () -> new ResourceNotFoundException("Account", "customerId", customer.getCustomerId().toString()));

        CustomerDetailsDto customerDetailsDto = CustomerMapper.mapToCustomerDetailsDto(customer, new CustomerDetailsDto());
        customerDetailsDto.setAccountsDto(AccountMapper.mapToAccountsDto(accounts, new AccountsDto()));

        ResponseEntity<LoansDto> loansDtoResponseEntity = loanFeignClient.fetchLoanDetails(correlationId, mobileNumber);
        customerDetailsDto.setLoansDto(loansDtoResponseEntity.getBody());

        ResponseEntity<CardsDto> cardsDtoResponseEntity = cardsFeignClient.fetchCardDetails(correlationId, mobileNumber);
        customerDetailsDto.setCardsDto(cardsDtoResponseEntity.getBody());

        return customerDetailsDto;
    }
}

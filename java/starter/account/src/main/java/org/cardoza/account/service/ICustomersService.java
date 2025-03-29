package org.cardoza.account.service;

import org.cardoza.account.dto.CustomerDetailsDto;

public interface ICustomersService {

    /**
     *
     * @param mobileNumber - Input Mobile Number
     * @return Customer details based on given mobile number
     */

    CustomerDetailsDto fetchCustomerDetails(String mobileNumber);
}

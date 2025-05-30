package org.cardoza.account.service;

import org.cardoza.account.dto.CustomerDto;

public interface IAccountService {

    /**
     *
     * @param customerDto - CustomerDto object
     */
    void createAccount(CustomerDto customerDto);

    /**
     *
     * @param mobileNumber - Input Mobile Number
     * @return Account Details based on a given mobileNumber
     */
    CustomerDto fetchAccount(String mobileNumber);

    /**
     *
     * @param customerDto - CustomerDto Object
     * @return boolean indicating if the update of Account details is successful or not
     */
    boolean updateAccount(CustomerDto customerDto);

    /**
     *
     * @param mobileNumber - Input Mobile Number
     * @return - boolean indicating if the delete of Account details is successful or not
     */
    boolean deleteAccount(String mobileNumber);

    /**
     *
     * @param accountNumber -Long
     * @return boolean indicating if the update of communication status is successful or not
     */
    boolean updateCommunicationStatus(Long accountNumber);
}

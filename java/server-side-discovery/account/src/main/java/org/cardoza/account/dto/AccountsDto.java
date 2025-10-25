package org.cardoza.account.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
@Schema(
        name = "Accounts",
        description = "Schema to hold Account information"
)
public class AccountsDto {

    @NotEmpty(message = "Account Number cannot be a null or empty")
    @Pattern(regexp = "(^$|[0-9]{10})", message = "Account must be 10 digits")
    @Schema(
            description = "Account Number of the customer",
            example = "xxxxxxxxx123"
    )
    private Long accountNumber;

    @Schema(
            description = "Account type of the customer",
            example = "Savings"
    )
    @NotEmpty(message = "Account Type cannot be a null or empty")
    private String accountType;

    @Schema(
            description = "Branch address of the customer",
            example = "xyz, India"
    )
    @NotEmpty(message = "Branch Address cannot be a null or empty")
    private String branchAddress;

}

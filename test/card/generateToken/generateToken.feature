Feature: Generar token
    Scenario Outline: Generar token con filtros no validos
        Given se ingresan los datos de tarjeta <email>, <card_number>, <cvv>, <expiration_year> y <expiration_month>
        When seleccionamos la opción de Generar token
        Then se mostrará el mensaje de validación: <message>
        Examples:
            | email                       | card_number        | cvv     | expiration_year  | expiration_month  | message                                                                        |
            | michael.c.v.m.dev@xxxx.es   | 4111111111111111   | 123     | 2025             | 07                | Error in property email, Email is not provider gmail, hotmail or yahoo         |
            | michael.c.v.m.dev@gmail.com | 41111111111111117  | 123     | 2025             | 07                | Error in property card_number, String must contain at most 16 character(s)     |
            | michael.c.v.m.dev@gmail.com | 4111111111111111   | 12377   | 2025             | 07                | Error in property cvv, String must contain at most 4 character(s)              |
            | michael.c.v.m.dev@gmail.com | 4111111111111111   | 123     | 20257            | 07                | Error in property expiration_year, String must contain exactly 4 character(s)  |
            | michael.c.v.m.dev@gmail.com | 4111111111111111   | 123     | 2025             | 077               | Error in property expiration_month, String must contain at most 2 character(s) |

    Scenario Outline: Generar token con filtros validos
        Given se ingresan los datos de tarjeta <email>, <card_number>, <cvv>, <expiration_year> y <expiration_month>
        When seleccionamos la opción de Generar token
        Then se mostrará el token generado: <token>
        Examples:
            | email                      | card_number       | cvv   | expiration_year | expiration_month | token            |
            | michael.c.v.m.dev@yahoo.es | 4111111111111111  | 123   | 2025            | 07               | ebJKGhb1RbIvwgZf |

    Scenario Outline: Generar token con error
        Given se ingresan los datos de tarjeta <email>, <card_number>, <cvv>, <expiration_year> y <expiration_month>
        When seleccionamos la opción de Generar token
        Then se mostrará el mensaje de error: <message>
        Examples:
            | email                      | card_number       | cvv   | expiration_year | expiration_month | message                                                    |
            | michael.c.v.m.dev@yahoo.es | 4111111111111111  | 123   | 2025            | 07               | Card validation failed: token: Path `token` is required.   |

Feature: Obtener tarjeta
    Scenario Outline: Obtener tarjeta con filtros no validos
        Given se ingresa el <token>
        When seleccionamos la opción de Obtener tarjeta
        Then se mostrará el mensaje de validación: <message>
        Examples:
            | token             | message                                                                  |
            | YL6vAaqKB8HUgRtX7 | Error in property undefined, String must contain exactly 16 character(s) |

    Scenario Outline: Obtener tarjeta con filtros validos
        Given se ingresa el <token>
        When seleccionamos la opción de Obtener tarjeta
        Then se mostrará los datos de la tarjeta: <email>, <card_number>, <expiration_year> y <expiration_month>
        Examples:
            | token            | email                      | card_number       | expiration_year | expiration_month |
            | ebJKGhb1RbIvwgZf | michael.c.v.m.dev@yahoo.es | 4111111111111111  | 2025            | 07               |

    Scenario Outline: Obtener tarjeta con token caducado
        Given se ingresa el <token>
        When seleccionamos la opción de Obtener tarjeta
        Then se mostrará el mensaje de validación: <message>
        Examples:
            | token            | message                                     |
            | ebJKGhb1RbIvwgZf | Card data not available, time expired token |

    Scenario Outline: Obtener tarjeta con error
        Given se ingresa el <token>
        When seleccionamos la opción de Obtener tarjeta
        Then se mostrará el mensaje de error: <message>
        Examples:
            | token            | message      |
            | ebJKGhb1RbIvwgZf | Error expect |

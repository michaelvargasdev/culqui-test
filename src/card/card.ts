export class Card {
  email: string;
  card_number: string;
  cvv?: number;
  expiration_year: string;
  expiration_month: string;
  token?: string;
  millis?: number;

  constructor(
    email: string, card_number: string, expiration_year: string, expiration_month: string, cvv?: number, token?: string, millis?: number
  ) {
    this.email = email;
    this.card_number = card_number;
    this.cvv = cvv;
    this.expiration_year = expiration_year;
    this.expiration_month = expiration_month;
    this.token = token;
    this.millis = millis;
  }
}

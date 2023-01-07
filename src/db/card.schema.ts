import { Schema, model, Model } from "mongoose";

interface ICard {
  email: string;
  card_number: string;
  cvv: number;
  expiration_year: string;
  expiration_month: string;
  token: string;
  millis: number;
}

const cardSchema: Schema<ICard> = new Schema<ICard>({
  email: { type: String, required: true },
  card_number: { type: String, required: true },
  cvv: { type: Number, required: true },
  expiration_year: { type: String, required: true },
  expiration_month: { type: String, required: true },
  token: { type: String, required: true },
  millis: { type: Number, required: true },
});

export const CardModel: Model<ICard> = model<ICard>("Card", cardSchema);

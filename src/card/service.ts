import { APIGatewayProxyResult } from "aws-lambda";
import { CardModel } from "../db";
import { generateRandomString } from "../utils/methods";
import { MessageUtil } from "../utils/response";
import { Card } from "./card";

export const getCardService = async (token: string): Promise<APIGatewayProxyResult> => {
  try {
    const data: any = await CardModel.findOne({ token }, {
      _id: 0,
      email: 1,
      card_number: 1,
      expiration_year: 1,
      expiration_month: 1,
      millis: 1
    });
    const millisNow: number = new Date().getTime();
    const millisDiff: number = millisNow - data.millis;
    if (millisDiff > 900000) {
      return MessageUtil.forbidden("Card data not available, time expired token");
    }
    const card: Card = new Card(
      data.email, data.card_number, data.expiration_year, data.expiration_month
    );
    return MessageUtil.success(card);
  } catch (error) {
    throw error;
  }
};

export const generateTokenService = async (data: any): Promise<APIGatewayProxyResult> => {
  try {
    const token: string = generateRandomString(16);
    const card: Card = new Card(
      data.email, data.card_number, data.expiration_year, data.expiration_month, data.cvv, token, new Date().getTime()
    );
    const cardModel: any = new CardModel(card);
    await CardModel.create(cardModel);
    return MessageUtil.success({
      token
    });
  } catch (error) {
    throw error;
  }
};

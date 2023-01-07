import { APIGatewayProxyResult } from "aws-lambda";
import { Card } from "./card";
import { getCardService, generateTokenService } from "./service";

export const getCardController = async (token: string): Promise<APIGatewayProxyResult> => {
  try {
    return await getCardService(token);
  } catch (error) {
    throw error;
  }
};

export const generateTokenController = async (card: Card): Promise<APIGatewayProxyResult> => {
  try {
    return await generateTokenService(card);
  } catch (error) {
    throw error;
  }
};

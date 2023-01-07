import { APIGatewayProxyEvent, APIGatewayProxyResult, } from "aws-lambda";
import { ZodError } from "zod";
import { tokenValidation, cardValidation } from "./validation";
import { getCardController, generateTokenController } from "./controller";
import { MessageUtil } from "../utils/response";

export const getCard = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const pathParameters: any = event.pathParameters;
    const { token } = pathParameters;
    await tokenValidation(token);
    return await getCardController(token);
  } catch (error: any) {
    if (error instanceof ZodError) { return MessageUtil.badRequest(error.message); }
    return MessageUtil.error(error.message);
  }
};

export const generateToken = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const bodyString: any = event.body;
    const body: any = JSON.parse(bodyString);
    await cardValidation(body);
    return await generateTokenController(body);
  } catch (error: any) {
    if (error instanceof ZodError) { return MessageUtil.badRequest(error.message); }
    return MessageUtil.error(error.message);
  }
};

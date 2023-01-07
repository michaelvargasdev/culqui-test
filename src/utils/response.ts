import { APIGatewayProxyResult, } from "aws-lambda";
import { StatusCode } from "./contants";

class Result {
  private statusCode: number;
  private message: string;
  private data?: object;

  constructor(statusCode: number, message: string, data?: object ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  bodyToString (): APIGatewayProxyResult {
    return {
      statusCode: this.statusCode,
      body: JSON.stringify({
        message: this.message,
        data: this.data,
      }),
    };
  }
}

export class MessageUtil {
  static success(data: object): APIGatewayProxyResult {
    const result: Result = new Result(StatusCode.success, "success", data);
    return result.bodyToString();
  }

  static error(message: string): APIGatewayProxyResult  {
    const result: Result = new Result(StatusCode.error, message);
    return result.bodyToString();
  }

  static badRequest(data: string): APIGatewayProxyResult  {
    const messageArr: Array<object> = JSON.parse(data);
    const validaions: Array<string> = messageArr.map((msg: any) => (`Error in property ${msg.path[0]}, ${msg.message}`));
    const result: Result = new Result(StatusCode.badRequest, "Bad Equest", validaions);
    return result.bodyToString();
  }

  static forbidden(message: string): APIGatewayProxyResult  {
    const result: Result = new Result(StatusCode.forbidden, message);
    return result.bodyToString();
  }
}

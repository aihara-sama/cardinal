import { HttpException } from '@nestjs/common';
import { getReasonPhrase, ReasonPhrases, StatusCodes } from 'http-status-codes';
export interface ErrorMessages {
  [s: string]: string;
}

export class CustomException extends HttpException {
  constructor(public readonly messages: ErrorMessages, statusCode = 500) {
    super(
      {
        messages,
        statusCode,
        error: getReasonPhrase(statusCode),
      },
      statusCode,
    );
  }
}

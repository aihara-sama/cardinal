// import {
//   ExceptionFilter,
//   Catch,
//   ArgumentsHost,
//   BadRequestException,
//   HttpException,
// } from '@nestjs/common';
// import { Response } from 'express';
// import { ValidationException } from '../exceptions/validation.exception';

// @Catch(BadRequestException)
// export class ValidationExceptionFilter implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     // console.log({exception});
//     except
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>() as Response;
//     const status = exception.getStatus();

//     response.status(status).json({
//       messages: exception.validationErrors,
//       error: exception.message,
//       statusCode: status,
//     });
//   }
// }

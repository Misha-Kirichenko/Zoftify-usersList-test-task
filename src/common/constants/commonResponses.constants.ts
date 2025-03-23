import {
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { HTTP_ERROR_MSG } from './messages.constants';

export const COMMON_RESPONSES = [
  ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        message: HTTP_ERROR_MSG.UNCATEGORIZED,
        statusCode: 400,
      },
      description: 'Unexpected error',
    },
  }),
  ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: HTTP_ERROR_MSG.CREDENTIALS,
        statusCode: 401,
      },
      description: 'Unauthorized error',
    },
  })
];
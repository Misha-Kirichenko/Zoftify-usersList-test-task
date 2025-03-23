import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TOKENS_PAIR } from '../example';

export const REFRESH_DECORATORS = [
  ApiBearerAuth(),
  ApiOkResponse({
    schema: {
      example: TOKENS_PAIR,
    },
  }),
  ApiUnauthorizedResponse({
    schema: {
      example: {
        schema: {
          type: 'object',
          example: {
            error: 'Unauthorized',
            statusCode: 401,
          },
          description: 'Unauthorized error',
        },
      },
    },
  }),
];

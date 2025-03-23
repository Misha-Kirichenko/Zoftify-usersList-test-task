import { ApiCreatedResponse } from '@nestjs/swagger';
import { TOKENS_PAIR } from '../example';
import { COMMON_RESPONSES } from 'src/common/constants';

export const LOGIN_DECORATORS = [
  ApiCreatedResponse({
    schema: {
      example: TOKENS_PAIR,
    },
  }),
  ...COMMON_RESPONSES
];

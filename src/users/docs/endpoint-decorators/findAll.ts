import {
  ApiBearerAuth,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ALL_USERS } from '../examples';
import { COMMON_RESPONSES } from 'src/common/constants';

export const FIND_ALL = [
  ApiBearerAuth(),
  ApiOkResponse({
    schema: {
      example: ALL_USERS,
    },
  }),
  ...COMMON_RESPONSES
];

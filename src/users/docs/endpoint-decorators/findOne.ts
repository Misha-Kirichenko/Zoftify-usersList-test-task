import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ALL_USERS } from '../examples';
import { COMMON_RESPONSES } from 'src/common/constants';
import { HTTP_MSG_UTIL } from 'src/common/utils';

export const FIND_ONE = [
  ApiBearerAuth(),
  ApiOkResponse({
    schema: {
      example: ALL_USERS.data[0],
    },
  }),
  ...COMMON_RESPONSES,
  ApiNotFoundResponse({
    schema: {
      example: {
        statusCode: 404,
        message: HTTP_MSG_UTIL.ERRORS.notFound("User")
      }
    }
  }),
];

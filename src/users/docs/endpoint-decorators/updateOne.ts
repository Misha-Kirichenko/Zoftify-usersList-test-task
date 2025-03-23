import {
    ApiBearerAuth,
    ApiConflictResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
} from '@nestjs/swagger';
import { COMMON_RESPONSES, HTTP_ERROR_MSG } from 'src/common/constants';
import { HTTP_MSG_UTIL } from 'src/common/utils';

export const UPDATE_ONE = [
    ApiBearerAuth(),
    ApiOkResponse({
        schema: {
            example: {
                message: HTTP_MSG_UTIL.SUCCESS.updated("User")
            },
        },
    }),
    ...COMMON_RESPONSES,
    ApiForbiddenResponse({
        schema: {
            example: {
                statusCode: 403,
                message: HTTP_ERROR_MSG.FORBIDDEN
            }
        }
    }),
    ApiNotFoundResponse({
        schema: {
            example: { statusCode: 404, message: HTTP_MSG_UTIL.ERRORS.notFound("User") }
        }
    }),
    ApiConflictResponse({
        schema: {
            example: { statusCode: 409, message: HTTP_ERROR_MSG.EMAIL_EXISTS }
        }
    }),
];

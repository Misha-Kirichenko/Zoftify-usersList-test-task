import {
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
} from '@nestjs/swagger';
import { COMMON_RESPONSES, HTTP_ERROR_MSG } from 'src/common/constants';
import { HTTP_MSG_UTIL } from 'src/common/utils';

export const DELETE_ONE = [
    ApiBearerAuth(),
    ApiOkResponse({
        schema: {
            example: {
                message: HTTP_MSG_UTIL.SUCCESS.deleted("User")
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
];

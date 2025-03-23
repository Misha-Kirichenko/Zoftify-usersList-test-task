export const HTTP_MSG_UTIL = {
    ERRORS: {
        notFound: (data: string): string => `${data} was not found`,
    },
    SUCCESS: {
        deleted: (data: string): string => `${data.endsWith("s") ? `${data} were` : `${data} was`} successfully deleted`,
        updated: (data: string): string => `${data} was succesffully updated`,
        created: (data: string): string => `${data} was successfully created`
    }
}
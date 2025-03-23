export const SWAGGER_DESC = `
  API for CRUDs on users.
  
  **Error Responses:**
  - In production mode, error responses are simplified.
  - In development mode, additional fields like \`timestamp\`, \`path\` and \`stack\` are included for debugging purposes.
  
  **Error Response Example in Development Mode:**
  
  \`\`\`json
  {
    "statusCode": 404,
    "timestamp": 1742728754462,
    "path": "/users/10",
    "message": "User was not found",
    "stack": "NotFoundException: User was not found\\n    at UsersService.findOne (/app/src/users/users.service.ts:47:19)\\n    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)"
  }
  \`\`\`
`;

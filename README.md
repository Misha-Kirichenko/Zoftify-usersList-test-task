[Task description](https://github.com/Misha-Kirichenko/Zoftify-usersList-test-task/tree/main/task-README)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Misha-Kirichenko/Zoftify-usersList-test-task.git
cd Zoftify-usersList-test-task
```

### 2. Set environment

1. Rename the file `example.env` to `.env` in the root directory of the project.

2. Open the `.env` file and ensure that all the environment variables are set correctly

### 3. Run container

```bash
docker compose up --build
```

### 4. Open api documentation (Swagger)

_Open `http://localhost:3000/api`_ in browser  
(_Note: `3000` is just an example, make sure to replace it with the value of `API_PORT` from your `.env` file._)

## Notes

- **Do not** change **NODE_ENV** value to **production** if you want use api documentation. Swagger is off in **production** mode. Errors output is also simplified in **production** mode
- **Do not** change the values of **POSTGRES_HOST** and **POSTGRES_DB** in your `.env` file,  
  because the container volume and services in the `docker-compose.yml` file depend on them,  
  and they cannot be dynamic. However, they are included in the `.env` file because they are  
  required for database connections within the application
- Set **PASSWORD_SALT_ROUNDS** as integer number
- **ACCESS_TOKEN_EXPIRE_TIME / REFRESH_TOKEN_EXPIRE_TIME** format: _1h | 300s | 300000ms_

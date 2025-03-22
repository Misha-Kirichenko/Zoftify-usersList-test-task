import * as bcrypt from 'bcrypt';
import { Role } from '../../common/enums';
import { IDatabaseService } from '../interfaces/databaseService.interface';
import { AbsctractDatabaseService } from './abstractDatabase.service';

export class SeederService extends AbsctractDatabaseService implements IDatabaseService {

  public async runAll() {
    try {
      const res = await this.conn.query('SELECT COUNT(*) FROM users');
      const userCount = parseInt(res.rows[0].count);
      if (!userCount) {
        const password = 'Default_123';
        const hashedPassword = await bcrypt.hash(
          password,
          Number(process.env.PASSWORD_SALT),
        );

        const users = [
          { firstName: "John", lastName: "Doe", email: "john.doe@example.com", password: hashedPassword, role: Role.ADMIN },
          { firstName: "Jane", lastName: "Doe", email: "jane.doe@example.com", password: hashedPassword, role: Role.ADMIN }
        ]

        const usersQueryString = users.map(userObj => {
          const values = Object.values(userObj).map(value => `'${value}'`)
          return `(${values.join(",")})`;
        }).join(",");

        await this.conn.query(
          `INSERT INTO users ("firstName", "lastName", email, password, role) VALUES ${usersQueryString}`,
        );

        console.log('User seeder executed successfully');
      } else {
        console.log('Seeder skipped: Test user already exist in the database.');
      }
    } catch (error) {
      throw new Error(error);
    }
  }


  public async execute() {
    try {
      await this.runAll();
    } catch (error) {
      console.log(error);
    } finally {
      await this.conn.end();
    }
  }
}
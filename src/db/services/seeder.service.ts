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
        const salt = await bcrypt.genSalt(Number(process.env.PASSWORD_SALT_ROUNDS));
        const hashedPassword = await bcrypt.hash(
          password,
          salt,
        );

        const users = [
          { firstName: "John", lastName: "Doe", email: "john.doe@example.com", password: hashedPassword, role: Role.ADMIN },
          { firstName: "Jane", lastName: "Doe", email: "jane.doe@example.com", password: hashedPassword, role: Role.ADMIN }
        ]

        const usersQueryString = users.map(userObj => {
          const values = Object.values(userObj).map(value => `'${value}'`)
          return `(${values.join(",")})`;
        }).join(",");

        const { rowCount } = await this.conn.query(
          `INSERT INTO users ("firstName", "lastName", email, password, role) VALUES ${usersQueryString}`,
        );

        if (rowCount) {
          console.log('✅ User seeder executed successfully');
        }

      } else {
        console.log('➡️ Seeder skipped: users already exist in the database.');
      }
    } catch (error) {
      throw new Error(error);
    }
  }


  public async execute() {
    try {
      await this.runAll();
    } catch (error) {
      console.log("❌ Seeding error", error);
    } finally {
      await this.conn.end();
    }
  }
}
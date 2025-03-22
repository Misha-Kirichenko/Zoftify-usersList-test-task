import * as fs from 'fs';
import * as path from 'path';
import { IDatabaseService } from '../interfaces/databaseService.interface';
import { AbsctractDatabaseService } from './abstractDatabase.service';

export class MigrationService extends AbsctractDatabaseService implements IDatabaseService {
  public async runAll() {
    const migrationsPath = path.join(__dirname, '..', 'sql');
    const files = fs
      .readdirSync(migrationsPath)
      .filter((file) => file.endsWith('.sql'));

    for (const file of files) {
      const filePath = path.join(migrationsPath, file);
      const query = fs.readFileSync(filePath, 'utf-8');
      await this.executeCommand(query, file);
    }
  }

  private async executeCommand(query: string, filename: string) {
    try {
      console.log(`Running migration: ${filename}`);
      const { command } = await this.conn.query(query);
      if (command) {
        console.log(`✅ Migration ${filename} executed successfully`);
      }
    } catch (error) {
      throw new Error(`Error executing migration ${filename}:`, error);
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
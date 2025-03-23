import * as fs from 'fs';
import * as path from 'path';
import { IDatabaseService } from '../interfaces/databaseService.interface';
import { AbsctractDatabaseService } from './abstractDatabase.service';

export class MigrationService extends AbsctractDatabaseService implements IDatabaseService {
  public async runAll() {
    const migrationsPath = path.join(__dirname, '..', 'sql', 'migrations');
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
      console.log(`🔃 Running migration: ${filename}`);
      const migrationInfo = await this.conn.query(query);
      if (Array.isArray(migrationInfo)) {
        migrationInfo.forEach((info, index) => {
          if (info.command) {
            console.log(`✅ Migration: "${filename}" part ${index + 1}/${migrationInfo.length} executed successfully`);
          } else {
            console.log(`➡️ Migration: "${filename}" part ${index + 1}/${migrationInfo.length} skipped.`);
          }
        });
      } else {
        if (migrationInfo.command) {
          console.log(`✅ Migration: "${filename}" executed successfully`);
        } else {
          console.log(`➡️ Migration: "${filename}" skipped.`);
        }
      }
    } catch (error) {
      throw new Error(`❌ executing migration "${filename}":`, error);
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
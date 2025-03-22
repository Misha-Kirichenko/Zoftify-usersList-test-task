import { Pool } from 'pg';
import { CONFIG } from '../config';

export abstract class AbsctractDatabaseService {
  protected conn: Pool;
  constructor() {
    this.conn = new Pool(CONFIG);
  }
}
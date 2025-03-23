import { Role } from 'src/common/enums';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeUpdate,
  AfterLoad,
  BeforeInsert
} from 'typeorm';

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  firstName: string;

  @Column({ type: 'varchar', nullable: false })
  lastName: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'int', nullable: false, default: 0 })
  lastLogin: number;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
    nullable: false,
  })
  role: Role;

  /*Escape apostrophs for security reasons*/
  @BeforeInsert()
  @BeforeUpdate()
  escapeApostrophs() {
    this.firstName = this.firstName.replace(/([^\\])'/g, "$1\\'");
    this.lastName = this.lastName.replace(/([^\\])'/g, "$1\\'");
  }

  /* 
  Convert `lastLogin` to seconds before update to save space by storing it as an integer 
  instead of a bigint (using milliseconds as a timestamp can result in a very large number).
*/
  @BeforeUpdate()
  setlastLoginInMillis() {
    if (this.lastLogin > 9999999999) {
      this.lastLogin = Math.floor(this.lastLogin / 1000);
    }
  }

  /* 
  Convert `lastLogin` back to milliseconds after loading from the database to use it in 
  a valid POSIX format for working with JavaScript Date objects (milliseconds).
*/
  @AfterLoad()
  getlastLoginInMillis() {
    this.lastLogin = this.lastLogin * 1000;
  }

  /* 
  Decode escaped apostrophes (e.g., `\'`) back to regular apostrophes (`'`) after loading 
  data from the database.
*/
  @AfterLoad()
  decodeQuotes() {
    this.firstName = this.firstName.replace(/\\'/g, "'");
    this.lastName = this.lastName.replace(/\\'/g, "'");
  }
}
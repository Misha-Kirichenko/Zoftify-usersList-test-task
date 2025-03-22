import { Role } from 'src/common/enums';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeUpdate
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

  @BeforeUpdate()
  setlastLoginInMillis() {
    if (this.lastLogin > 9999999999) {
      this.lastLogin = Math.floor(this.lastLogin / 1000);
    }
  }

  get lastLoginInMillis(): number {
    return this.lastLogin * 1000;
  }
}

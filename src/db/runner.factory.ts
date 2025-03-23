import { ServiceType } from './enums/service.enum';
import { MigrationService } from './services/migration.service';
import { SeederService } from './services/seeder.service';

export class RunnerFactory {
  static async run(type: ServiceType) {
    try {
      let service: MigrationService | SeederService;
      if (type === ServiceType.MIG) {
        service = new MigrationService();
        await service.execute();
        console.log('🏁 Migrations finished');
      } else if (type === ServiceType.SEED) {
        service = new SeederService();
        await service.execute();
        console.log('🏁 Seeding finished');
      }
      process.exit(0);
    } catch (error) {
      console.error(`❌ Error running ${type}s:`, error);
      process.exit(1);
    }
  }
}

import { Module } from '@nestjs/common';
import { AlarmRepository } from '../../../application/ports/alarm.repository';
import { InMemeroyAlarmRepository } from './repositories/alarm.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: AlarmRepository,
      useClass: InMemeroyAlarmRepository, // 💡 This is where we bind the port to an adapter
    },
  ],
  exports: [AlarmRepository],
})
export class InMemoryAlarmPersistenceModule {}

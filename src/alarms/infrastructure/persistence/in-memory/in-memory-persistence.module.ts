import { Module } from '@nestjs/common';
import { CreateAlarmRepository } from '../../../application/ports/create-alarm.repository';
import { InMemeroyAlarmRepository } from './repositories/alarm.repository';
import { FindAlarmsRepository } from '../../../application/ports/find-alarms.repository';
import { UpsertMaterializedAlarmRepository } from '../../../application/ports/upsert-materialized-alarm.repository';

@Module({
  imports: [],
  providers: [
    InMemeroyAlarmRepository,
    {
      provide: CreateAlarmRepository,
      useExisting: InMemeroyAlarmRepository,
    },
    {
      provide: FindAlarmsRepository,
      useExisting: InMemeroyAlarmRepository,
    },
    {
      provide: UpsertMaterializedAlarmRepository,
      useExisting: InMemeroyAlarmRepository,
    },
  ],
  exports: [CreateAlarmRepository, FindAlarmsRepository, UpsertMaterializedAlarmRepository],
})
export class InMemoryAlarmPersistenceModule {}

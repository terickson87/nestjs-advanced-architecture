import { Alarm } from '../../../../domain/alarm';
import { AlarmItem } from '../../../../domain/alarm-item';
import { AlarmSeverity } from '../../../../domain/value-objects/alarm-severity';
import { AlarmItemEntity } from '../entities/alarm-item.entity';
import { AlarmEntity } from '../entities/alarm.entity';

export class AlarmMapper {
  static toDomain(alarmEntity: AlarmEntity): Alarm {
    const alarmSeverity = new AlarmSeverity(alarmEntity.severity as 'critical' | 'low' | 'medium' | 'high');
    const alarmModel = new Alarm(alarmEntity.id);
    alarmModel.name = alarmEntity.name;
    alarmModel.isAcknowledged = alarmEntity.isAcknowledged;
    alarmModel.severity = alarmSeverity;
    alarmModel.triggeredAt = alarmEntity.triggerAt;
    alarmModel.items = alarmEntity.items.map((it) => new AlarmItem(it.id, it.name, it.type));

    return alarmModel;
  }

  static toPersistence(alarm: Alarm) {
    const entity = new AlarmEntity();
    entity.id = alarm.id;
    entity.name = alarm.name;
    entity.severity = alarm.severity.value;
    entity.isAcknowledged = alarm.isAcknowledged;
    entity.triggerAt = alarm.triggeredAt;
    entity.items = alarm.items.map((it) => {
      const itemEntity = new AlarmItemEntity();
      itemEntity.id = it.id;
      itemEntity.name = it.name;
      itemEntity.type = it.type;
      return itemEntity;
    });

    return entity;
  }
}

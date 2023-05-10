import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entity/users.entity';
import { Repository } from 'typeorm';
import { Notifications } from './entity/notifications.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notifications)
    private notificationsRepository: Repository<Notifications>,
  ) {}

  async findOneById(id: Notifications['id']): Promise<Notifications> {
    return await this.notificationsRepository
      .createQueryBuilder('notifications')
      .where('notifications.id = :id', {
        id,
      })
      .getOne();
  }

  async findAllByUser(username: Users['username']): Promise<Notifications[]> {
    return await this.notificationsRepository
      .createQueryBuilder('notifications')
      .where('notifications.created_by = :username', {
        username,
      })
      .getMany();
  }

  async create(notification: Notifications): Promise<Notifications> {
    return await this.notificationsRepository.create(notification);
  }

  async setIsReadToTrue(id: Notifications['id']): Promise<Notifications> {
    const notification = await this.findOneById(id);

    return await this.notificationsRepository.save({
      ...notification,
      is_read: true,
    });
  }

  async delete(id: Notifications['id']): Promise<Notifications> {
    const notification = await this.findOneById(id);

    return await this.notificationsRepository.remove(notification);
  }
}

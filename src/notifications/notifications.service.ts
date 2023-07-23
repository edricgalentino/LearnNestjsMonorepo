import { BadRequestException, Injectable } from '@nestjs/common';
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

  async create(
    username: Users['username'],
    message: string,
    type: 'info' | 'success' | 'error',
  ): Promise<Notifications> {
    return await this.notificationsRepository.create({
      message,
      created_at: new Date(),
      created_by: username,
      is_read: false,
      type,
      updated_at: new Date(),
    });
  }

  async setIsReadToTrue(
    user: Users,
    id: Notifications['id'],
  ): Promise<Notifications> {
    const notification = await this.findOneById(id);
    const errorMessage = `There are something error when you read notification with id ${id}`;
    if (!notification) {
      // create notification
      const newNotification = await this.create(
        user.username,
        errorMessage,
        'error',
      );

      throw new BadRequestException('Notification does not exist');
    }

    if (notification.created_by !== user.username) {
      // create notification
      const newNotification = await this.create(
        user.username,
        errorMessage,
        'error',
      );
      throw new BadRequestException('You cannot read this notification');
    }

    return await this.notificationsRepository.save({
      ...notification,
      is_read: true,
    });
  }

  async delete(user: Users, id: Notifications['id']): Promise<Notifications> {
    const notification = await this.findOneById(id);
    const errorMessage = `There are something error when you read notification with id ${id}`;
    if (!notification) {
      // create notification
      const newNotification = await this.create(
        user.username,
        errorMessage,
        'error',
      );

      throw new BadRequestException('Notification does not exist');
    }

    if (notification.created_by !== user.username) {
      // create notification
      const newNotification = await this.create(
        user.username,
        errorMessage,
        'error',
      );
      throw new BadRequestException('You cannot read this notification');
    }

    return await this.notificationsRepository.remove(notification);
  }
}

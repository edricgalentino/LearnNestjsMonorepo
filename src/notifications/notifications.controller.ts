import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  BadRequestException,
  Param,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Users } from 'src/users/entity/users.entity';
import { Notifications } from './entity/notifications.entity';

@Controller('notification')
export class NotificationsController {
  constructor(private notificationService: NotificationsService) {}

  @Get()
  async getAllNotifications(@CurrentUser() user: Users) {
    return await this.notificationService.findAllByUser(user.username);
  }

  @Post()
  async createNotification(
    @CurrentUser() user: Users,
    notification: Notifications,
  ) {
    return await this.notificationService.create(
      user.username,
      notification.message,
      notification.type,
    );
  }

  @Put(':id')
  async readNotification(@CurrentUser() user: Users, @Param('id') id: number) {
    return await this.notificationService.setIsReadToTrue(user, id);
  }

  @Delete(':id')
  async deleteNotification(
    @CurrentUser() user: Users,
    @Param('id') id: number,
  ) {
    return await this.notificationService.delete(user, id);
  }
}

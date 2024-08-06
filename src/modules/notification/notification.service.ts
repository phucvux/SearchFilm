import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async getNotifications(userId: number) {
    return await this.prisma.notifications.findMany({
      where: { user_id: userId },
    });
  }

  //trigger khi nguoiwf dung an vao xem noti
  async markAsRead(notificationId: number) {
    return await this.prisma.notifications.update({
      where: { notification_id: notificationId },
      data: {
        read: true,
      },
    });
  }

  async deleteNotification(notificationId: number, userId: number) {
    const existedNotification = await this.prisma.notifications.findUnique({
        where: {
            notification_id: notificationId,
            user_id: userId
        }
    })

    if(!existedNotification) {
        throw new HttpException("Resource Not Found", HttpStatus.NOT_FOUND);
    }
    return await this.prisma.notifications.delete({
      where: { notification_id: notificationId, user_id: userId },
    });
  }
}

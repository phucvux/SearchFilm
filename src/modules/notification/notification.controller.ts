import { Body, Controller, Delete, Get, Param, Put, UseFilters } from '@nestjs/common';
import { AllExceptionsFilter } from '../all-exceptions/all-exceptions.filter';
import { NotificationService } from './notification.service';

@Controller('notifications')
@UseFilters(AllExceptionsFilter)
export class NotificationController {
    constructor (private readonly notificationService: NotificationService){}

    @Get()
    async getNotifications () {
        const userId = 2; //thay sau
        const noti = await this.notificationService.getNotifications(+userId);
        return noti;
    }

    @Put(':id')
    async markNotificationAsRead (@Param('id') notificationId: string) {
        const markRead = await this.notificationService.markAsRead(+notificationId);
        return markRead;
    }

    @Delete(':id')
    async removeNotification (@Param('id') notificationId: string) {
        const userId = 2;   //thay sau
        const delNotification = await this.notificationService.deleteNotification(+notificationId, +userId);
        return delNotification;
    }
}

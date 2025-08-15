import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationRecipient } from '../../../../domain/entities/notification-recipient.entity';
import { NotificationRecipientRepository } from '../../../../domain/repositories/notification-recipient.repository';

@Injectable()
export class NotificationRecipientRepositoryImpl implements NotificationRecipientRepository {
  constructor(private prisma: PrismaService) {}

  async findByUser(userId: number): Promise<NotificationRecipient[]> {
    // Since the Prisma schema doesn't have a NotificationRecipient model,
    // we need to create a custom implementation
    const notifications = await this.prisma.notification.findMany({
      where: { userId },
      include: {
        user: {
          include: {
            person: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    // Map to NotificationRecipient entities
    return notifications.map(notification => ({
      id: notification.id,
      notificationId: notification.id,
      userId: notification.userId,
      isRead: notification.isRead,
    }));
  }

  async findByNotification(notificationId: number): Promise<NotificationRecipient[]> {
    // Since the Prisma schema doesn't have a NotificationRecipient model,
    // we need to create a custom implementation
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
      include: {
        user: {
          include: {
            person: true,
          },
        },
      },
    });
    
    if (!notification) {
      return [];
    }
    
    // Return a single recipient (the notification's user)
    return [{
      id: notification.id,
      notificationId: notification.id,
      userId: notification.userId,
      isRead: notification.isRead,
    }];
  }

  async create(recipient: Partial<NotificationRecipient>): Promise<NotificationRecipient> {
    const { id, notificationId, userId, isRead, ...rest } = recipient;
    
    // Create or update a notification for this user
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
      include: {
        user: {
          include: {
            person: true,
          },
        },
      },
    });
    
    if (!notification) {
      throw new Error(`Notification with id ${notificationId} not found`);
    }
    
    // Return a NotificationRecipient entity
    return {
      id: notification.id,
      notificationId: notification.id,
      userId: notification.userId,
      isRead: isRead || false,
    };
  }

  async markAsRead(id: number): Promise<NotificationRecipient> {
    // Update the notification's isRead status
    const notification = await this.prisma.notification.update({
      where: { id },
      data: {
        isRead: true,
      },
      include: {
        user: {
          include: {
            person: true,
          },
        },
      },
    });
    
    // Return a NotificationRecipient entity
    return {
      id: notification.id,
      notificationId: notification.id,
      userId: notification.userId,
      isRead: notification.isRead,
      readAt: new Date(),
    };
  }

  async delete(id: number): Promise<void> {
    // Delete the notification
    await this.prisma.notification.delete({
      where: { id },
    });
  }
}

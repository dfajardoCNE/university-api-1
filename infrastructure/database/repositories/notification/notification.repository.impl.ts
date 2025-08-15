import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Notification } from '../../../../domain/entities/notification.entity';
import { NotificationRepository } from '../../../../domain/repositories/notification.repository';

@Injectable()
export class NotificationRepositoryImpl implements NotificationRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
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
    
    return notifications;
  }

  async findById(id: number): Promise<Notification> {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
      include: {
        user: {
          include: {
            person: true,
          },
        },
      },
    });
    
    if (!notification) {
      return null;
    }
    
    return notification;
  }

  async findByUser(userId: number): Promise<Notification[]> {
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
    
    return notifications;
  }

  async create(notification: Partial<Notification>): Promise<Notification> {
    const { id, ...data } = notification;
    return this.prisma.notification.create({
      data: data as any,
      include: {
        user: {
          include: {
            person: true,
          },
        },
      },
    });
  }

  async update(id: number, notification: Partial<Notification>): Promise<Notification> {
    const { id: _, ...data } = notification;
    return this.prisma.notification.update({
      where: { id },
      data: data as any,
      include: {
        user: {
          include: {
            person: true,
          },
        },
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.notification.delete({
      where: { id },
    });
  }
}

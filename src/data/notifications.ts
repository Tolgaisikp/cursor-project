export interface Notification {
  id: number;
  type: 'like' | 'comment';
  user: string;
  content: string;
  time: string;
  read: boolean;
}

// Mock bildirimler
export let MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: 'like',
    user: 'Ahmet Yılmaz',
    content: 'blogunuzu beğendi',
    time: '5 dakika önce',
    read: false,
  },
  {
    id: 2,
    type: 'comment',
    user: 'Mehmet Demir',
    content: 'blogunuza yorum yaptı',
    time: '1 saat önce',
    read: false,
  },
  {
    id: 3,
    type: 'like',
    user: 'Ayşe Kaya',
    content: 'blogunuzu beğendi',
    time: '2 saat önce',
    read: true,
  },
];

// Bildirimi okundu olarak işaretle
export const markAsRead = (notificationId: number) => {
  MOCK_NOTIFICATIONS = MOCK_NOTIFICATIONS.map(notification =>
    notification.id === notificationId
      ? { ...notification, read: true }
      : notification
  );
};

// Tüm bildirimleri okundu olarak işaretle
export const markAllAsRead = () => {
  MOCK_NOTIFICATIONS = MOCK_NOTIFICATIONS.map(notification => ({
    ...notification,
    read: true
  }));
};

// Okunmamış bildirim sayısını al
export const getUnreadCount = () => {
  return MOCK_NOTIFICATIONS.filter(notification => !notification.read).length;
}; 
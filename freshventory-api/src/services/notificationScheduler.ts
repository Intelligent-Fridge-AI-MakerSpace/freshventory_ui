import cron from 'node-cron';
import { sendNotificationsToAll } from '../notifications';

export function scheduleNotifications() {
    // Run daily at 9 AM
    cron.schedule('0 9 * * *', async () => {
        try {
            const payload = {
                title: 'Fresh Inventory Update',
                body: 'Check today\'s fresh produce updates!',
                icon: '/icon.png',
                url: '/updates'  // Added deep link
            };
            
            // Added await and error handling
            await sendNotificationsToAll(payload);
            console.log('Successfully sent scheduled notifications');
        } catch (error) {
            console.error('Failed to send scheduled notifications:', error);
        }
    });
}

// Add this to initialize scheduling when imported
scheduleNotifications();
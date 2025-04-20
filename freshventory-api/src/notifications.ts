import webpush from 'web-push';

// Configure web-push with your VAPID keys
webpush.setVapidDetails(
   'mailto:your@email.com',
   process.env.VAPID_PUBLIC_KEY || '',
   process.env.VAPID_PRIVATE_KEY || ''
);

interface PushSubscription {
    endpoint: string;
    keys: {
        p256dh: string;
        auth: string;
    };
}

const activeSubscriptions: PushSubscription[] = [];

export function saveSubscription(subscription: PushSubscription) {
    // Check if subscription already exists before adding
    if (!activeSubscriptions.some(sub => sub.endpoint === subscription.endpoint)) {
        activeSubscriptions.push(subscription);
    }
}

export async function sendNotificationsToAll(payload: any) {
    const notificationPayload = JSON.stringify(payload);
    
    for (const subscription of activeSubscriptions) {
        try {
            await webpush.sendNotification(subscription, notificationPayload);
        } catch (error) {
            console.error('Error sending notification:', error);
            // Remove invalid subscriptions
            activeSubscriptions.splice(activeSubscriptions.indexOf(subscription), 1);
        }
    }
}

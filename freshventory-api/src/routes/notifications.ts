import express from 'express';
import { saveSubscription } from '../notifications';

// Add router initialization
const router = express.Router();

router.post('/subscribe', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const subscription = req.body;
        
        // Add validation for required fields
        if (!subscription?.endpoint || !subscription?.keys?.p256dh || !subscription?.keys?.auth) {
            res.status(400).json({ error: 'Invalid subscription format' });
            return;
        }

        saveSubscription(subscription);
        res.status(201).json({ message: 'Subscription saved' });
    } catch (error) {
        // Improve error logging
        console.error('Subscription error:', error);
        res.status(500).json({ error: `Subscription failed - ${(error as Error).message || 'Unknown error'}` });
    }
});

// Add missing router export
export { router as notificationsRouter };
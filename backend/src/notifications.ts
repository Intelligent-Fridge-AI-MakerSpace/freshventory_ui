import webpush from 'web-push';

// Function to send notification
async function sendNotification(subscription: PushSubscription, payload: any) {
  try {
    await webpush.sendNotification(subscription, JSON.stringify(payload));
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}

// Example of sending a low stock notification
async function sendLowStockNotification(product: any) {
  const payload = {
    title: "New Inventory Alert",
    message: `Stock level for ${product.name} is low`,
    image: product.imageUrl,
    tag: "inventory-alert",
    actions: [
      {
        action: "view",
        title: "View Details"
      },
      {
        action: "dismiss",
        title: "Dismiss"
      }
    ],
    url: `/inventory/${product.id}`,
    id: product.id,
    type: "inventory-alert",
    customData: {
      productId: product.id,
      currentStock: product.currentStock,
      threshold: product.threshold
    }
  };

  // Get all subscriptions from your database
  const subscriptions = await getSubscriptionsFromDB();
  
  // Send notification to all subscribed users
  for (const subscription of subscriptions) {
    await sendNotification(subscription, payload);
  }
}
# Freshventory

Freshventory is a project designed to manage Refrigerator inventory efficiently. It includes both backend and frontend components, with mobile support through a Capacitor-based Android application.

## Project Structure

- **backend/**: Contains the server-side code for the Freshventory API.
  - **src/**: Source files for the backend.
    - **notifications.ts**: Handles web push notifications using the `web-push` library. It manages subscriptions and sends notifications to all active subscribers.

- **android/**: Contains the Android application built using Capacitor.
  - **app/src/main/java/com/freshventory/app/MainActivity.java**: The main activity for the Android app, extending `BridgeActivity` from Capacitor.

- **freshventory-api/**: Contains the API codebase.
  - **package.json**: Lists dependencies and scripts for the backend.
  - **tsconfig.json**: TypeScript configuration for the backend.

- **freshventory-ui/**: Placeholder for the frontend user interface code.

- **frontend/**: Contains the source code for the frontend application.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   git clone https://github.com/Intelligent-Fridge-AI-MakerSpace/freshventory_ui.git

2. Navigate to the project directory:
   cd /Users/karanpatel/Desktop/freshinventory

3. Install backend dependencies:
   cd freshventory-api
   npm install

4. Install frontend dependencies:
   cd ../frontend
   npm install

5. Start the backend server:
   cd ../freshventory-api
   npm start

6. Start the frontend application:
   cd../frontend
   npm start

7. Build and run the Android application:
   cd../android
   npx cap open android

## Notifications
The backend supports web push notifications. Ensure you have configured your VAPID keys in the environment variables VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY .

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.

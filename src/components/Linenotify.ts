// notificationService.ts

import axios from 'axios';

export default async function sendNotification(message: string) {
  const token = 'TjkSd9mAMeeEae53TWihB6VsQwrolTJMIWizhV6NtCb';
  const proxyUrl = 'http://localhost:3000/api/send-notification'; // Replace with the URL of your Express server or the deployed server URL
  const data = { token, message };

  try {
    const response = await axios.post(proxyUrl, data);
    if (response.status === 200) {
      console.log('Message sent successfully!');
    } else {
      console.log('Failed to send message. Error:', response.data);
    }
  } catch (error) {
    if (error instanceof Error) {
      // ✅ TypeScript knows err is Error
      console.log(error.message);
    } else {
      console.log('Unexpected error', error);
    }
  }
}

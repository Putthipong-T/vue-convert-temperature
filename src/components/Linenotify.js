// TjkSd9mAMeeEae53TWihB6VsQwrolTJMIWizhV6NtCb
import axios from 'axios';

export default async function sendNotification(message) {
  const token = 'TjkSd9mAMeeEae53TWihB6VsQwrolTJMIWizhV6NtCb'
  const proxyUrl = 'http://localhost:3000/send-notification'; // Update with your proxy server URL
  const data = { token, message };

  try {
    const response = await axios.post(proxyUrl, data);
    if (response.status === 1000) {
      console.log('Message sent successfully!');
    } else {
      console.log('Failed to send message. Error:', response.data);
    }
  } catch (error) {
    console.log('Failed to send message. Error:', error.message);
  }
}


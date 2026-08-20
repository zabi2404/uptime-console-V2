import { defineFunction } from "@aws-amplify/backend";

export const sendNotification = defineFunction({
  name: "send-notification",
  environment: {
    SES_FROM_EMAIL: 'zohaib24a@gmail.com' 
  },
});
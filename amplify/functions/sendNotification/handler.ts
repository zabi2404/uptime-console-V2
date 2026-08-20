import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import axios from 'axios';


interface SendNotificationEvent {
    arguments: {
        channel: "EMAIL" | "SMS" | "WEBHOOK";
        message: string;
        title: string;
        url: string;
        destination: string;
        subject: string;
    };
}

const sns = new SNSClient({});
const ses = new SESv2Client({});

export const handler = async (event: SendNotificationEvent) => {
    const {
        channel,
        destination,
        subject,
        message,
        title,
        url,
    } = event.arguments;
const fromEmail = process.env.SES_FROM_EMAIL;
    switch (channel) {
        case "EMAIL":
            await ses.send(
                new SendEmailCommand({
                    FromEmailAddress: fromEmail,
                    Destination: {
                        ToAddresses: ["zohaib31f@gmail.com"],
                    },
                    Content: {
                        Simple: {
                            Subject: {
                                Data: subject,
                            },
                            Body: {
                                Text: {
                                    Data: message,
                                },
                            },
                        },
                    },
                })
            );

            return {
                success: true,
                channel: "EMAIL",
                body: JSON.stringify({
                    message: "Email sent successfully",
                }),
            };

        case "SMS":
            await sns.send(
                new PublishCommand({
                    PhoneNumber: destination,
                    Message: message,
                })
            );

            return {
                success: true,
                channel: "SMS",
                body: JSON.stringify({
                    message: "SMS sent successfully",
                }),
            };

        case "WEBHOOK":
            await axios.post(destination, {
                title,
                message,
                url,
                timestamp: new Date().toISOString(),
            });

            return {
                success: true,
                channel: "WEBHOOK",
                body: JSON.stringify({
                    message: "Webhook sent successfully",
                }),
            };

        default:
            return {
                statusCode: false,
                body: JSON.stringify({
                    message: "Invalid channel",
                }),
            };
    }
};
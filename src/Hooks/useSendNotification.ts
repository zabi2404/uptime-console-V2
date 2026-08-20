import type { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { useState } from 'react';

export const useSendNotification = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const client = generateClient<Schema>();

    const sendNotification = async(InputData:Parameters<typeof client.mutations.sendNotification>[0])=>{
        try {
            setLoading(true);
            setError(null);

    const { data, errors } =
                await client.mutations.sendNotification(InputData);
            if (errors?.length) {
                setError(errors[0]?.message || "Failed to test URL");
                return;
            }
            return data;
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to test URL";

            setError(message);
            return null;
        } finally {
            setLoading(false);
        }
    };
 return {
        sendNotification,
        loading,
        error,
    };
};
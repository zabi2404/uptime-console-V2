import { useState } from "react";
import type { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/api";

export const useTestUrl = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const client = generateClient<Schema>();
    const testUrl = async (url: string) => {
        try {
            setLoading(true);
            setError(null);

            const { data, errors } = await client.queries.testUrl({
                url
            });
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
        testUrl,
        loading,
        error,
    };
};
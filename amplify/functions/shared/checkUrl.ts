import axios from "axios";

export const checkUrl = async (url: string) => {
    const start = performance.now();
    try {

        const response = await axios.get(url, {
            timeout: 10000,
        });
        const responseTime = performance.now() - start;


        if (response.data === "PONG" || response.status === 200) {
        return {
            statusCode: response.status,
            message: JSON.stringify({ message: "Server is running!" }),
            date: new Date().toISOString(),
            responseTime: responseTime.toFixed(2) + " ms",
        };
        }

    } catch (error: unknown) {
        console.error("Error in Lambda:", error);

        return {
            statusCode: 500,
            message: JSON.stringify({
                message: "Server is down or request failed",
            }),
            date: new Date().toISOString(),
            responseTime: `${(performance.now() - start).toFixed(2)} ms`,
        };
    }
}

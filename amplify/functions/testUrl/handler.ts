
import { checkUrl } from "../shared/checkUrl";


export const handler = async (event: { arguments: { url: string } }) => {

  const url = event.arguments.url;

  if (!url) {
    return {
      statusCode: 400,
      message: JSON.stringify({
        message: "URL is required",
      }),
      date: new Date().toISOString(),
      responseTime: "0 ms",
    };
  }

  try {
    return await checkUrl(url);
  } catch (error: unknown) {
    console.error("Error in Lambda:", error);

    return {
      statusCode: 500,
      message: JSON.stringify({
        message: "Server is down or request failed",
      }),
      date: new Date().toISOString(),
      responseTime: "0 ms",
    };
  };
}

// https://keep2-d798.onrender.com/ping

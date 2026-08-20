import type { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";

export interface MonitoringLogInput {
  userId: string;
  title: string;
  message: string;
  tags?:
    | "CREATED"
    | "UPDATED"
    | "DELETED"
    | "ALERT"
    | "NOTIFICATION"
    | "SETTING_CHANGED"
    | "FAILED"
    | "OTHER"
    | null;
  createdAt: string;
}

export const useMonitoring = () => {
  const client = generateClient<Schema>();

  const createlog = async (input: MonitoringLogInput) => {
    try {
      const { data, errors } = await client.models.MonitoringLog.create(
        input as never,
      );

      if (errors) {
        console.error("Error creating log:", errors);
        throw new Error(errors[0]?.message || "Failed to create log");
      }

      return data;
    } catch (error) {
      console.error("Error creating log:", error);
    }
  };

  const getLogs = async () => {
    try {
      const { data, errors } = await client.models.MonitoringLog.list();

      if (errors) {
        console.error("Error fetching logs:", errors);
        throw new Error(errors[0]?.message || "Failed to fetch logs");
      }

      return data;
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  return { createlog, getLogs };
};

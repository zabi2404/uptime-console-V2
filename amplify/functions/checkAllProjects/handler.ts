import { checkUrl } from "../shared/checkUrl";
import { getAmplifyDataClientConfig } from "@aws-amplify/backend/function/runtime";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../data/resource";

console.log("===== checkAllProjects Lambda: Initializing =====");

const { resourceConfig, libraryOptions } =
    await getAmplifyDataClientConfig(
        process.env as Parameters<typeof getAmplifyDataClientConfig>[0]
    );

console.log("Amplify data client configuration loaded");

Amplify.configure(resourceConfig, libraryOptions);

console.log("Amplify configured successfully");

const client = generateClient<Schema>({ authMode: "iam" });

console.log("Amplify Data client created");

export const handler = async () => {
    const startTime = Date.now();

    console.log("========================================");
    console.log("===== checkAllProjects Lambda START =====");
    console.log("========================================");
    console.log("Execution started at:", new Date().toISOString());

    try {
        console.log("Fetching projects from UptimeProjects...");

        const { data: projects, errors } =
            await client.models.UptimeProjects.list();

        console.log("Projects query completed");

        if (errors) {
            console.error("===== ERROR FETCHING PROJECTS =====");
            console.error("Errors:", JSON.stringify(errors, null, 2));
            return;
        }

        console.log(`Total projects fetched: ${projects.length}`);

        if (projects.length === 0) {
            console.log("No projects found. Nothing to check.");
            return;
        }

        console.log("Project IDs:", projects.map((p) => p.id));

        let successful = 0;
        let failed = 0;
        let skipped = 0;

        for (const [index, project] of projects.entries()) {
            const projectStartTime = Date.now();

            console.log("----------------------------------------");
            console.log(
                `Processing project ${index + 1}/${projects.length}`
            );
            console.log("Project ID:", project.id);
            console.log("Project name:", project.name);
            console.log("Project URL:", project.url);
            console.log("Current status:", project.status);

            const url = project.url;
            const id = project.id;

            if (!url) {
                console.error(`Project ${id} has no URL. Skipping...`);
                skipped++;
                continue;
            }

            try {
                console.log(`Checking URL: ${url}`);

                const data = await checkUrl(url);

                console.log("URL check completed");
                console.log("Check result:", JSON.stringify(data, null, 2));

                const responseTime = data?.responseTime || "";
                const lastChecked = data?.date || "";

                console.log("Updating DynamoDB...");
                console.log("Update payload:", {
                    id,
                    responseTime,
                    lastChecked,
                });

                const { data: updatedProject, errors: updateErrors } =
                    await client.models.UptimeProjects.update({
                        id,
                        responseTime,
                        lastChecked,
                    });

                if (updateErrors) {
                    console.error(
                        `Failed to update project ${id}:`,
                        JSON.stringify(updateErrors, null, 2)
                    );

                    failed++;
                    continue;
                }

                console.log(`Project ${id} updated successfully`);
                console.log(
                    "Updated project:",
                    JSON.stringify(updatedProject, null, 2)
                );

                successful++;

                console.log(
                    `Project processing time: ${
                        Date.now() - projectStartTime
                    }ms`
                );
            } catch (error) {
                failed++;

                console.error(`===== ERROR CHECKING PROJECT ${id} =====`);
                console.error("URL:", url);
                console.error("Error:", error);

                if (error instanceof Error) {
                    console.error("Error message:", error.message);
                    console.error("Stack:", error.stack);
                }
            }
        }

        console.log("========================================");
        console.log("===== checkAllProjects Lambda END =====");
        console.log("========================================");

        console.log("Execution summary:", {
            totalProjects: projects.length,
            successful,
            failed,
            skipped,
            durationMs: Date.now() - startTime,
        });

        console.log("Execution finished at:", new Date().toISOString());
    } catch (error) {
        console.error("===== FATAL LAMBDA ERROR =====");
        console.error("Error:", error);

        if (error instanceof Error) {
            console.error("Message:", error.message);
            console.error("Stack:", error.stack);
        }

        throw error;
    }
};
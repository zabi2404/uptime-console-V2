import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { testUrl } from "../functions/testUrl/resource";
import { checkAllProjects } from "../functions/checkAllProjects/resources";
import { sendNotification } from "../functions/sendNotification/resources";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  UptimeProjects: a
    .model({
      userId: a.string().required(),
      projectID: a.string().required(),
      status: a.enum(["ACTIVE", "DOWN"]),
      name: a.string(),
      url: a.string(),
      responseTime: a.string(),
      lastChecked: a.datetime(),
    })
    .authorization((allow) => allow.owner()),

  UserProfile: a
    .model({
      name: a.string(),
      email: a.string(),
      phoneNumber: a.string(),
      companyName: a.string(),
      websiteUrl: a.string(),
      address: a.string(),
    })
    .authorization((allow) => allow.owner()),

  MonitoringLog: a
    .model({
      userId: a.string().required(),
      title: a.string().required(),
      message: a.string().required(),
      tags: a.enum([
        "CREATED",
        "UPDATED",
        "DELETED",
        "ALERT",
        "NOTIFICATION",
        "SETTING_CHANGED",
        "FAILED",
        "OTHER",
      ]),
      createdAt: a.datetime().required(),
    })
    .authorization((allow) => allow.owner()),

  //Lambda functions

  TestUrlResponse: a.customType({
    statusCode: a.integer().required(),
    message: a.string().required(),
    date: a.datetime().required(),
    responseTime: a.string().required(),
  }),

  sendNotification: a
    .mutation()
    .arguments({
      userId: a.string().required(),
      channel: a.enum(["EMAIL", "SMS", "WEBHOOK"]),
      destination: a.string().required(),
      subject: a.string(),
      message: a.string().required(),
      title: a.string(),
      url: a.string(),
    })
    .returns(
      a.customType({
        success: a.boolean().required(),
        channel: a.string(),
        body: a.string().required(),
      }),
    )
    .handler(a.handler.function(sendNotification))
    .authorization((allow) => allow.authenticated()),

  testUrl: a
    .query()
    .arguments({
      url: a.string().required(),
    })
    .returns(a.ref("TestUrlResponse"))
    .authorization((allow) => allow.authenticated())
    .handler(a.handler.function(testUrl)),
});

// Permissions
const authorizedSchema = schema.authorization((allow) => [
  allow.resource(checkAllProjects),
]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  name: "UptimeConsole",
  schema: authorizedSchema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>

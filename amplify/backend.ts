import { sendNotification } from './functions/sendNotification/resources';
import { storage } from './storage/resource';
import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { testUrl } from "./functions/testUrl/resource";
import { checkAllProjects } from "./functions/checkAllProjects/resources";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Duration } from "aws-cdk-lib";
import * as events from "aws-cdk-lib/aws-events";
import * as targets from "aws-cdk-lib/aws-events-targets";
/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
export const backend =defineBackend({
  auth,
  data,
  storage,
  testUrl,
  checkAllProjects,
  sendNotification
});


backend.sendNotification.resources.lambda.addToRolePolicy(
    new PolicyStatement({
        actions: ["ses:SendEmail", "sns:Publish",],
        resources: ["*"],
    })
);

const eventBridgeStack = backend.createStack("EventBridgeStack");

const rule = new events.Rule(eventBridgeStack, "CheckUrlRule", {
  schedule: events.Schedule.rate(Duration.minutes(10)),
});

rule.addTarget(
  new targets.LambdaFunction(
    backend.checkAllProjects.resources.lambda
  )
);

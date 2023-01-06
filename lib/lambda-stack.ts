import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { v4 as uuidv4 } from 'uuid';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';

export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // const uuid = uuidv4();

    const lambda = new NodejsFunction(this, 'HelloWorld', {
      functionName: 'HelloWorld' + uuidv4(),
      entry: 'lib/lambda-src/handler.ts',
      handler: 'handler',
      runtime: Runtime.NODEJS_16_X,
      // memorySize: 128,
      // timeout: cdk.Duration.seconds(10),
    });
  }
}

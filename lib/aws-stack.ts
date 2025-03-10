// import * as cdk from 'aws-cdk-lib';
import {Stack, StackProps, CfnOutput} from 'aws-cdk-lib';
import {Code, Function, Runtime, FunctionUrlAuthType} from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import {LambdaRestApi} from 'aws-cdk-lib/aws-apigateway';

export class AwsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

// defines an AWS Lambda resource
  const hello = new Function(this, 'HelloHandler', {
    runtime: Runtime.NODEJS_18_X,   // execution environment
    code: Code.fromAsset('lambda'), // code loaded from lambda directory
    handler: 'hello.handler',       // file is "hello", function is "handler"
  });

  const helloUrl = hello.addFunctionUrl({
    authType: FunctionUrlAuthType.NONE,
  });

  new CfnOutput(this, "helloUrlOutput", {
    value: helloUrl.url,
  });

  // define API Gateway REST API resource
  const myGateway = new LambdaRestApi(this, "Endpoint", {
    handler: hello,
  });
  }
}

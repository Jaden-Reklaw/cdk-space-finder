import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { join } from 'path';
export class LambdaStack extends Stack {

    public readonly spacesLambdaIntegration: LambdaIntegration;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const spacesLambda = new LambdaFunction(this, 'SpacesLambda', {
            runtime: Runtime.NODEJS_20_X,
            handler: 'hello.main',
            code: Code.fromAsset(join(__dirname, '..', '..', 'services'))
        });

        this.spacesLambdaIntegration = new LambdaIntegration(spacesLambda);
    }
}
import { APIGatewayProxyEvent } from "aws-lambda"
import { expect, test } from "vitest"
import { handler } from "./index.handler.ts"

test("handler shoult return 200", async () => {
    const event: APIGatewayProxyEvent = {
        body: null,
        headers: {},
        multiValueHeaders: {},
        httpMethod: "",
        isBase64Encoded: false,
        path: "",
        pathParameters: null,
        queryStringParameters: null,
        multiValueQueryStringParameters: null,
        stageVariables: null,
        requestContext: {
            accountId: "",
            apiId: "",
            authorizer: undefined,
            protocol: "",
            httpMethod: "",
            identity: {
                accessKey: null,
                accountId: null,
                apiKey: null,
                apiKeyId: null,
                caller: null,
                clientCert: null,
                cognitoAuthenticationProvider: null,
                cognitoAuthenticationType: null,
                cognitoIdentityId: null,
                cognitoIdentityPoolId: null,
                principalOrgId: null,
                sourceIp: "",
                user: null,
                userAgent: null,
                userArn: null,
            },
            path: "",
            stage: "",
            requestId: "",
            requestTimeEpoch: 0,
            resourceId: "",
            resourcePath: "",
        },
        resource: "",
    }
    const result = await handler(event)
    expect(result.statusCode).toEqual(200)
})

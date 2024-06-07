import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"

const myFunction = async (
    _: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    await Promise.resolve()
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `Hello world`,
        }),
    }
}

export const handler = myFunction

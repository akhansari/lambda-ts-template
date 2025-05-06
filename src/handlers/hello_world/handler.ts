import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { Logger } from "@aws-lambda-powertools/logger"
import { setupMiddy } from "../tools.ts"

const logger = new Logger()

const helloWorldHandler = async (_: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    await Promise.resolve()
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `Hello World`,
        }),
    }
}

export const handler = setupMiddy(helloWorldHandler, logger)

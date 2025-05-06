import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import { Logger } from "@aws-lambda-powertools/logger"
import { injectLambdaContext } from "@aws-lambda-powertools/logger/middleware"
import middy from "@middy/core"

export function setupMiddy(handler: unknown, logger: Logger | undefined) {
    const mw = middy(handler as Handler<APIGatewayProxyEvent, APIGatewayProxyResult>)
    if (logger) mw.use(injectLambdaContext(logger))
    return mw
}

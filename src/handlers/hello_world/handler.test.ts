import { APIGatewayProxyEvent, Context } from "aws-lambda"
import { expect, test } from "vitest"
import { handler } from "./handler.ts"

test("should return 200", async () => {
    const context = {} as Context
    const event = {} as APIGatewayProxyEvent

    const result = await handler(event, context)

    expect(result.statusCode).toEqual(200)
})

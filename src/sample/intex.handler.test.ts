import { APIGatewayProxyEvent } from "aws-lambda"
import { expect, test } from "vitest"
import { handler } from "./index.handler.ts"

test("handler shoult return 200", async () => {
    const event = {} as APIGatewayProxyEvent
    const result = await handler(event)
    expect(result.statusCode).toEqual(200)
})

import { APIGatewayProxyEvent, Context } from "aws-lambda"
import { expect, test } from "vitest"
import { handler } from "./handler.ts"

test("should get orders", async () => {
    const context = {} as Context
    const event = {
        httpMethod: "GET",
        path: "/orders",
    } as APIGatewayProxyEvent

    const result = await handler(event, context)

    expect(result.statusCode).toEqual(200)
})

test("should return not found if order id doessn't exist", async () => {
    const context = {} as Context
    const event = {
        httpMethod: "GET",
        path: "/orders/5",
    } as APIGatewayProxyEvent

    const result = await handler(event, context)

    expect(result.statusCode).toEqual(404)
})

test("should return order", async () => {
    const context = {} as Context
    const event = {
        httpMethod: "GET",
        path: "/orders/1",
    } as APIGatewayProxyEvent

    const result = await handler(event, context)

    expect(result.statusCode).toEqual(200)
})

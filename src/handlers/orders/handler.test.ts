import { APIGatewayProxyEvent, Context } from "aws-lambda"
import { expect, test } from "vitest"
import { Order } from "@domain/order.ts"
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

test("should return not found if order id doesn't exist", async () => {
    const context = {} as Context
    const event = {
        httpMethod: "GET",
        path: "/orders/x",
    } as APIGatewayProxyEvent

    const result = await handler(event, context)

    expect(result.statusCode).toEqual(404)
})

test("should return order", async () => {
    const context = {} as Context
    const event = {
        httpMethod: "GET",
        path: "/orders/a23456789012",
    } as APIGatewayProxyEvent

    const result = await handler(event, context)

    expect(result.statusCode).toEqual(200)
})

test("should create an order", async () => {
    const context = {} as Context
    const reqModel = {
        title: "test",
        amount: 15,
    }
    const event = {
        httpMethod: "POST",
        path: "/orders",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqModel),
    } as unknown as APIGatewayProxyEvent

    const result = await handler(event, context)
    expect(result.statusCode).toEqual(201)

    const order = JSON.parse(result.body) as Order
    expect(order.id).length(12)
    expect(order.title).toEqual(reqModel.title)
    expect(order.amount).toEqual(reqModel.amount)
})

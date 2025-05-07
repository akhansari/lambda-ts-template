import { Logger } from "@aws-lambda-powertools/logger"
import { Hono } from "hono"
import { handle } from "hono/aws-lambda"
import { zValidator } from "@hono/zod-validator"
import { nanoid } from "nanoid"
import { orderNoIdSchema, Order } from "@domain/order.ts"
import { setupMiddy } from "../tools.ts"

const logger = new Logger()

const fakeOrders: Order[] = [
    {
        id: "a23456789012",
        title: "Product A",
        amount: 20.0,
    },
    {
        id: "b23456789012",
        title: "Product B",
        amount: 15.0,
    },
]

const app = new Hono()

app.get("/orders", (c) => {
    return c.json(Array.from(fakeOrders.values()))
})

app.get("/orders/:id", (c) => {
    const id = c.req.param("id")
    const order = fakeOrders.find((order) => order.id === id)
    if (!order) {
        return c.json({ message: "Order not found" }, 404)
    }

    return c.json(order)
})

app.post("/orders", zValidator("json", orderNoIdSchema), (c) => {
    const orderModel = c.req.valid("json")
    const order: Order = {
        id: nanoid(12),
        title: orderModel.title,
        amount: orderModel.amount,
    }
    return c.json(order, 201)
})

export const handler = setupMiddy(handle(app), logger)

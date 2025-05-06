import { Logger } from "@aws-lambda-powertools/logger"
import { Hono } from "hono"
import { handle } from "hono/aws-lambda"
import { setupMiddy } from "../tools.ts"

const logger = new Logger()

const fakeOrders = new Map([
    [
        "1",
        {
            id: "1",
            product: "Product A",
            quantity: 2,
            price: 20.0,
        },
    ],
    [
        "2",
        {
            id: "2",
            product: "Product B",
            quantity: 1,
            price: 15.0,
        },
    ],
])

const app = new Hono()

app.get("/orders", (c) => {
    return c.json(fakeOrders.values())
})

app.get("/orders/:id", (c) => {
    const id = c.req.param("id")
    if (!fakeOrders.has(id)) {
        return c.json({ message: "Order not found" }, 404)
    }

    return c.json(fakeOrders.get(id))
})

export const handler = setupMiddy(handle(app), logger)

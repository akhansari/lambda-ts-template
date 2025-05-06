import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { logger } from "hono/logger"
import { glob } from "glob"

const lambdas = await getLambdas()
console.log("Available lambdas:")
lambdas.forEach((_, name) => {
    console.log("- " + name)
})

const app = new Hono()

app.use(logger())

app.post("/:lambdaName/:handlerName?", async (c) => {
    const { lambdaName, handlerName } = c.req.param()

    const path = lambdas.get(lambdaName)
    if (!path) {
        return c.json({ error: "Lambda not found:" + lambdaName }, 404)
    }

    const proxyEvent = await c.req.json()

    const module = await import(path)
    const res = await module[handlerName](proxyEvent, {})

    return c.json(res)
})

app.get("/:lambdaName/:handlerName?", async (c) => {
    const { lambdaName, handlerName } = c.req.param()

    const path = lambdas.get(lambdaName)
    if (!path) {
        return c.json({ error: "Lambda not found:" + lambdaName }, 404)
    }

    const module = await import(path)
    const res = await module[handlerName || "handler"]({}, {})

    return c.json(res)
})

serve(app, (info) => {
    console.log(`Listening on http://localhost:${info.port}`)
})

async function getLambdas() {
    const regex = /src\/handlers\/(.*)\/handler.ts/
    const paths = await glob("src/handlers/*/handler.ts")
    return new Map(paths.map((path) => [path.match(regex)[1], "../" + path]))
}

import * as tools from "./bundle-tools.mjs"

await tools.cleanDistFolder()
await tools.bundleLambdaHandlers()

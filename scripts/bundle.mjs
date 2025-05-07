import * as tools from "./bundle_tools.mjs"

await tools.cleanDistFolder()
await tools.bundleLambdaHandlers()

import * as tools from "../../scripts/bundle-tools.mjs"

await tools.cleanDistFolder()
await tools.bundleLambdaHandlers()

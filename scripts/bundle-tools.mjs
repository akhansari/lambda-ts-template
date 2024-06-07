import { build } from "esbuild"
import { glob } from "glob"
import { rm } from "node:fs/promises"

/** @type {import("esbuild").BuildOptions} */
export const defaultNodeBundleOptions = {
    platform: "node",
    bundle: true,
    outdir: "./dist",
    outbase: ".",
}

/** @type {import("esbuild").BuildOptions} */
export const defaultBrowserBundleOptions = {
    platform: "browser",
    bundle: true,
    sourcemap: true,
    outdir: "./dist",
}

/** @type {import("glob").GlobOptions} */
export const defaultGlobOptions = {
    ignore: ["**/node_modules/", "**/*.test.ts"],
}

/** @param {import("esbuild").BuildOptions} options */
export async function bundleLambdaHandlers(options) {
    const opt = { ...defaultNodeBundleOptions, ...options }
    if (!("entryPoints" in opt)) {
        opt.entryPoints = await glob("**/*.handler.ts", defaultGlobOptions)
    }
    await build(opt)
}

/** @param {import("esbuild").BuildOptions} options */
export async function bundleForBrowser(options) {
    const opt = { ...defaultBrowserBundleOptions, ...options }
    if (!("entryPoints" in opt)) {
        opt.entryPoints = await glob("**/app.ts", defaultGlobOptions)
    }
    await build(opt)
}

export function cleanDistFolder() {
    return rm("./dist", { recursive: true, force: true })
}

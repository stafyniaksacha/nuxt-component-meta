// https://github.com/nuxt/cli/blob/main/src/utils/esm.ts

import { pathToFileURL } from 'node:url'
import { interopDefault, resolvePath } from 'mlly'

export async function tryResolveModule (id: string, url = import.meta.url) {
  try {
    return await resolvePath(id, { url })
  } catch {
    // Ignore error
  }
}

export async function importModule (
  id: string,
  url: string | string[] = import.meta.url
) {
  const resolvedPath = await resolvePath(id, { url })
  return import(pathToFileURL(resolvedPath).href).then(interopDefault)
}

export function tryImportModule (id: string, url = import.meta.url) {
  try {
    return importModule(id, url).catch(() => undefined)
  } catch {
    // Ignore error
  }
}

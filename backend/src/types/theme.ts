export interface Theme {
    pageBackground: string
    pageTextColor: string
    buttonBackground: string
    buttonTextColor: string
}

export const DEFAULT_THEME: Theme = {
    pageBackground: "#f5efe1",
    pageTextColor: "#19191e",
    buttonBackground: "#f6339a",
    buttonTextColor: "#19191e"
}

const HEX_COLOR = /^#[0-9a-fA-F]{6}$/

export function isValidTheme(body: unknown): body is Theme {
  if (typeof body !== "object" || body === null) return false

  const keys = ["pageBackground", "pageTextColor", "buttonBackground", "buttonTextColor"] as const
  const data = body as Record<string, unknown>

  return keys.every((key) => typeof data[key] === "string" && HEX_COLOR.test(data[key] as string))
}
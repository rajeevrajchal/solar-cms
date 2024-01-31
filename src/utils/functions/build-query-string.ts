/* eslint-disable @typescript-eslint/no-unused-vars */
export function buildQueryString(
  params: Record<string, string | undefined>
): string {
  const queryParams = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
    .join("&");

  return queryParams ? `?${queryParams}` : "";
}

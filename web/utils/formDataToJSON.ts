export const formDataToJSON = (formData: FormData): string => {
  const obj: Record<string, unknown> = {}
  formData.forEach((value, key) => obj[key] = value)
  return JSON.stringify(obj)
}
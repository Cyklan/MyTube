    // https://ihateregex.io/expr/password/
    // https://ihateregex.io/expr/password/
export const validatePasswordRequirements = (password: string) => {
  return new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g).test(
    password
  )
}

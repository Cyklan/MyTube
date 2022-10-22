import db from 'App/Database'

export const getUserById = (id: string) => {
    if (!id) return null

    return db.user.findFirst({
      where: {
        id,
      },
    })
}

export const getUserByName = (username: string) => {
    if (!username) return null

    return db.user.findFirst({
      where: {
        username,
      },
    })
}
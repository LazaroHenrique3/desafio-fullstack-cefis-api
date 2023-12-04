import { compare, genSalt, hash } from 'bcrypt'

const SALT_RANDOMS = 10

//Criando o hash da senha para salvar no banco de dados
const hashPassword = async (password: string) => {
    const saltGenerated = await genSalt(SALT_RANDOMS)

    return await hash(password, saltGenerated)
}

//Verificando se a senha bate com a senha do banco de dados
const verifyPassword = async (password: string, hashedPassword: string) => {
    return await compare(password, hashedPassword)
}

export const PasswordCrypto = {
    hashPassword,
    verifyPassword
}
import { PrismaClient } from '@prisma/client';
import { comparePassword, genereteToken, hashPassword } from '../utils/utils.js';

const prisma = new PrismaClient()


// cria no db user um novo turista
export async function serviceCreateUser(name, email, phone, password) {

    //criar a senha do usuario hasheada(cryptografada)
    const hashedPassword = await hashPassword(password)
    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            phone: phone,
            password: hashedPassword
        }
    })

    // gerar um token
    const token = genereteToken(newUser)
    return token
}

// cria no db admin um novo adm
export async function serviceCreateAdm(name, email, password) {

    //criar a senha do usuario hasheada(cryptografada)
    const hashedPassword = await hashPassword(password)
    const newAdm = await prisma.admin.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword
        }
    })

    const token = genereteToken(newAdm)
    return token
}

// deleta places 
export async function serviceDelete(id) {
    return await prisma.place.delete({
        where: { id: Number(id) }
    })
}

//atualizar os endereços 
export async function serviceUpdateAddress(id, name, description, address, type, rating) {
    return await prisma.place.update({
        where: {
            id
        },
        data: {
            name, description, address, type, rating
        }
    })
}

// filtrar por tipo
export async function serviceFilterPlace(type) {
    return await prisma.place.findMany({
        where: {
            type
        }
    })
}

// login
export async function serviceLogin(email, password) {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (user) {
        const passwordMastch = await comparePassword(password, user.password)

        if (!passwordMastch) {
            return false
        }

        const token = genereteToken(user)
        return token
    }

    const adm = await prisma.admin.findUnique({
        where: {
            email
        }
    })

    if (adm) {
        const passwordMastch = await comparePassword(password, adm.password)

        if (!passwordMastch) {
            return false
        }

        const token = genereteToken(adm)
        return token
    }
    return false
}

//todos os endereços 
export async function serviceAllPlaces() {
    return await prisma.place.findMany()

}

//criar endereços turisticos 
export async function serviceCreatePlace(name, description, address, type, rating) {
    return await prisma.place.create({
        data: { name, description, address, type, rating }
    })
}

export async function existeEmail(email) {
    const user = await prisma.user.findUnique({
        where: { email }
    })
    const adm = await prisma.admin.findUnique({
        where: { email }
    })

    return adm || user
}
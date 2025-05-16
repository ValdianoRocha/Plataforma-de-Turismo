import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()


// cria no db user um novo turista
export async function serviceCreateUser(name, email, phone, password) {
    return await prisma.user.create({
        data: { name, email, phone, password }
    })

}

// cria no db admin um novo adm
export async function serviceCreateAdm(name, email, password) {
    return await prisma.admin.create({
        data: { name, email, password }
    })

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
    if(user){
       if(user.password == password){
        return true
       }
       return false
    }
    const adm = await prisma.admin.findUnique({
        where:{
            email
        }
    })
    if(adm){
        if(adm.password == password){
            return true
        }
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
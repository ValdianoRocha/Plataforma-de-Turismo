import {
    existeEmail,
    serviceAllPlaces,
    serviceCreateAdm,
    serviceCreatePlace,
    serviceCreateUser,
    serviceDelete,
    serviceFilterPlace,
    serviceLogin,
    serviceUpdateAddress
} from "../services/services.js"


// controller para criar um usuario turista
export const crieteUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body
        if (await existeEmail(email)) {
            res.send("Enail ja esta em uso!")
        }
        const token = await serviceCreateUser(name, email, phone, password,)

        res.status(201).json({
            mensagem: `Usuario ${name} criado!`,
            token: token
        })
    } catch (error) {
        res.status(500).json({
            mensagem: 'ERRO AO CRIAR NOVO USUARIO',
            erro: error
        })
    }
}

// controller para criar um usuario admin
export const crieteAdm = async (req, res) => {
    const { name, email, password } = req.body
    try {
        if (await existeEmail(email)) {
            res.send("Enail ja esta em uso!")
        }
        const token = await serviceCreateAdm(name, email, password)

        res.status(201).json({
            mensagem: `Administrador ${name} criado!`,
            token: token
        })
    } catch (error) {
        res.status(500).json({
            mensagem: 'ERRO AO CRIAR NOVO ADMIN',
            erro: error
        })
    }
}

// controller do login
export const loginController = async (req, res) => {
    const { email, password } = req.body
    try {
        const token = await serviceLogin(email, password)

        if (token) {
            res.status(201).json({
                mensagem: "login feito com sucesso!",
                token: token
            })

        } else {
            res.send("Email ou senha incorreta!")
        }

    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao fazer login",
            erro: error
        })
    }
}

//controller para criar endereços
export const createPlace = async (req, res) => {
    try {
        const { name, description, address, type, rating } = req.body
        const newAdmin = await serviceCreatePlace(name, description, address, type, rating)

        res.status(201).send(`ENDEREÇO CRIADO`)
    } catch (error) {
        res.status(500).json({
            mensagem: 'ERRO AO CRIAR NOVO ADMIN\n(controller)',
            erro: error
        })
    }
}

//controller para mostrar todos os endereços 
export const getAllPlaces = async (req, res) => {
    try {
        const allPlaces = await serviceAllPlaces()
        res.send(allPlaces)
    } catch (error) {
        error
    }
}

// Controller responsavel por filtrar por tipo
export const filterPlaces = async (req, res) => {
    const type = req.params.type

    try {
        const placesTapy = await serviceFilterPlace(type)
        res.status(200).json(placesTapy)

    } catch (error) {
        res.status(500).json({
            mensagem: 'ERRO AO FILTRAR ENDEREÇOS(controle)',
            erro: error
        })
    }
}

// cntroller responsavel por atualizar os endereços 
export const updatePlaces = async (req, res) => {
    const id = parseInt(req.params.id)
    const { name, description, address, type, rating } = req.body
    try {
        const put = await serviceUpdateAddress(id, name, description, address, type, rating)

        res.status(200).json(put)
    } catch (error) {
        res.status(500).json({
            mensagem: 'ERRO AO ATUALIZAR O ENDEREÇO',
            erro: error
        })
    }
}

// controller para deletar endereços turisticos
export const deletePlaces = async (req, res) => {
    const id = req.params.id
    try {
        const deletado = await serviceDelete(id)

        res.status(201).json(deletado)
    } catch (error) {
        res.status(500).json({
            mensagem: 'ERRO AO DELETAR O ENDEREÇO TURISTICO',
            erro: error
        })
    }
}
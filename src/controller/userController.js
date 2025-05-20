import {
    existeEmail,
    serviceCreateUser,
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






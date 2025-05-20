import { existeEmail, serviceCreateAdm } from "../services/services.js"

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
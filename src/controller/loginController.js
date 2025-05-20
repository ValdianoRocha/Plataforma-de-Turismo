import { serviceLogin } from "../services/services.js"


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
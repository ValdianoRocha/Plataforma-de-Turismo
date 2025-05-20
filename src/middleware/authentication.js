
import { verifyToken } from "../utils/utils.js"

export function authenticate(req, res, next) {

    // obter o token do header authorization
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({
            mensagem: "token de acesso não funciona!"
        })
    }

    try {
        const decoded = verifyToken(token)

        req.user = decoded
        next()

    } catch (error) {
        res.status(403).json({
            mensagem: "Token invalido ou expirado"
        })
    }
}
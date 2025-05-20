
export function validate(schema) {
    return (req, res, next) => {
        try {
            //validar o corpo da requisição contra o schema fornecido
            const validateDada = schema.parse(req.body)

            //substituir o body pelos dados validados 
            req.body = validateDada

            // chamar o proximo agente(middleware)
            next()
        } catch (error) {
            const message = error.issues.map(err => ({
                path: err.path[0],
                message: err.message
            }))
            return res.status(400).json({
                mensagem: "Erro de validação",
                error: message
            })
        }
    }
}
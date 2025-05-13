import express from 'express'

const router = express.Router()


router.get('/', (req, res )=>{
    res.send("teste rota")
})


export default router
import express from 'express'
import { createPlace, crieteAdm, crieteUser, deletePlaces, filterPlaces, getAllPlaces, loginController, updatePlaces } from '../controller/userController.js'
import { createAdmSchemas, createUserSchemas, validateLoginSchema } from '../schemas/schemas.js'
import { validate } from '../middleware/validate.js'

const router = express.Router()


router.post('/auth/register',validate(createUserSchemas), crieteUser)// rota da criação de um turista (ok)
router.post('/auth/register-adm',validate(createAdmSchemas), crieteAdm)// rota da criação de um adm (ok)
router.post('/auth/login',validate(validateLoginSchema), loginController)// login (ok)
router.post('/places', createPlace)//Criar Locais de turismo (OK)
router.get('/places', getAllPlaces)//Retorna todos os locais cadastrados. (ok)
router.get('/places/:type', filterPlaces)//Retorna apenas locais do tipo especificado.(ok)
router.put('/places/:id', updatePlaces)//Atualiza os dados de um local existente. (ok)
router.delete('/places/:id', deletePlaces) //Remove um local do banco de dados. (ok)


export default router
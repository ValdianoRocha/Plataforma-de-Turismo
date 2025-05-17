import express from 'express'
import { createPlace, crieteAdm, crieteUser, deletePlaces, filterPlaces, getAllPlaces, loginController, updatePlaces } from '../controller/userController.js'
import { createAdmSchemas, createUserSchemas, validateLoginSchema } from '../schemas/schemas.js'
import { validate } from '../middleware/validate.js'
import { authenticate } from '../middleware/authentication.js'
import { permissionAdmin, permissionAdminOrUser } from '../middleware/permission.js'

const router = express.Router()


router.post('/auth/register',validate(createUserSchemas), crieteUser)// rota da criação de um turista (ok)
router.post('/auth/register-adm',validate(createAdmSchemas), crieteAdm)// rota da criação de um adm (ok)
router.post('/auth/login',validate(validateLoginSchema), loginController)// login (ok)
router.post('/places',authenticate,permissionAdmin, createPlace)//Criar Locais de turismo (OK)
router.get('/places',authenticate,permissionAdminOrUser, getAllPlaces)//Retorna todos os locais cadastrados. (ok)
router.get('/places/:type',authenticate,permissionAdminOrUser, filterPlaces)//Retorna apenas locais do tipo especificado.(ok)
router.put('/places/:id',authenticate,permissionAdmin, updatePlaces)//Atualiza os dados de um local existente. (ok)
router.delete('/places/:id',authenticate,permissionAdmin, deletePlaces) //Remove um local do banco de dados. (ok)


export default router


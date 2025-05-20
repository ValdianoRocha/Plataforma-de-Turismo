import express from 'express'
import { createAdmSchemas, createPlaceSchema, createUserSchemas, updatePlaceSchema, validateLoginSchema } from '../schemas/schemas.js'
import { validate } from '../middleware/validate.js'
import { authenticate } from '../middleware/authentication.js'
import { permissionAdmin, permissionAdminOrUser } from '../middleware/permission.js'
import { crieteUser } from '../controller/userController.js'
import { crieteAdm } from '../controller/adminController.js'
import { createPlace, deletePlaces, filterPlaces, getAllPlaces, updatePlaces } from '../controller/placeController.js'
import { loginController } from '../controller/loginController.js'

const router = express.Router()


router.post('/auth/register', validate(createUserSchemas), crieteUser)// rota da criação de um turista
router.post('/auth/register-adm', validate(createAdmSchemas), crieteAdm)// rota da criação de um adm
router.post('/auth/login', validate(validateLoginSchema), loginController)// login
router.post('/places', authenticate, validate(createPlaceSchema), permissionAdmin, createPlace)//Criar Locais de turismo
router.get('/places', authenticate, permissionAdminOrUser, getAllPlaces)//Retorna todos os locais cadastrados.
router.get('/places/:type', authenticate, permissionAdminOrUser, filterPlaces)//Retorna apenas locais do tipo especificado.
router.put('/places/:id', authenticate, validate(updatePlaceSchema), permissionAdmin, updatePlaces)//Atualiza os dados de um local existente.
router.delete('/places/:id', authenticate, permissionAdmin, deletePlaces) //Remove um local do banco de dados.


export default router



import { PrismaClient } from '@prisma/client';
import { existeEmail } from '../services/services.js';

const prisma = new PrismaClient()

export const permissionAdmin = async (req, res, next) => {
  const email = req.user.email

  const adm = await prisma.admin.findUnique({
    where: {
      email
    }
  })
  if (!adm) {
    return res.status(403).json({ error: 'Acesso permitido apenas para Administradores' });
  }

  next();
}

export const permissionAdminOrUser = async (req, res, next) => {
  const email = req.user.email
  const admOrUser = await existeEmail(email)

  if (!admOrUser) {
    return res.status(403).json({ error: 'Acesso permitido apenas para Administradores' });
  }

  next();
}
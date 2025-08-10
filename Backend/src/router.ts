import { Router } from 'express';
import {body} from 'express-validator';
import { createAcount, login } from './handlers';
import { handleInputErrors } from './middleware/validator';

const router = Router();

//! Validacion con express-validator
//! AUTENTICACION Y REGISTRO
router.post('/auth/register',
    body('handle').
         notEmpty().
         withMessage('El handle es obligatorio'),
    body('name').
        notEmpty().
        withMessage('El nombre es obligatorio'),
    body('email').
        isEmail().
        withMessage('Email inválido'),
    body('password').
        isLength({ min: 8 }).
        withMessage('La contraseña debe tener al menos 8 caracteres'),
        handleInputErrors,
  createAcount
);

//! Rutas de autenticación y registro
router.post('/auth/login', 
    body('email').
        notEmpty().
        withMessage('Email es obligatorio'), 
    body('password').
        notEmpty().
        withMessage('Contraseña es obligatorio'), 
    handleInputErrors,
    login
);

export default router;






import { Request, Response } from "express";
import { validationResult } from 'express-validator';
import slug from "slug";
import User from "../models/User";
import { hashPassword, comparePassword } from '../utils/auth';

export const createAcount = async (req: Request, res: Response) => {
 

    const { email, password } = req.body;
    //*Revisar si el email ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
       const error = new Error('Un usuario con ese email ya existe');   
       res.status(409).json({ error: error.message });
       return;
    }
    
    //*Revisar si el handle ya existe o alias
    const handle = slug(req.body.handle, '')
    const handleExists = await User.findOne({ handle });
    if (handleExists) {
        const error = new Error('El handle ya existe o alias');
        res.status(409).json({ error: error.message });
        return;
    }

    //*hashear la contraseña
    const user = new User(req.body);
    user.password = await hashPassword(password);
    user.handle = handle;
    await user.save();
    res.status(201).send('Registro exitoso');
}

export const login = async (req: Request, res: Response) => {
     let errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return
    }

    const { email, password } = req.body;
   //!Validacion a la hora de logiar
    const user = await User.findOne({ email });
    if (!user) {
       const error = new Error('No existe un usuario con ese email');   
       res.status(404).json({ error: error.message });
       return;
    }

    //!Comprobar la contraseña
    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
        const error = new Error('Contraseña incorrecta');
        res.status(401).json({ error: error.message });
        return;
    }

    res.status(200).json({ message: 'Login exitoso' });
}
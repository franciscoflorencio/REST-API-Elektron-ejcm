import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express';
const prisma = new PrismaClient();
import auth from "../config/auth";

class UserController {
  public async create(request: Request, response: Response) {
    const { name, email, profileImageUrl, password, cpf, cellphoneNumber } = request.body;
    const { hash, salt } = auth.generatePassword(password);

    try{
      const newUser = await prisma.user.create({
        data:{
          name,
          email,
          profileImageUrl,
          hash,
          salt,
          cpf,
          cellphoneNumber,
        }
      });

      return response.status(201).json({
        message: "Usuario criado com exito",
        user: newUser,
      });
    }
    catch(error){
      return response.status(500).json({
        messageError: "erro!!"
      });
    }
  }

  public async readAll(request: Request, response: Response){
    try{
      const users = await prisma.user.findMany();
      return response.status(200).json(users);
    }catch(error){
      return response.status(500).json({
        messageError: "erro!!",
        error: error,
      });
    }
  }

  public async read(request: Request, response: Response){
    const {id} = request.params;
    try{
      const user = await prisma.user.findUnique({
        where: {id: Number(id)}
      });
      return response.status(200).json(user);
    }
    catch(error){
      return response.status(500).json({
        messageError: "erro!!",
        error: error,
      })
    }
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, profileImageUrl, cpf, cellphoneNumber } = req.body;

    try {
      const user = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email, profileImageUrl, cpf, cellphoneNumber },
      });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ messageError: "Error atualizando a senha", error });
    }
  }

  public async updatePassword(req: Request, res: Response){
    const {id} = req.params;
    const {password} = req.body;
    const { hash, salt } = auth.generatePassword(password);

    try{
      const user = await prisma.user.update({
        where: {id: Number(id)},
        data: {
          hash,
          salt,
        },
      });
      return res.status(200).json(user);
    }
    catch(error){
      return res.status(500).json({messageError: "Erro atualizando a senha", error})
    }
  }

  public async delete(request: Request, response: Response){
    const {id} = request.params;
    try{
      const user = await prisma.user.delete({
        where: {id: Number(id)}
      });
      return response.status(200).json(user);
    }
    catch(error){
      return response.status(500).json({error: error});
    }
  }  
}


export const userController = new UserController();

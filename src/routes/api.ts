import express from 'express';
import { TodoController } from '../app/http/controllers/Todos/TodoController';
import { check } from 'express-validator/check'
import { UserController } from '../app/http/controllers/Todos/UserController';


const router = express.Router();

router.get('/' , (req , res) => {
    res.json({
        message: "Hellow World Typscript"
    })
})

router.get('/todo' , (req , res) => {
    new TodoController().index(req, res)
})

router.post('/todo' , (req , res) => {
    new TodoController().store(req , res)
})

router.put('/todo' , (req , res) => {
    new TodoController().update(req , res)
})

router.delete('/todo' , (req , res) => {
    new TodoController().delete(req , res)
})

router.get('/user' , (req , res) => {
    new UserController().index(req , res)
})

router.post('/user' , (req , res) => {
    new UserController().store(req , res)
})



export default router
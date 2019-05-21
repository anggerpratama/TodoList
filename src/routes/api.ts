import express from 'express';
import { TodoController } from '../app/http/controllers/Todos/TodoController';

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

export default router
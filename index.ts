import fastify from "fastify"
import dotenv from "dotenv"
import { db } from "./src/config/data-source"
import 'reflect-metadata';

const app = fastify()

dotenv.config()

const port = Number(process.env.PORT)

app.get('/status', (request, response) => {
    response.status(200).send('Aplicação rodando')
})

async function startDb() {

     try {
         await db.initialize()
         console.log('Banco autenticado com sucesso!')

     } catch (error) {
         console.log(error)
     }
 }

app.listen({
    port: port | 3000
}, () => {
    console.log(`Aplicação rodando na porta ${port}`)
    
    startDb()
})

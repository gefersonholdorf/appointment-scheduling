import fastify from "fastify"
import dotenv from "dotenv"
import { db } from "./src/config/data-source"
import 'reflect-metadata';
import { personRoutes } from "./src/routes/person.routes";

export const app = fastify()

dotenv.config()

const port = Number(process.env.PORT)

app.register(personRoutes)

app.get('/', (request, response) => {
    console.log('Acessou')
    response.status(200).send('Aplicação rodando')
})


//Iniciando BD
async function startDb() {

     try {
         await db.initialize()
         console.log('Banco autenticado com sucesso!')

     } catch (error) {
         console.log(error)
     }
 }

// Iniciando Servidor
app.listen({
    host: '0.0.0.0',
    port: port ?? 3000
}, (err, address) => {
    if (err) {
        console.log(err)
        process.exit(1)
    }
    console.log(`Aplicação rodando na porta ${port}, ${address}`)
    
    startDb()
})

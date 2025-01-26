import fastify from "fastify"

const app = fastify()

const port = 3000

app.get('/status', (request, response) => {
    response.status(200).send('Aplicação rodando')
})

app.listen({
    port: port
}, () => {
    console.log(`Aplicação rodando na porta ${port}`)
})

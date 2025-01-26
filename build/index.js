"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const app = (0, fastify_1.default)();
const port = 3000;
app.get('/status', (request, response) => {
    response.status(200).send('Aplicação rodando');
});
app.listen({
    port: port
}, () => {
    console.log(`Aplicação rodando na porta ${port}`);
});

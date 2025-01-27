"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const dotenv_1 = __importDefault(require("dotenv"));
const data_source_1 = require("./src/config/data-source");
const app = (0, fastify_1.default)();
dotenv_1.default.config();
const port = Number(process.env.PORT);
app.get('/status', (request, response) => {
    response.status(200).send('Aplicação rodando');
});
function startDb() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(process.env.DB_HOST);
        console.log(process.env.DB_USER);
        console.log(process.env.DB_PASSWORD);
        console.log(process.env.DB_DATABASE);
        console.log(Number(process.env.DB_PORT));
        try {
            yield data_source_1.db.initialize();
            console.log('Banco autenticado com sucesso!');
        }
        catch (error) {
            console.log(`Erro ao autenticar o Banco de Dados! ${error}`);
        }
    });
}
app.listen({
    port: port | 3000
}, () => {
    console.log(`Aplicação rodando na porta ${port}`);
    startDb();
});

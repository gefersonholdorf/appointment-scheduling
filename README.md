<h1> ⚕️ Agendamento de Consultas </h1>

API para clínicas ou profissionais autônomos organizarem horários de atendimento com seus clientes.

## 🧑‍💻Tecnologias
  - NodeJS
  - TypeScript
  - Fastify
  - TypeORM

## Regras de Negócios(RNs):
  - Cada profissional pode atender até 8 clientes por dia.
  - O agendamento só pode ser realizado com pelo menos 24 horas de antecedência.
  - Cancelamentos devem ser feitos até 12 horas antes do horário marcado.

## Requisitos Funcionais:
  - CRUD de clientes e agendamentos.
  - Listagem de horários disponíveis por profissional.
  - Notificação de agendamento confirmado (mock).

## Requisitos Não Funcionais:
  - Disponibilidade alta com monitoramento de performace.
  - Logs para auditoria de alterações em agendamentos.

## Exemplo:
  - Profissional cadastra seus horários disponíveis e o cliente reserva/cancela um horário.

## Rotas:
  - POST: /create-person = Cadastro de Pessoa
  - GET: /persons = Listar todas as pessoas
  - POST: /create-appointment = Criar horário disponível
  - POST: /create-appointment-client/:id = Criar agendamento do Cliente
  - GET: /appointments = Listar agendamentos
  - GET: /appointments/:id = Listar agendamentos por Profissional
  - POST: /cancel-appointment/:id = Cancelar agendamento e Criar novo horário disponível no lugar 

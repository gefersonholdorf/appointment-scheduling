<h1> ⚕️ Agendamento de Consultas </h1>

API para clínicas ou profissionais autônomos orgaizarem horários de atendimento com seus clientes.

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
  - Profissional cadastra seus horários disponíveis e o cliente reservaum horário.

## Rotas:
  - POST: clients = Cadastro de cliente
  - POST: appointments = Criar agendamento
  - GET: /appointments/:id = Listar agendamentos
  - DELETE: /appointments/:id = Cancelar agendamento

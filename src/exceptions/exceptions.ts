import createError from '@fastify/error'

export const NotFoundException = createError('NOT_FOUND', 'Pessoa não encontrada!', 404);
export const BadRequestException = createError('BAD_REQUEST', 'Falta campos obrigatórios!', 400);
export const InvalidPersonTypeProfessionalException = createError('INVALID_PERSON_TYPE', 'Tipo de pessoa deve ser Professional!', 400);
export const InvalidPersonTypeClientException = createError('INVALID_PERSON_TYPE', 'Tipo de pessoa deve ser Client!', 400);
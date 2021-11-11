import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cliente,
  Abogado,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteAbogadoController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/abogado', {
    responses: {
      '200': {
        description: 'Abogado belonging to Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Abogado)},
          },
        },
      },
    },
  })
  async getAbogado(
    @param.path.string('id') id: typeof Cliente.prototype.id,
  ): Promise<Abogado> {
    return this.clienteRepository.abogado(id);
  }
}

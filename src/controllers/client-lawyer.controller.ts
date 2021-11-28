import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Client,
  Lawyer,
} from '../models';
import {ClientRepository} from '../repositories';

export class ClientLawyerController {
  constructor(
    @repository(ClientRepository)
    public clientRepository: ClientRepository,
  ) { }

  @get('/clients/{id}/lawyer', {
    responses: {
      '200': {
        description: 'Lawyer belonging to Client',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Lawyer)},
          },
        },
      },
    },
  })
  async getLawyer(
    @param.path.string('id') id: typeof Client.prototype.id,
  ): Promise<Lawyer> {
    return this.clientRepository.lawyer(id);
  }
}

import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  CaseLawer,
  Client,
} from '../models';
import {CaseLawerRepository} from '../repositories';

export class CaseLawerClientController {
  constructor(
    @repository(CaseLawerRepository)
    public caseLawerRepository: CaseLawerRepository,
  ) { }

  @get('/case-lawers/{id}/client', {
    responses: {
      '200': {
        description: 'Client belonging to CaseLawer',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Client)},
          },
        },
      },
    },
  })
  async getClient(
    @param.path.string('id') id: typeof CaseLawer.prototype.id,
  ): Promise<Client> {
    return this.caseLawerRepository.client(id);
  }
}

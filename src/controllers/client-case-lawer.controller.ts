import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Client,
  CaseLawer,
} from '../models';
import {ClientRepository} from '../repositories';

export class ClientCaseLawerController {
  constructor(
    @repository(ClientRepository) protected clientRepository: ClientRepository,
  ) { }

  @get('/clients/{id}/case-lawers', {
    responses: {
      '200': {
        description: 'Array of Client has many CaseLawer',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CaseLawer)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<CaseLawer>,
  ): Promise<CaseLawer[]> {
    return this.clientRepository.caseLawers(id).find(filter);
  }

  @post('/clients/{id}/case-lawers', {
    responses: {
      '200': {
        description: 'Client model instance',
        content: {'application/json': {schema: getModelSchemaRef(CaseLawer)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Client.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CaseLawer, {
            title: 'NewCaseLawerInClient',
            exclude: ['id'],
            optional: ['clientId']
          }),
        },
      },
    }) caseLawer: Omit<CaseLawer, 'id'>,
  ): Promise<CaseLawer> {
    return this.clientRepository.caseLawers(id).create(caseLawer);
  }

  @patch('/clients/{id}/case-lawers', {
    responses: {
      '200': {
        description: 'Client.CaseLawer PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CaseLawer, {partial: true}),
        },
      },
    })
    caseLawer: Partial<CaseLawer>,
    @param.query.object('where', getWhereSchemaFor(CaseLawer)) where?: Where<CaseLawer>,
  ): Promise<Count> {
    return this.clientRepository.caseLawers(id).patch(caseLawer, where);
  }

  @del('/clients/{id}/case-lawers', {
    responses: {
      '200': {
        description: 'Client.CaseLawer DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CaseLawer)) where?: Where<CaseLawer>,
  ): Promise<Count> {
    return this.clientRepository.caseLawers(id).delete(where);
  }
}

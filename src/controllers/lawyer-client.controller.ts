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
  Lawyer,
  Client,
} from '../models';
import {LawyerRepository} from '../repositories';

export class LawyerClientController {
  constructor(
    @repository(LawyerRepository) protected lawyerRepository: LawyerRepository,
  ) { }

  @get('/lawyers/{id}/clients', {
    responses: {
      '200': {
        description: 'Array of Lawyer has many Client',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Client)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Client>,
  ): Promise<Client[]> {
    return this.lawyerRepository.clients(id).find(filter);
  }

  @post('/lawyers/{id}/clients', {
    responses: {
      '200': {
        description: 'Lawyer model instance',
        content: {'application/json': {schema: getModelSchemaRef(Client)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Lawyer.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Client, {
            title: 'NewClientInLawyer',
            exclude: ['id'],
            optional: ['lawyerId']
          }),
        },
      },
    }) client: Omit<Client, 'id'>,
  ): Promise<Client> {
    return this.lawyerRepository.clients(id).create(client);
  }

  @patch('/lawyers/{id}/clients', {
    responses: {
      '200': {
        description: 'Lawyer.Client PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Client, {partial: true}),
        },
      },
    })
    client: Partial<Client>,
    @param.query.object('where', getWhereSchemaFor(Client)) where?: Where<Client>,
  ): Promise<Count> {
    return this.lawyerRepository.clients(id).patch(client, where);
  }

  @del('/lawyers/{id}/clients', {
    responses: {
      '200': {
        description: 'Lawyer.Client DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Client)) where?: Where<Client>,
  ): Promise<Count> {
    return this.lawyerRepository.clients(id).delete(where);
  }
}

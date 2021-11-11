import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Consultor} from '../models';
import {ConsultorRepository} from '../repositories';

export class ConsultorController {
  constructor(
    @repository(ConsultorRepository)
    public consultorRepository : ConsultorRepository,
  ) {}

  @post('/consultors')
  @response(200, {
    description: 'Consultor model instance',
    content: {'application/json': {schema: getModelSchemaRef(Consultor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consultor, {
            title: 'NewConsultor',
            exclude: ['id'],
          }),
        },
      },
    })
    consultor: Omit<Consultor, 'id'>,
  ): Promise<Consultor> {
    return this.consultorRepository.create(consultor);
  }

  @get('/consultors/count')
  @response(200, {
    description: 'Consultor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Consultor) where?: Where<Consultor>,
  ): Promise<Count> {
    return this.consultorRepository.count(where);
  }

  @get('/consultors')
  @response(200, {
    description: 'Array of Consultor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Consultor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Consultor) filter?: Filter<Consultor>,
  ): Promise<Consultor[]> {
    return this.consultorRepository.find(filter);
  }

  @patch('/consultors')
  @response(200, {
    description: 'Consultor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consultor, {partial: true}),
        },
      },
    })
    consultor: Consultor,
    @param.where(Consultor) where?: Where<Consultor>,
  ): Promise<Count> {
    return this.consultorRepository.updateAll(consultor, where);
  }

  @get('/consultors/{id}')
  @response(200, {
    description: 'Consultor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Consultor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Consultor, {exclude: 'where'}) filter?: FilterExcludingWhere<Consultor>
  ): Promise<Consultor> {
    return this.consultorRepository.findById(id, filter);
  }

  @patch('/consultors/{id}')
  @response(204, {
    description: 'Consultor PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consultor, {partial: true}),
        },
      },
    })
    consultor: Consultor,
  ): Promise<void> {
    await this.consultorRepository.updateById(id, consultor);
  }

  @put('/consultors/{id}')
  @response(204, {
    description: 'Consultor PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() consultor: Consultor,
  ): Promise<void> {
    await this.consultorRepository.replaceById(id, consultor);
  }

  @del('/consultors/{id}')
  @response(204, {
    description: 'Consultor DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.consultorRepository.deleteById(id);
  }
}

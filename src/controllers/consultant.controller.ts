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
import {Consultant} from '../models';
import {ConsultantRepository} from '../repositories';

export class ConsultantController {
  constructor(
    @repository(ConsultantRepository)
    public consultantRepository : ConsultantRepository,
  ) {}

  @post('/consultants')
  @response(200, {
    description: 'Consultant model instance',
    content: {'application/json': {schema: getModelSchemaRef(Consultant)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consultant, {
            title: 'NewConsultant',
            exclude: ['id'],
          }),
        },
      },
    })
    consultant: Omit<Consultant, 'id'>,
  ): Promise<Consultant> {
    return this.consultantRepository.create(consultant);
  }

  @get('/consultants/count')
  @response(200, {
    description: 'Consultant model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Consultant) where?: Where<Consultant>,
  ): Promise<Count> {
    return this.consultantRepository.count(where);
  }

  @get('/consultants')
  @response(200, {
    description: 'Array of Consultant model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Consultant, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Consultant) filter?: Filter<Consultant>,
  ): Promise<Consultant[]> {
    return this.consultantRepository.find(filter);
  }

  @patch('/consultants')
  @response(200, {
    description: 'Consultant PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consultant, {partial: true}),
        },
      },
    })
    consultant: Consultant,
    @param.where(Consultant) where?: Where<Consultant>,
  ): Promise<Count> {
    return this.consultantRepository.updateAll(consultant, where);
  }

  @get('/consultants/{id}')
  @response(200, {
    description: 'Consultant model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Consultant, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Consultant, {exclude: 'where'}) filter?: FilterExcludingWhere<Consultant>
  ): Promise<Consultant> {
    return this.consultantRepository.findById(id, filter);
  }

  @patch('/consultants/{id}')
  @response(204, {
    description: 'Consultant PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consultant, {partial: true}),
        },
      },
    })
    consultant: Consultant,
  ): Promise<void> {
    await this.consultantRepository.updateById(id, consultant);
  }

  @put('/consultants/{id}')
  @response(204, {
    description: 'Consultant PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() consultant: Consultant,
  ): Promise<void> {
    await this.consultantRepository.replaceById(id, consultant);
  }

  @del('/consultants/{id}')
  @response(204, {
    description: 'Consultant DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.consultantRepository.deleteById(id);
  }
}

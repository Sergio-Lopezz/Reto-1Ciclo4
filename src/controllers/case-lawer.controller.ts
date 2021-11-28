import {authenticate} from '@loopback/authentication';
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
import {CaseLawer} from '../models';
import {CaseLawerRepository} from '../repositories';

export class CaseLawerController {
  constructor(
    @repository(CaseLawerRepository)
    public caseLawerRepository : CaseLawerRepository,
  ) {}

  @authenticate("admin")
  @post('/case-lawers')
  @response(200, {
    description: 'CaseLawer model instance',
    content: {'application/json': {schema: getModelSchemaRef(CaseLawer)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CaseLawer, {
            title: 'NewCaseLawer',
            exclude: ['id'],
          }),
        },
      },
    })
    caseLawer: Omit<CaseLawer, 'id'>,
  ): Promise<CaseLawer> {
    return this.caseLawerRepository.create(caseLawer);
  }

  @get('/case-lawers/count')
  @response(200, {
    description: 'CaseLawer model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CaseLawer) where?: Where<CaseLawer>,
  ): Promise<Count> {
    return this.caseLawerRepository.count(where);
  }

  @get('/case-lawers')
  @response(200, {
    description: 'Array of CaseLawer model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CaseLawer, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CaseLawer) filter?: Filter<CaseLawer>,
  ): Promise<CaseLawer[]> {
    return this.caseLawerRepository.find(filter);
  }

  @patch('/case-lawers')
  @response(200, {
    description: 'CaseLawer PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CaseLawer, {partial: true}),
        },
      },
    })
    caseLawer: CaseLawer,
    @param.where(CaseLawer) where?: Where<CaseLawer>,
  ): Promise<Count> {
    return this.caseLawerRepository.updateAll(caseLawer, where);
  }

  @get('/case-lawers/{id}')
  @response(200, {
    description: 'CaseLawer model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CaseLawer, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CaseLawer, {exclude: 'where'}) filter?: FilterExcludingWhere<CaseLawer>
  ): Promise<CaseLawer> {
    return this.caseLawerRepository.findById(id, filter);
  }

  @patch('/case-lawers/{id}')
  @response(204, {
    description: 'CaseLawer PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CaseLawer, {partial: true}),
        },
      },
    })
    caseLawer: CaseLawer,
  ): Promise<void> {
    await this.caseLawerRepository.updateById(id, caseLawer);
  }

  @put('/case-lawers/{id}')
  @response(204, {
    description: 'CaseLawer PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() caseLawer: CaseLawer,
  ): Promise<void> {
    await this.caseLawerRepository.replaceById(id, caseLawer);
  }

  @del('/case-lawers/{id}')
  @response(204, {
    description: 'CaseLawer DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.caseLawerRepository.deleteById(id);
  }
}

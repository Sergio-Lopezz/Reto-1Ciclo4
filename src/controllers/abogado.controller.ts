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
import {Abogado} from '../models';
import {AbogadoRepository} from '../repositories';

export class AbogadoController {
  constructor(
    @repository(AbogadoRepository)
    public abogadoRepository : AbogadoRepository,
  ) {}

  @post('/abogados')
  @response(200, {
    description: 'Abogado model instance',
    content: {'application/json': {schema: getModelSchemaRef(Abogado)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Abogado, {
            title: 'NewAbogado',
            exclude: ['id'],
          }),
        },
      },
    })
    abogado: Omit<Abogado, 'id'>,
  ): Promise<Abogado> {
    return this.abogadoRepository.create(abogado);
  }

  @get('/abogados/count')
  @response(200, {
    description: 'Abogado model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Abogado) where?: Where<Abogado>,
  ): Promise<Count> {
    return this.abogadoRepository.count(where);
  }

  @get('/abogados')
  @response(200, {
    description: 'Array of Abogado model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Abogado, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Abogado) filter?: Filter<Abogado>,
  ): Promise<Abogado[]> {
    return this.abogadoRepository.find(filter);
  }

  @patch('/abogados')
  @response(200, {
    description: 'Abogado PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Abogado, {partial: true}),
        },
      },
    })
    abogado: Abogado,
    @param.where(Abogado) where?: Where<Abogado>,
  ): Promise<Count> {
    return this.abogadoRepository.updateAll(abogado, where);
  }

  @get('/abogados/{id}')
  @response(200, {
    description: 'Abogado model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Abogado, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Abogado, {exclude: 'where'}) filter?: FilterExcludingWhere<Abogado>
  ): Promise<Abogado> {
    return this.abogadoRepository.findById(id, filter);
  }

  @patch('/abogados/{id}')
  @response(204, {
    description: 'Abogado PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Abogado, {partial: true}),
        },
      },
    })
    abogado: Abogado,
  ): Promise<void> {
    await this.abogadoRepository.updateById(id, abogado);
  }

  @put('/abogados/{id}')
  @response(204, {
    description: 'Abogado PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() abogado: Abogado,
  ): Promise<void> {
    await this.abogadoRepository.replaceById(id, abogado);
  }

  @del('/abogados/{id}')
  @response(204, {
    description: 'Abogado DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.abogadoRepository.deleteById(id);
  }
}

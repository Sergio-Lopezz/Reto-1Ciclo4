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
import {Lawyer} from '../models';
import {LawyerRepository} from '../repositories';

export class LawyerController {
  constructor(
    @repository(LawyerRepository)
    public lawyerRepository : LawyerRepository,
  ) {}

  @post('/lawyers')
  @response(200, {
    description: 'Lawyer model instance',
    content: {'application/json': {schema: getModelSchemaRef(Lawyer)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lawyer, {
            title: 'NewLawyer',
            exclude: ['id'],
          }),
        },
      },
    })
    lawyer: Omit<Lawyer, 'id'>,
  ): Promise<Lawyer> {
    return this.lawyerRepository.create(lawyer);
  }

  @get('/lawyers/count')
  @response(200, {
    description: 'Lawyer model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Lawyer) where?: Where<Lawyer>,
  ): Promise<Count> {
    return this.lawyerRepository.count(where);
  }

  @get('/lawyers')
  @response(200, {
    description: 'Array of Lawyer model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Lawyer, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Lawyer) filter?: Filter<Lawyer>,
  ): Promise<Lawyer[]> {
    return this.lawyerRepository.find(filter);
  }

  @patch('/lawyers')
  @response(200, {
    description: 'Lawyer PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lawyer, {partial: true}),
        },
      },
    })
    lawyer: Lawyer,
    @param.where(Lawyer) where?: Where<Lawyer>,
  ): Promise<Count> {
    return this.lawyerRepository.updateAll(lawyer, where);
  }

  @get('/lawyers/{id}')
  @response(200, {
    description: 'Lawyer model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Lawyer, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Lawyer, {exclude: 'where'}) filter?: FilterExcludingWhere<Lawyer>
  ): Promise<Lawyer> {
    return this.lawyerRepository.findById(id, filter);
  }

  @patch('/lawyers/{id}')
  @response(204, {
    description: 'Lawyer PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lawyer, {partial: true}),
        },
      },
    })
    lawyer: Lawyer,
  ): Promise<void> {
    await this.lawyerRepository.updateById(id, lawyer);
  }

  @put('/lawyers/{id}')
  @response(204, {
    description: 'Lawyer PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() lawyer: Lawyer,
  ): Promise<void> {
    await this.lawyerRepository.replaceById(id, lawyer);
  }

  @del('/lawyers/{id}')
  @response(204, {
    description: 'Lawyer DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.lawyerRepository.deleteById(id);
  }
}

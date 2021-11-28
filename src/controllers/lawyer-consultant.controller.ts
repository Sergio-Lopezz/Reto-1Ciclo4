import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Lawyer,
  Consultant,
} from '../models';
import {LawyerRepository} from '../repositories';

export class LawyerConsultantController {
  constructor(
    @repository(LawyerRepository)
    public lawyerRepository: LawyerRepository,
  ) { }

  @get('/lawyers/{id}/consultant', {
    responses: {
      '200': {
        description: 'Consultant belonging to Lawyer',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Consultant)},
          },
        },
      },
    },
  })
  async getConsultant(
    @param.path.string('id') id: typeof Lawyer.prototype.id,
  ): Promise<Consultant> {
    return this.lawyerRepository.consultant(id);
  }
}

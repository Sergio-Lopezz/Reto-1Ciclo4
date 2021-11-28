import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Comments,
  CaseLawer,
} from '../models';
import {CommentsRepository} from '../repositories';

export class CommentsCaseLawerController {
  constructor(
    @repository(CommentsRepository)
    public commentsRepository: CommentsRepository,
  ) { }

  @get('/comments/{id}/case-lawer', {
    responses: {
      '200': {
        description: 'CaseLawer belonging to Comments',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CaseLawer)},
          },
        },
      },
    },
  })
  async getCaseLawer(
    @param.path.string('id') id: typeof Comments.prototype.id,
  ): Promise<CaseLawer> {
    return this.commentsRepository.caseLawer(id);
  }
}

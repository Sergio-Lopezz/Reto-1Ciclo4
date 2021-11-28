import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CaseLawer, CaseLawerRelations, Lawyer, Client, Comments} from '../models';
import {LawyerRepository} from './lawyer.repository';
import {ClientRepository} from './client.repository';
import {CommentsRepository} from './comments.repository';

export class CaseLawerRepository extends DefaultCrudRepository<
  CaseLawer,
  typeof CaseLawer.prototype.id,
  CaseLawerRelations
> {

  public readonly lawyer: BelongsToAccessor<Lawyer, typeof CaseLawer.prototype.id>;

  public readonly client: BelongsToAccessor<Client, typeof CaseLawer.prototype.id>;

  public readonly comments: HasManyRepositoryFactory<Comments, typeof CaseLawer.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('LawyerRepository') protected lawyerRepositoryGetter: Getter<LawyerRepository>, @repository.getter('ClientRepository') protected clientRepositoryGetter: Getter<ClientRepository>, @repository.getter('CommentsRepository') protected commentsRepositoryGetter: Getter<CommentsRepository>,
  ) {
    super(CaseLawer, dataSource);
    this.comments = this.createHasManyRepositoryFactoryFor('comments', commentsRepositoryGetter,);
    this.registerInclusionResolver('comments', this.comments.inclusionResolver);
    this.client = this.createBelongsToAccessorFor('client', clientRepositoryGetter,);
    this.registerInclusionResolver('client', this.client.inclusionResolver);
    this.lawyer = this.createBelongsToAccessorFor('lawyer', lawyerRepositoryGetter,);
    this.registerInclusionResolver('lawyer', this.lawyer.inclusionResolver);
  }
}

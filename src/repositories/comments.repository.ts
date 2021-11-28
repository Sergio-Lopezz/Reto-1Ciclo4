import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Comments, CommentsRelations, CaseLawer} from '../models';
import {CaseLawerRepository} from './case-lawer.repository';

export class CommentsRepository extends DefaultCrudRepository<
  Comments,
  typeof Comments.prototype.id,
  CommentsRelations
> {

  public readonly caseLawer: BelongsToAccessor<CaseLawer, typeof Comments.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CaseLawerRepository') protected caseLawerRepositoryGetter: Getter<CaseLawerRepository>,
  ) {
    super(Comments, dataSource);
    this.caseLawer = this.createBelongsToAccessorFor('caseLawer', caseLawerRepositoryGetter,);
    this.registerInclusionResolver('caseLawer', this.caseLawer.inclusionResolver);
  }
}

import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Consultor, ConsultorRelations} from '../models';

export class ConsultorRepository extends DefaultCrudRepository<
  Consultor,
  typeof Consultor.prototype.id,
  ConsultorRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Consultor, dataSource);
  }
}

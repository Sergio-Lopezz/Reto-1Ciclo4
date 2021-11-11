import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PuenteAbogadoConsultor, PuenteAbogadoConsultorRelations} from '../models';

export class PuenteAbogadoConsultorRepository extends DefaultCrudRepository<
  PuenteAbogadoConsultor,
  typeof PuenteAbogadoConsultor.prototype.id,
  PuenteAbogadoConsultorRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(PuenteAbogadoConsultor, dataSource);
  }
}

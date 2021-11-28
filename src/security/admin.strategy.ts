import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {AutenticationService} from '../services';

export class AdminStrategy implements AuthenticationStrategy{
  name: string= "admin";

  constructor(
    @service(AutenticationService)
    public servicioAutenticacion: AutenticationService
  ){}

  async authenticate(request: Request): Promise<UserProfile | undefined>{
    let token=parseBearerToken(request);
    if(token){
      let data_admin= this.servicioAutenticacion.ValidarTokenJWT(token);
      if(data_admin){
        let admin_info:UserProfile= Object.assign({
          name:data_admin.data.name,
          email:data_admin.data.email
        });
        return admin_info;
      }else{
        throw new HttpErrors[401]("El Token incluido no es valido")
      }
    }else{
      throw new HttpErrors[401]("No se ha incluido un Token en la solicitud")
    }
  }
}

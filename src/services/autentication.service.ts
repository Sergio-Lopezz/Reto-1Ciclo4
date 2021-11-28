import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {ClientRepository} from '../repositories';
import {Client} from '../models';
import {Keys} from '../config/keys';

const generador=require("password-generator");
const cryptoJS = require("crypto-js");
const jwt=require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticationService {
  constructor(
    @repository(ClientRepository)
    public clientRepository: ClientRepository
    /* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */

  GenerarClave(){
    let clave=generador(8,false);
    return clave;
  }

  CifrarClave(clave: string){
    let claveCifrada=cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  IdentificarPersona(usuario: string, clave: string){
    try{
      let p = this.clientRepository.findOne({where:{email:usuario, password:clave}});
      if(p){
        return p;
      }
      return false;
    }catch{
      return false;
    }
  }

  GenerarTokenJWT(client: Client){
    let token=jwt.sign({
      data:{
        id: client.id,
        email: client.email,
        name: client.name + " " + client.lastname,
      },
    },
    Keys.JWTkey);
    return token;
  }

  ValidarTokenJWT(token:string){
    try{
      let datos=jwt.verify(token, Keys.JWTkey);
      return datos;
    }catch{
      return false;
    }
  }
}

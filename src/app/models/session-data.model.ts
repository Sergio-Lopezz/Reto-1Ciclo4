import { ConsultantData } from "./consultant-data.model";

export class SessionData{
    token?: string;
    consultant?: ConsultantData;
    isLoggedIn?: boolean = false;
}
import { UserInterface } from "./user";

export interface AccountInterface extends UserInterface {
    os:string;
    devicename:string;
    isactive:boolean;
    appversion:string;
     password:string,
    pushtoken:string,
}
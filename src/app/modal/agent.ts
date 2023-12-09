export class Agent {
    public nom!:string;
    public email!:string;

    public merchant!:string;
    public location!:string;
    public imei!:string;
    public id!:string;
    public modifiedBy!:string;
    public solde!:string;
    public agence!:string;
    public contribuable!:string;
    public region!:string;
    public CNI!:string;
    public tel!:string;
    


constructor(nom:string,merchant:string,location:string,imei:string,id:string,modifiedBy:string){
    this.nom=nom;
    this.merchant=merchant;
    this.location=location;
    this.imei=imei;
    this.id=id;
this.modifiedBy=modifiedBy;

    
}



}

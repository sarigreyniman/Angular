export class Lecturer{
    lecturerCode:number;
    lecturerName:string;
    address:string;
    email:string;
    password:string;

  constructor(codeLecturer:number,nameLecturer:string,address:string,email:string,password:string){
    this.lecturerCode=codeLecturer;
    this.lecturerName=nameLecturer;
    this.address=address;
    this.email=email;
    this.password=password;
  }
}

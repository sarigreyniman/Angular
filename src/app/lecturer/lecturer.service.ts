import { Injectable } from '@angular/core';
import { Lecturer } from './lecturer.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LecturerService {

  getLecturses():Observable<Lecturer[]>{
    return this._http.get<Lecturer[]>("/api/lecturers/");
}
getLectursesBypasname(name:string,password:string):Observable<any>{
  return this._http.post<any>("/api/lecturers/check",{name,password});
}

postLecturses(lecture: Lecturer): Observable<boolean> {
    return this._http.post<boolean>("/api/lecturers/",lecture);
  }
  putLecturses(updateLecture: Lecturer, id : Number): Observable<boolean> {
    return this._http.put<boolean>("/api/lecturers/" + id,updateLecture)
  }
  deleteLecturses(id : Number): Observable<boolean> {
    return this._http.delete<boolean>("/api/lecturers/" + id)
  }
  loginLecturses(name: string, password: string): Observable<boolean> {
    return this._http.post<boolean>("/api/lecturers/login", { name, password });
}
constructor(private _http:HttpClient){

} 
}

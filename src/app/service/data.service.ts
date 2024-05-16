
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getData(): Observable<any> {
    return this.httpClient.get(environment.apiUrl+'/api/employees');
  }

  insertData(data: Employee): Observable<any> {
    return this.httpClient.post(environment.apiUrl+'/api/addEmployee', data);
  }

  deleteData(id: number): Observable<any> {
    return this.httpClient.delete(environment.apiUrl+'/api/deleteEmployee/'+id);
  }

  getEmployeeById(id: number){
    return this.httpClient.get(environment.apiUrl+'/api/employee/'+id);
  }

  updateDataByID(id:any ,data: Employee){
    return this.httpClient.put(environment.apiUrl+'/api/updateEmployee/'+id, data); // http://127.0.0.1:8000/api/updateEmployee/
  }

  registerUser(data: any) {
    return this.httpClient.post(environment.apiUrl+'/api/register/', data);
  }

}

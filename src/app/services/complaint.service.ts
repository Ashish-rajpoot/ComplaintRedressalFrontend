import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Complaint } from '../models/complaint';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8081/complaint';

@Injectable({
  providedIn: 'root',
})
export class ComplaintService {
  constructor(private http: HttpClient) {}
  
  addComplaint(complaint: Complaint): Observable<any> {
    return this.http.post(`${BASE_URL}/add`, complaint, {
      // headers: { 'Content-Type': 'applicationjson' },
      // withCredentials:true
    });
  }
  
  getComplaint():Observable<any> {
    return this.http.get<any>(`${BASE_URL}/getComplaints`,);
  }
  
  getComplaintByRole(role:any):Observable<any> {
    return this.http.get<any>(`${BASE_URL}/${role}`,);
  }
  
  getComplaintByEmail(email:any):Observable<any> {
    return this.http.get<any>(`${BASE_URL}/by-email/${email}`,);
  }
  
  forwardComplaint(complaintid:any, roleId:any):Observable<any>{
    return this.http.put<any>(`${BASE_URL}/forwardComplaint/${complaintid}`,roleId);
  }
  updateDescription(complaintid:any, description:any):Observable<any>{
    return this.http.put<any>(`${BASE_URL}/updateDescription/${complaintid}`,description);
  }
  isResolved(complaintid:any, isResolved:any):Observable<any>{
    return this.http.put<any>(`${BASE_URL}/isResolved/${complaintid}`,isResolved);
  }
  getComplaintById(complaintid:any):Observable<any> {
    return this.http.get<any>(`${BASE_URL}/complaintid/${complaintid}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Complaint } from '../models/complaint';
import { Observable } from 'rxjs';
import { BASE_URL } from '../constants/constant';

const COMPLAINT_URL = `${BASE_URL}/complaint`;

@Injectable({
  providedIn: 'root',
})
export class ComplaintService {
  constructor(private http: HttpClient) {}

  addComplaint(complaint: Complaint): Observable<any> {
    return this.http.post(`${COMPLAINT_URL}/add`, complaint, {
      // headers: { 'Content-Type': 'applicationjson' },
      // withCredentials:true
    });
  }

  getComplaint(): Observable<any> {
    return this.http.get<any>(`${COMPLAINT_URL}/getComplaints`);
  }

  getComplaintByRole(role: any): Observable<any> {
    return this.http.get<any>(`${COMPLAINT_URL}/${role}`);
  }

  getComplaintByEmail(email: any): Observable<any> {
    return this.http.get<any>(`${COMPLAINT_URL}/by-email/${email}`);
  }

  forwardComplaint(complaintid: any, roleId: any): Observable<any> {
    return this.http.put<any>(
      `${COMPLAINT_URL}/forwardComplaint/${complaintid}`,
      roleId
    );
  }
  updateDescription(complaintid: any, description: any): Observable<any> {
    return this.http.put<any>(
      `${COMPLAINT_URL}/updateDescription/${complaintid}`,
      description
    );
  }
  isResolved(complaintid: any, isResolved: any): Observable<any> {
    return this.http.put<any>(
      `${COMPLAINT_URL}/isResolved/${complaintid}`,
      isResolved
    );
  }
  getComplaintById(complaintid: any): Observable<any> {
    return this.http.get<any>(`${COMPLAINT_URL}/complaintid/${complaintid}`);
  }
}

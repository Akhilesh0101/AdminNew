// admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// admin.interface.ts
export interface AdminProfile {
  AdminId: number;
  Username: string;
  Email: string;
  Password: string;
  HealthTips: any[];
  Products: any[];
  Remedies: any[];
  Role: string | null;
  RoleId: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'https://localhost:44348/api/Admins'; // API URL

  constructor(private http: HttpClient) {}

  // Fetch the admin profile from the backend
  getAdminProfile(): Observable<AdminProfile> {
    return this.http.get<AdminProfile>(`${this.apiUrl}`);  // Adjust the API endpoint based on your backend
  }

  // Optionally, you could also add update functionality
  updateAdminProfile(adminData: AdminProfile): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, adminData); // Adjust the endpoint if needed
  }
}

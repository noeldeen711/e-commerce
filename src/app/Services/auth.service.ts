import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient , private router : Router) { }

  currentUserSubject = new BehaviorSubject<string | null>(this.getUserName())
  currentUserEmail = new BehaviorSubject<string | null>(this.getUserEmail())

  isLoggedIn = new BehaviorSubject<boolean>(localStorage.getItem("applicationToken")?true:false);
  currentUserNameSubject = new BehaviorSubject<string|null>(this.getUserName());
  currentUserEmailSubject = new BehaviorSubject<string|null>(this.getUserEmail());



  getUserEmail() {
    let Token = localStorage.getItem("applicationToken");
    if (Token) {
      let decodedToken: any = jwtDecode(Token);
      return decodedToken.email
    }
    return null
  }

  getUserName() {
    let Token = localStorage.getItem("applicationToken");
    if (Token) {
      let decodedToken: any = jwtDecode(Token);
      return decodedToken.name
    }
    return null
  }

  register(RegisterObj: any): Observable<any> {
    return this.httpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signup", RegisterObj)
  }


  login(loginObj: any): Observable<any> {
    return this.httpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signin", loginObj)
  }

  logOut() {
    localStorage.removeItem("applicationToken");
    this.isLoggedIn.next (false);
    this.currentUserNameSubject.next(null);
    this.currentUserEmailSubject.next(null);
    this.router.navigate(["/login"])
    

  }


  forgetPass(forgetObj: any): Observable<any> {
    return this.httpClient.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", forgetObj)
  }


  verifyCode(verifyCodeObj: any): Observable<any> {
    return this.httpClient.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", verifyCodeObj)
  }


  resetPassword(resetPass: any): Observable<any> {
    return this.httpClient.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", resetPass)
  }

  resetPass(resetPassword: any): Observable<any> {
    return this.httpClient.put("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword", resetPassword)
  }

  editInfo(editInfo: any): Observable<any> {
    return this.httpClient.put("https://ecommerce.routemisr.com/api/v1/users/updateMe", editInfo)
  }


}


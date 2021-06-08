import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from '@firebase/app';
import 'firebase/app'
//import { Router } from '@angular/router';
//import { auth } from 'firebase';
//import auth from "firebase/app";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})



export class FormComponent implements OnInit {

  @Input() action = '';

  
  email = 'email@example.com';
  passw = '123456';

  constructor(private auth: AngularFireAuth
              ) {
  }
  

  ngOnInit(): void {
    console.log(this.action);
    }


  loginWithGoogle() {
    this.auth.auth.signInWithPopup(new auth.GoogleAuthProvider);
    
  }
  logout() {
    this.auth.signOut();
  }

}

import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  signUpButton!: HTMLElement;
  signInButton!: HTMLElement;
  container!: HTMLElement;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.signUpButton = this.el.nativeElement.querySelector('#signUp');
    this.signInButton = this.el.nativeElement.querySelector('#signIn');
    this.container = this.el.nativeElement.querySelector('#container');

    this.signUpButton.addEventListener('click', () => {
      this.container.classList.add('right-panel-active');
    });

    this.signInButton.addEventListener('click', () => {
      this.container.classList.remove('right-panel-active');
    });

    this.verifySgnIn();
  }

  // verificar si el usuario esta logeado
  verifySgnIn(){

  }
}

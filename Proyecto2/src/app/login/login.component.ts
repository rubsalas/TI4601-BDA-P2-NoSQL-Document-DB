import { Component, ElementRef, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AppComponent } from '../app.component';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  signUpButton!: HTMLElement;
  signInButton!: HTMLElement;
  container!: HTMLElement;
  usrList: any = [];
  loginForm: any;
  signUpForm: any;

  constructor(private el: ElementRef, private api:ApiService, private app:AppComponent, private formBuilder:FormBuilder) { 
    // formato del formulario para inicio de sesion
    this.loginForm = this.formBuilder.group({
      correo: '',
      contra: ''
    });
    this.signUpForm = this.formBuilder.group({
      nombre: '',
      correo: '',
      contra: '',
      puesto: '',
      depa: ''
    });
   }

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

  }

  // verificar si el usuario tiene una cuenta registrada
  verifySgnIn(loginData:any){ // pasarle el usuario y contrasena y verificar si existen y coinciden
    console.log(loginData);

    // hacer el get de usuarios ----->
    this.api.getUsers().subscribe(data=>{
      this.usrList = data;
      console.log(data);

      // recorrer la lista y verificar que tipo de usuario es ----->
      for (let i = 0; i < this.usrList.length; i++) {
        // si es admin y la cuenta existe
        if(this.usrList[i].puesto == "administrador" && loginData.email == this.usrList[i].email && loginData.password == this.usrList[i].password){
          this.api.setLoggedAdmin(true);
          this.api.user = this.usrList[i]; // se guarda los datos de la sesion del usuario
          break;
        }
        // si es colaborador y la cuenta existe
        else if(loginData.email == this.usrList[i].email && loginData.password == this.usrList[i].password){
          this.api.setLoggedCollab(true);
          this.api.user = this.usrList[i]; // se guarda los datos de la sesion del usuario
          break;
        }
      }
    });

    // dar acceso al usuario segun su rol
    const collabLogged = this.api.getLoggedCollab();
    const AdminLogged = this.api.getLoggedAdmin();
    if(collabLogged){ // Si el usuario esta loggeado, muestre los botones del menu de acuerdo a su rol
      this.app.isColab = true;
      this.alertaOkColab();
      // llamar al componente principal para que muestre los botones de acuerdo con el perfil del usuario
      this.app.checkLogged()
    }
    else if(AdminLogged){ // Si es un admin, muestre los botones del menu de acuerdo a su rol
      this.app.isAdmin = true;
      this.alertaOkAdmin();
      // llamar al componente principal para que muestre los botones de acuerdo con el perfil del usuario
      this.app.checkLogged()
    }
    else{ // si no se ha ncontrado una cuenta, mostrar mensaje de error
      this.alertaError()
    }
  }

  // crear cuenta nueva
  createAccount(accountData:any){
    if(accountData.nombre != '' && accountData.email != '' && accountData.password != '' && accountData.rol != ''&& accountData.department !=''){
      // hacer post del nuevo usuario
      console.log(accountData);
      
      this.api.addUsr(accountData).subscribe(
        response => {console.log('Respuesta del servidor:', response);},
        error => {console.error('Error en la solicitud POST:', error);}
      );
      // mostrar alreta de creacion de cuenta exitosa
      this.alertaOkReg();
    }
    else{
      this.alertaErrorReg();
    }

  }


  // Alertas de exito u error al iniciar sesion
  alertaOkAdmin() {
    alert('Bienvenido Administrador! Ha iniciado sesión correctamente.');
  }
  alertaOkColab() {
    alert('Bienvenido Colaborador! Ha iniciado sesión correctamente.');
  }
  alertaError() {
    alert('Error. Usuario o contraseña incorrectos, inténte iniciar sesión de nuevo!');
  }

  // alertas para creacion de cuenta
  alertaOkReg() {
    alert('Cuenta registrada correctamente! Inicie sesión para acceder.');
  }
  alertaErrorReg() {
    alert('Error. Debe llenar todos los campos con sus datos!');
  }
}

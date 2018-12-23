import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../api/services/accountService";
import {Router} from "@angular/router";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  @ViewChild('productFormDirective') loginFormDirective;
  isErrorAuthorization: boolean = false;
  isSuccessAuthorization: boolean = false;
  loginFormErrors = {
    'email': '',
    'password': ''
  };
  validationMessages = {
    'email': {
      'required': 'Вкажіть електронну адресу.',
      'email': 'Е-mail адреса не валідна.'
    },
    'password': {
      'required': 'Вкажіть пароль.'
    }
  };
  constructor(private formBuilder: FormBuilder,
              private accountService: AccountService,
              private router: Router) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: ['true']
    });

    this.loginForm.valueChanges
      .subscribe(data => {
        this.onDataChanged(data);
      });

    this.onDataChanged();
  }

  onDataChanged(data?: any) {
    if (!this.loginForm) {
      return;
    }
    const form = this.loginForm;
    for (const field in this.loginFormErrors) {
      if (this.loginFormErrors.hasOwnProperty(field)) {
        this.loginFormErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.loginFormErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.accountService.logIn(this.loginForm.value).subscribe(data => {
      console.log(data);
      if(data.userId) {
        this.isSuccessAuthorization = true;
        this.accountService.setLoggedIn(true);
        if(data.roles[0] === 'Admin') {
          this.accountService.setAdmin(true);
        }
        setTimeout(() => {
          this.isSuccessAuthorization = false;
          this.router.navigate(['/add-product']);
        }, 2000);

      }
      },
      (error: HttpErrorResponse) => {
        if(error.status == 400) {
          this.isErrorAuthorization = true;

          setTimeout(() => {
            this.isErrorAuthorization = false;
          }, 2000);
        }
    });

  }
}

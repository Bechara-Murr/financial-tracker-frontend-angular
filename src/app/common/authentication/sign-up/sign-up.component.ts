import { Component, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MustMatch } from 'src/app/_helpers/ValidationFunctions';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserRegistration, UserRole } from 'src/app/model/User.model';

export class SignUpErrorStatMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && isSubmitted);
  }
}

@Component({
  selector: 'app-sign-up',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  constructor(private authService: AuthenticationService) {}
  signupForm = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(\\+\\d{1,2}\\s?)?1?-?\\s?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$'
        ),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    },
    {
      validators: MustMatch('password', 'confirmPassword'),
    }
  );

  @ViewChild(FormGroupDirective)
  private formDir!: FormGroupDirective;

  matcher = new SignUpErrorStatMatcher();

  onSubmit() {
    let signUpFormValue: Partial<UserRegistration> = this.signupForm.value;
    const roles: UserRole[] = [
      {
        id: '7f000001-984d-1656-8198-4d16780e0000',
      },
    ];

    signUpFormValue['roles'] = roles;

    this.authService.createUser(signUpFormValue).subscribe({
      next: (res) => {
        console.log('User created', res.message);
        this.formDir.resetForm();
      },
      error: (err) => console.error('Error creating user', err),
    });
  }
}

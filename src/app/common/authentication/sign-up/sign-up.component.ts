import { Component } from '@angular/core';
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
  signupForm = new FormGroup(
    {
      firstNameFormControl: new FormControl('', [Validators.required]),
      lastNameFormControl: new FormControl('', [Validators.required]),
      emailFormControl: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      phoneNumberFormControl: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(\\+\\d{1,2}\\s?)?1?-?\\s?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$'
        ),
      ]),
      passwordFormControl: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPasswordFormControl: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    },
    {
      validators: MustMatch(
        'passwordFormControl',
        'confirmPasswordFormControl'
      ),
    }
  );

  matcher = new SignUpErrorStatMatcher();

  onSubmit() {
    console.warn(this.signupForm.value);

    console.log(
      this.signupForm.get('passwordFormControl')?.hasError('minlength')
    );
  }
}

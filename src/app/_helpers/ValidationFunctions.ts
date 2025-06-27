import { AbstractControl } from '@angular/forms';

export const MustMatch = (field1: string, field2: string) => {
  return (group: AbstractControl) => {
    const control = group.get(field1);
    const matchingControl = group.get(field2);

    if (!control || !matchingControl) {
      return null;
    }

    // return if another validator has aslready found an error on the matchingControl
    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      return null;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
    return null;
  };
};

import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function correctEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const emailAgain = control.value;        
        const email = control.parent?.get('email')?.value;
        return email === emailAgain ? null : { incorrectEmail: true };
    }
}

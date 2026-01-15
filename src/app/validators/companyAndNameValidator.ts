import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export function companyAndNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const companyNameControl = control.get('companyName');
        const fullNameControl = control.get('fullName');
        if (!companyNameControl || !fullNameControl) return null;
        const companyName = companyNameControl.value;
        const fullName = fullNameControl.value;
        if (!companyName && !fullName) {
            return { companyOrNameRequired: true };
        }
        return null;
    };
}

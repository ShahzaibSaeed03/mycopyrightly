import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function stateValidator(countryControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const country = countryControl.value;            
        return country?.trimEnd() === 'United States of America' ? { required: true } : null;
    }
}

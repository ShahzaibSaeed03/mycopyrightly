import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (!value) return null;

        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSpecial = /[$@#&!%*?]/.test(value);
        const isLongEnough = value.length >= 8;

        const strengthScore = [hasUpperCase, hasLowerCase, hasNumber, hasSpecial, isLongEnough].filter(Boolean).length;
        return strengthScore >= 3
            ? null
            : { passwordStrength: 'Password is too weak. Please choose a stronger one.' };
    };

};

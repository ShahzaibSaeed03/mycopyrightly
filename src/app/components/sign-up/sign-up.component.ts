import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SignUpService } from '../../services/sign-up.service';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { companyAndNameValidator } from '../../validators/companyAndNameValidator';
import { PasswordModule } from 'primeng/password';
import { userSignUp } from '../../models/userSignUp.model';
import { DividerModule } from 'primeng/divider';
import { correctEmailValidator } from '../../validators/correctEmailValidator';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HttpResponse } from '@angular/common/http';
import { passwordStrengthValidator } from '../../validators/passwordValidator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ButtonModule, InputTextModule, ReactiveFormsModule, CheckboxModule,
    FormsModule, CommonModule, DropdownModule, PasswordModule, DividerModule, MessageModule, ToastModule],
  providers: [MessageService],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  passwordStrength: string = '';
  constructor(private _signUpService: SignUpService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this._signUpService
        .getCounrtiesList()
        .subscribe({
          next: (data: any) => {
            this.countriesList = data.result.records.map((country: any) => {
              return { name: country.שם_מדינה_אנגלי_במאגר };
            });
          },
          error: (error: { message: any; }) => {
            console.error("Error loading countries,", error);
          }
        }),

      this._signUpService
        .getUSAStates()
        .subscribe({
          next: (data: any) => {
            this.USAStatesList = data.results.map((state: any) => {
              return { name: state.ste_name[0] };
            });
          },
          error: (error: { message: any; }) => {
            console.error("Error loading states,", error);
          }
        }),
      this.PersonalDetails.get('address.country')?.valueChanges?.subscribe(() => {
        const stateControl = this.PersonalDetails.get('address.stateOrRegion');
        if (this.PersonalDetails.get('address.country')?.value?.trimEnd() === 'United States of America')
          stateControl?.setValidators([Validators.required]);
        stateControl?.updateValueAndValidity();
      }),
      this.BillingAddress.get('address.country')?.valueChanges.subscribe(() => {
        const stateControl = this.BillingAddress.get('address.stateOrRegion');
        if (this.BillingAddress.get('address.country')?.value?.trimEnd() === 'United States of America')
          stateControl?.setValidators([Validators.required]);
        stateControl?.updateValueAndValidity();
      }),
      this.BillingAddress.get('companyName')?.valueChanges.subscribe(() => {
        this.PersonalDetails.get('companyName')?.updateValueAndValidity();
      }),
      this.BillingAddress.get('fullName')?.valueChanges.subscribe(() => {
        this.PersonalDetails.get('fullName')?.updateValueAndValidity();
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  countriesList: any[] = [];
  USAStatesList: any[] = [];
  userSignUp: userSignUp = new userSignUp();
  private subscriptions: any[] = [];
  priceForToken: number = 1;

  PersonalDetails = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.maxLength(20)]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.maxLength(20)]),
    address: new FormGroup({
      addressLine1: new FormControl('', [
        Validators.required,
        Validators.maxLength(20)]),
      addressLine2: new FormControl('', Validators.maxLength(20)),
      zipCode: new FormControl('', [
        Validators.required,
        Validators.maxLength(10)]),
      city: new FormControl('', [
        Validators.required,
        Validators.maxLength(30)]),
      stateOrRegion: new FormControl('', [Validators.maxLength(50)]),
      country: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)]),
      phoneNumber: new FormControl('', [
        Validators.minLength(7),
        Validators.maxLength(11),]),
    }),
    profession: new FormControl('', [
      Validators.required,
      Validators.maxLength(20)]),
    howDidYouHearAboutUs: new FormControl('', [
      Validators.required,
      Validators.maxLength(20)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(50),
    ]),
    emailAgain: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(50),
      correctEmailValidator()
    ]),
    password: new FormControl('', [Validators.required, passwordStrengthValidator()]),
  });

  BillingAddress = new FormGroup({
    companyName: new FormControl('', [Validators.maxLength(20)]),
    fullName: new FormControl('', [Validators.maxLength(40)]),
    vatNumber: new FormControl('', Validators.maxLength(20)),
    cascadeAddress: new FormControl(false),
    address: new FormGroup({
      addressLine1: new FormControl('', [
        Validators.required,
        Validators.maxLength(20)
      ]),
      addressLine2: new FormControl('', Validators.maxLength(20)),
      zipCode: new FormControl('', [
        Validators.required,
        Validators.maxLength(20)
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.maxLength(30)
      ]),
      stateOrRegion: new FormControl('', Validators.maxLength(50)),
      country: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      phoneNumber: new FormControl('', [
        Validators.minLength(7),
        Validators.maxLength(11),
      ])
    })
  }, { validators: companyAndNameValidator(), updateOn: 'change' });

  cascadeAddress() {
    if (this.BillingAddress.get('cascadeAddress')?.value) {
      var address = this.PersonalDetails.get('address');
      this.BillingAddress.get('address')?.setValue({
        addressLine1: address?.get('addressLine1')?.value || '',
        addressLine2: address?.get('addressLine2')?.value || '',
        zipCode: address?.get('zipCode')?.value || '',
        city: address?.get('city')?.value || '',
        stateOrRegion: address?.get('stateOrRegion')?.value || '',
        country: address?.get('country')?.value || '',
        phoneNumber: address?.get('phoneNumber')?.value || ''
      });
    }
    else {
      this.BillingAddress.get('address')?.setValue({
        addressLine1: '',
        addressLine2: '',
        zipCode: '',
        city: '',
        stateOrRegion: '',
        country: '',
        phoneNumber: ''
      });
    }
  }

  submit() {
    if (this.PersonalDetails.invalid || this.BillingAddress.invalid) {
      this.PersonalDetails.markAllAsTouched();
      this.PersonalDetails.get('address.country')?.markAsDirty();
      this.PersonalDetails.get('address.stateOrRegion')?.markAsDirty();
      this.PersonalDetails.get('password')?.markAsDirty();
      this.BillingAddress.markAllAsTouched();
      this.BillingAddress.get('address.country')?.markAsDirty();
      this.BillingAddress.get('address.stateOrRegion')?.markAsDirty();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all required fields' });
      return;
    }

    this.userSignUp.firstName = this.PersonalDetails.get('firstName')?.value || '';
    this.userSignUp.lastName = this.PersonalDetails.get('lastName')?.value || '';
    this.userSignUp.address1 = this.PersonalDetails.get('address')?.get('addressLine1')?.value || '';
    this.userSignUp.address2 = this.PersonalDetails.get('address')?.get('addressLine2')?.value || '';
    this.userSignUp.zipCode = this.PersonalDetails.get('address')?.get('zipCode')?.value || '';
    this.userSignUp.city = this.PersonalDetails.get('address')?.get('city')?.value || '';
    this.userSignUp.stateRegion = this.PersonalDetails.get('address')?.get('stateOrRegion')?.value || '';
    // this.userSignUp.country = this.PersonalDetails.get('address')?.get('country')?.value || '';
    this.userSignUp.idCountry = 1;
    this.userSignUp.phoneNumber = this.PersonalDetails.get('address')?.get('phoneNumber')?.value || '';
    this.userSignUp.profession = this.PersonalDetails.get('profession')?.value || '';
    this.userSignUp.howHearAboutUs = this.PersonalDetails.get('howDidYouHearAboutUs')?.value || '';
    this.userSignUp.email = this.PersonalDetails.get('email')?.value || '';
    this.userSignUp.password = this.PersonalDetails.get('password')?.value || '';
    this.userSignUp.companyName = this.BillingAddress.get('companyName')?.value || '';
    this.userSignUp.ownerName = this.BillingAddress.get('fullName')?.value || null;
    this.userSignUp.companyOfficialId = this.BillingAddress.get('vatNumber')?.value || '';
    this.userSignUp.billingAddress1 = this.BillingAddress.get('address')?.get('addressLine1')?.value || '';
    this.userSignUp.billingAddress2 = this.BillingAddress.get('address')?.get('addressLine2')?.value || '';
    this.userSignUp.billingZipCode = this.BillingAddress.get('address')?.get('zipCode')?.value || '';
    this.userSignUp.billingCity = this.BillingAddress.get('address')?.get('city')?.value || '';
    this.userSignUp.billingStateRegion = this.BillingAddress.get('address')?.get('stateOrRegion')?.value || '';
    // this.userSignUp.billingACountry = this.BillingAddress.get('address')?.get('country')?.value || '';
    this.userSignUp.billingCountry = 1;
    this.userSignUp.billingPhoneNumber = this.BillingAddress.get('address')?.get('phoneNumber')?.value || '';
    this._signUpService.signUp(this.userSignUp).then((data: HttpResponse<any>) => {
      this.messageService.add({ severity: 'success', summary: 'Add', detail: 'Sign Up Successfully' });
      this.router.navigate(['/my-original-works']);
    }).catch((error: any) => {
      if (error.status === 409) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User with this email already exists.' });
      } else
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Sign Up Failed' });
    });
  }

  isRequired(control: any) {
    return control.hasValidator(Validators.required);
  }
}


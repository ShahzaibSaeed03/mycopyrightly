import { Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FAQComponent } from './components/faq/faq.component';
import { MyOriginalWorksComponent } from './components/my-original-works/my-original-works.component';
import { BuyTokensComponent } from './components/buy-tokens/buy-tokens.component';
import { LoginComponent } from './components/login/login.component';
import { UploadWorkComponent } from './components/upload-work/upload-work.component';
import { ContectUsComponent } from './components/contact-us/contact-us.component';
import { HighlightsComponent } from './components/highlights/highlights.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { AuthGuardService } from './services/auth-guard.service';
import { PaymentStatusComponent } from './components/payment-status/payment-status.component';
import { ActionsAgainstPlagiaristsComponent } from './components/actions-against-plagiarists/actions-against-plagiarists.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        data: { title: 'Home Page' }
    },
    {
        path: 'signup',
        component: SignUpComponent,
        data: { title: 'Sign Up' }
    },
    {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Log In' }
    },
    {
        path: 'my-original-works',
        component: MyOriginalWorksComponent,
        data: { title: 'My Original Works' },
        canActivate: [AuthGuardService]        
    },
    {
        path: 'upload-work',
        component: UploadWorkComponent,
        data: { title: 'Upload a new Work' },
        canActivate: [AuthGuardService]        
    },
    {
        path: 'faq',
        component: FAQComponent,
        data: { title: 'FAQ' },
    },
    {
        path: 'buy-tokens',
        component: BuyTokensComponent,
        data: { title: 'Buy Tokens' },
        canActivate: [AuthGuardService]        
    },
    {
        path: 'return',
        component: PaymentStatusComponent,
        // data: { title: 'status' },
        canActivate: [AuthGuardService]        
    },
    {
        path: 'actions-against-plagiarists',
        component: ActionsAgainstPlagiaristsComponent,
        data: { title: 'Actions against plagiarists' },
        canActivate: [AuthGuardService]        
    },
    {
        path: 'contact-us',
        component: ContectUsComponent,
        data: { title: 'Contect us' },
    },
    {
        path: 'highlights',
        component: HighlightsComponent,
        data: { title: 'Highlights' }
    },
    {
        path: 'pricing',
        component: PricingComponent,
        data: { title: 'Pricing' }
    },
    { path: '**', redirectTo: '' }
];

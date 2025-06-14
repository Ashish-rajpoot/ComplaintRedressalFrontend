import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdduserComponent } from './adduser/adduser.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RegisterComponent } from './register/register.component';
import { MatSelectModule } from '@angular/material/select';
import { CustominterceptorInterceptor } from './custominterceptor.interceptor';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ComplaintComponent } from './complaint/complaint.component';
import { GetComplaintComponent } from './get-complaint/get-complaint.component';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';
import { EditcomplaintComponent } from './editcomplaint/editcomplaint.component';
import {MatDialogModule} from '@angular/material/dialog';
import { UpdatecomplaintComponent } from './updatecomplaint/updatecomplaint.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AyushiComponent } from './ayushi/ayushi.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
// import { GlobalErrorHandlerService } from './services/global-error-handler.service';
import { GetusersComponent } from './getusers/getusers.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    AdduserComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    HomeComponent,
    PagenotfoundComponent,
    ComplaintComponent,
    GetComplaintComponent,
    EditcomplaintComponent,
    UpdatecomplaintComponent,
    AyushiComponent,
    GetusersComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatProgressBarModule,
    MatDividerModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustominterceptorInterceptor,
      multi: true,
    } ,
    // {
    //   provide: ErrorHandler,
    //   useClass: GlobalErrorHandlerService
    // }
   ],
  bootstrap: [AppComponent],
})
export class AppModule {}

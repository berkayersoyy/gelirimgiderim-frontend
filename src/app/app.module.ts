import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderImageComponent } from './components/header-image/header-image.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { PanelComponent } from './components/panel/panel.component';
import { RoomComponent } from './components/room/room.component';
import { RelativeTimePipe } from './pipes/relative-time.pipe';
import { TransactionComponent } from './components/transaction/transaction.component';
import { CreateRoomFormModalComponent } from './components/create-room-form-modal/create-room-form-modal.component';
import { JoinRoomFormModalComponent } from './components/join-room-form-modal/join-room-form-modal.component';
import { TransactionChartComponent } from './components/transaction-chart/transaction-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    HeaderImageComponent,
    LoginComponent,
    RegisterComponent,
    PanelComponent,
    RoomComponent,
    RelativeTimePipe,
    TransactionComponent,
    CreateRoomFormModalComponent,
    JoinRoomFormModalComponent,
    TransactionChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right'}),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

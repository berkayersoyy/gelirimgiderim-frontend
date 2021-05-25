import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HashLocationStrategy,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';

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
import { ChartsModule } from 'ng2-charts';
import { CreateInvitationFormModalComponent } from './components/create-invitation-form-modal/create-invitation-form-modal.component';
import { RoomSettingsComponent } from './components/room-settings/room-settings.component';
import { AmountPipe } from './pipes/amount.pipe';
import { OverflowStringPipe } from './pipes/overflow-string.pipe';
import { ConfirmDeleteRoomComponent } from './components/confirm-delete-room/confirm-delete-room.component';
import { ChangeRoomForModalComponent } from './components/change-room-for-modal/change-room-for-modal.component';
import { TransactionSettingsModalComponent } from './components/transaction-settings-modal/transaction-settings-modal.component';
import { InvitationTimePipe } from './pipes/invitation-time.pipe';
import { AddTransactionFormModalComponent } from './components/add-transaction-form-modal/add-transaction-form-modal.component';
import { CategoryPanelFormModalComponent } from './components/category-panel-form-modal/category-panel-form-modal.component';
import { ArrangeCategoryFormModalComponent } from './components/arrange-category-form-modal/arrange-category-form-modal.component';

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
    CreateInvitationFormModalComponent,
    RoomSettingsComponent,
    AmountPipe,
    OverflowStringPipe,
    ConfirmDeleteRoomComponent,
    ChangeRoomForModalComponent,
    TransactionSettingsModalComponent,
    InvitationTimePipe,
    AddTransactionFormModalComponent,
    CategoryPanelFormModalComponent,
    ArrangeCategoryFormModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

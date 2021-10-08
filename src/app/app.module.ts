import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/service/auth.service';
import { AuthHttpInterceptor } from './auth/service/auth.interceptor';
import { AuthGaurdService } from './auth/service/auth.guard.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthGaurdService,
    {
    provide:HTTP_INTERCEPTORS, useClass:AuthHttpInterceptor, multi:true 
  },
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
  resourceUrl='http://localhost:8080/PMS/';
 }
function routes(routes: any, arg1: { enableTracing: true; }): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}


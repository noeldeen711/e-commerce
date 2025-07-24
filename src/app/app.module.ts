import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { NgxSpinnerModule } from "ngx-spinner";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProductsComponent } from './Components/products/products.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { LoginComponent } from './Components/login/login.component';
import { SignoutComponent } from './Components/signout/signout.component';
import { RegisterComponent } from './Components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ForgetPassComponent } from './Components/forget-pass/forget-pass.component';
import { VerifyCodeComponent } from './Components/verify-code/verify-code.component';
import { ResetPassComponent } from './Components/reset-pass/reset-pass.component';
import { ProductComponent } from './Components/product/product.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { CategoriesSliderComponent } from './Components/categories-slider/categories-slider.component';
import { MainSliderComponent } from './Components/main-slider/main-slider.component';
import { authInterceptor } from './Interceptors/auth.interceptor';
import { loadingInterceptor } from './Interceptors/loading.interceptor';
import { ShippingAddressComponent } from './Components/shipping-adress/shipping-adress.component';
import { AddEGPPipe } from './Pipes/add-egp.pipe';
import { SearchProductPipe } from './Pipes/search-product.pipe';
import { WishListComponent } from './Components/wish-list/wish-list.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { UpdateUserPassComponent } from './Components/update-user-pass/update-user-pass.component';
import { UpdateUserInfoComponent } from './Components/update-user-info/update-user-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    ProductsComponent,
    CategoriesComponent,
    BrandsComponent,
    NavbarComponent,
    NotFoundComponent,
    LoginComponent,
    SignoutComponent,
    RegisterComponent,
    ForgetPassComponent,
    VerifyCodeComponent,
    ResetPassComponent,
    ProductComponent,
    ProductDetailsComponent,
    CategoriesSliderComponent,
    MainSliderComponent,
    ShippingAddressComponent,
    AddEGPPipe,
    SearchProductPipe,
    WishListComponent,
    ProfileComponent,
    UpdateUserPassComponent,
    UpdateUserInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    CarouselModule,
    NgxSpinnerModule
  ],
  providers: [provideHttpClient(withInterceptors([authInterceptor , loadingInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule { }

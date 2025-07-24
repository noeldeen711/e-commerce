import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { CartComponent } from './Components/cart/cart.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { LoginComponent } from './Components/login/login.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { ProductsComponent } from './Components/products/products.component';
import { SignoutComponent } from './Components/signout/signout.component';
import { RegisterComponent } from './Components/register/register.component';
import { ForgetPassComponent } from './Components/forget-pass/forget-pass.component';
import { VerifyCodeComponent } from './Components/verify-code/verify-code.component';
import { ResetPassComponent } from './Components/reset-pass/reset-pass.component';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth.guard';
import { savedInfoGuard } from './guards/saved-info.guard';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { ShippingAddressComponent } from './Components/shipping-adress/shipping-adress.component';
import { WishListComponent } from './Components/wish-list/wish-list.component';
import { BrandDetailsComponent } from './Components/brand-details/brand-details.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { UpdateUserInfoComponent } from './Components/update-user-info/update-user-info.component';
import { UpdateUserPassComponent } from './Components/update-user-pass/update-user-pass.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", canActivate: [authGuard], component: HomeComponent },
  { path: "cart", canActivate: [authGuard], component: CartComponent },
  { path: "brand", canActivate: [authGuard], component: BrandsComponent },
  { path: "wishList", canActivate: [authGuard], component: WishListComponent },
  { path: "profile", canActivate: [authGuard], component: ProfileComponent, children:[
    { path: "", redirectTo: "userInfo", pathMatch: "full" },
    { path: "userInfo", canActivate: [authGuard], component: UpdateUserInfoComponent },
    { path: "userPass", canActivate: [authGuard], component: UpdateUserPassComponent },
  ] },
  { path: "product", canActivate: [authGuard], component: ProductsComponent },
  { path: "shipping-adress/:id", canActivate: [authGuard], component: ShippingAddressComponent },
  { path: "categorie", canActivate: [authGuard], component: CategoriesComponent },
  { path: "login", canActivate: [noAuthGuard], component: LoginComponent },
  { path: "signout", component: SignoutComponent },
  { path: "register", canActivate: [noAuthGuard], canDeactivate: [savedInfoGuard], component: RegisterComponent },
  { path: "forget-pass", canActivate: [noAuthGuard], component: ForgetPassComponent },
  { path: "verify-code", canActivate: [noAuthGuard], component: VerifyCodeComponent },
  { path: "reset-pass", canActivate: [noAuthGuard], component: ResetPassComponent },
  { path: "product-details/:id", component: ProductDetailsComponent, canActivate: [authGuard] },
  { path: "brand-details/:id", component: BrandDetailsComponent, canActivate: [authGuard] },
  { path: "**", component: NotFoundComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

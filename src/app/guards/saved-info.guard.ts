import { CanDeactivateFn } from '@angular/router';
import { RegisterComponent } from '../Components/register/register.component';

export const savedInfoGuard: CanDeactivateFn<RegisterComponent> = (component, currentRoute, currentState, nextState) => {

  if(component.RegisterFormObj.dirty){
    return window.confirm("There are some changes not saved , Are you sure you want to leave ?")
  }
  return true;
};

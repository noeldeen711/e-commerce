import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passMatch(signUp:AbstractControl) : null|ValidationErrors
{
    let password = signUp.value.password ;
    let rePassword = signUp.value.password ;

    if(password == rePassword ){
        return null
    }

    return {passMissMatch : true}
}
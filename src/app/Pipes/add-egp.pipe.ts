import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addEGP'
})
export class AddEGPPipe implements PipeTransform {

  transform(value : number | undefined){
    return `${value} EGP`
  }

}

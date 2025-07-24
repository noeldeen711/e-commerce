import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../Interfaces/product';

@Pipe({
  name: 'searchProduct'
})
export class SearchProductPipe implements PipeTransform {

  transform(list:Product[] , term:string = ''){
    return list.filter((product)=>product.title.toLocaleLowerCase().includes(term.toLocaleLowerCase()))
  }

}

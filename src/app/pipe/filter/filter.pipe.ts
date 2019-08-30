import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/model/product/product';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products: Product[], phrase: string = ''): any {
    return products.filter(item => {
      const jsonString = JSON.stringify(item)
        .replace(/"[^"]*"\:/g, '')
        .replace(/[",\{\}]/g, '');
      return jsonString.toLowerCase().indexOf(phrase.toLowerCase()) > -1;
    });
  }

}

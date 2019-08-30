import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(baseArray: any, filterPhrase: string = ''): any {
    if (filterPhrase == '') {
      return baseArray
    }
    return baseArray.filter((item) => {
      let baseArrayJSON = JSON.stringify(item)
      return (baseArrayJSON.toLowerCase().indexOf(filterPhrase.toLowerCase())) > -1
    })
  }

}

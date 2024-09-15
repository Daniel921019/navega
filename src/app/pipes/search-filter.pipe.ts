import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(location: any[], name: string): any[] {
    if( name === ''){
      return location;
    }
    return location.filter(item =>{
      return item.nombre_ciudad.toLowerCase().includes(name.toLowerCase());
    });
  }

}

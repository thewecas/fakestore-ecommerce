import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterStr: string, propName: string): any[] {
    const result: any = [];
    if (!value || filterStr === '' || propName === '')
      return value;
    value.forEach((a: any) => {
      if (a[propName].trim().toLowerCase().includes(filterStr.toLowerCase()))
        result.push(a);
    });
    return result;
  }

}

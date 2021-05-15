import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'overflowString'
})
export class OverflowStringPipe implements PipeTransform {

  transform(data:string,overflowLimit:number): string {
    return data.substr(0,overflowLimit+1);
  }

}

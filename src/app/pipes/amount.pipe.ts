import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amount'
})
export class AmountPipe implements PipeTransform {

  transform(amount:number): string {
    if(amount>0){
      return "+"+amount.toString();
    }else{
      return "-"+amount.toString();
    }
  }

}

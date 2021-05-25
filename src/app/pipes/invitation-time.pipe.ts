import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'invitationTime'
})
export class InvitationTimePipe implements PipeTransform {

  transform(inputDate:number): string {
        var current = new Date().valueOf();
        var input = inputDate.valueOf();
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;

        var elapsed = current - input;
        elapsed = Math.abs(elapsed)

        if (elapsed < msPerMinute) {
            return Math.round(elapsed / 1000) + ' saniye';
        }

        else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ' dakika';
        }

        else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ' saat';
        }

        else if (elapsed < msPerMonth) {
            return 'yaklaşık ' + Math.round(elapsed / msPerDay) + ' gün';
        }

        else if (elapsed < msPerYear) {
            return 'yaklaşık ' + Math.round(elapsed / msPerMonth) + ' ay';
        }

        else {
            return 'yaklaşık ' + Math.round(elapsed / msPerYear) + ' yıl';
        }
  }

}

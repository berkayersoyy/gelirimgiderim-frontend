import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeTime'
})
export class RelativeTimePipe implements PipeTransform {

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
            return Math.round(elapsed / 1000) + ' saniye önce';
        }

        else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ' dakika önce';
        }

        else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ' saat önce';
        }

        else if (elapsed < msPerMonth) {
            return 'yaklaşık ' + Math.round(elapsed / msPerDay) + ' gün önce';
        }

        else if (elapsed < msPerYear) {
            return 'yaklaşık ' + Math.round(elapsed / msPerMonth) + ' ay önce';
        }

        else {
            return 'yaklaşık ' + Math.round(elapsed / msPerYear) + ' yıl önce';
        }
  }

}

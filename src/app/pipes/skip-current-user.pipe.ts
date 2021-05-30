import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({
  name: 'skipCurrentUser'
})
export class SkipCurrentUserPipe implements PipeTransform {

  transform(users:User[],currentUserId:string): User[] {
    let newUsers:User[]=[]
    for(let user of users){
      if(user.id==currentUserId){
        continue;
      }
      newUsers.push(user);
    }
    return newUsers;
  }

}

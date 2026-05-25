import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  //debugger;

  return true;

  // const router = inject(Router);
  // const localEmail = localStorage.getItem("email");
  // if(localEmail === null){
  //   router.navigateByUrl("/todolist");
  // }
  // else{
  //   return true;
  // }
};

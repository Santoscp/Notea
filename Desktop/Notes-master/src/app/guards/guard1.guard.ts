import { CanActivateFn } from '@angular/router';

export const guard1Guard: CanActivateFn = (route, state) => {
  return true;
};

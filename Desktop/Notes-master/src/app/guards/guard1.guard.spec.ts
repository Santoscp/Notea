import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guard1Guard } from './guard1.guard';

describe('guard1Guard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guard1Guard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

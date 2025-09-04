import { TestBed } from '@angular/core/testing';

import { AnaliseFacialService } from './analise-facial.service';

describe('AnaliseFacialService', () => {
  let service: AnaliseFacialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnaliseFacialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

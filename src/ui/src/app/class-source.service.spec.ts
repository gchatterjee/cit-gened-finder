import { TestBed, inject } from '@angular/core/testing';

import { ClassSourceService } from './class-source.service';

describe('ClassSourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassSourceService]
    });
  });

  it('should be created', inject([ClassSourceService], (service: ClassSourceService) => {
    expect(service).toBeTruthy();
  }));
});

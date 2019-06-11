import { TestBed } from '@angular/core/testing';

import { PlanetsDataService } from './planets-data.service';

describe('PlanetsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanetsDataService = TestBed.get(PlanetsDataService);
    expect(service).toBeTruthy();
  });
});

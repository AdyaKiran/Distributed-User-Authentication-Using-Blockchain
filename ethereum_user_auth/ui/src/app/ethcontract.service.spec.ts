/** import { TestBed } from '@angular/core/testing';

import { EthcontractService } from './ethcontract.service';

describe('EthcontractService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EthcontractService = TestBed.get(EthcontractService);
    expect(service).toBeTruthy();
  }); 
});**/

import { TestBed, inject } from '@angular/core/testing';

import { EthcontractService } from './ethcontract.service';

describe('EthcontractService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EthcontractService]
    });
  });

  it('should be created', inject([EthcontractService], (service: EthcontractService) => {
    expect(service).toBeTruthy();
  }));
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailContactPage } from './detail-contact.page';

describe('DetailContactPage', () => {
  let component: DetailContactPage;
  let fixture: ComponentFixture<DetailContactPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

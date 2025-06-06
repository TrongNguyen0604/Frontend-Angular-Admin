import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCateComponent } from './detail-cate.component';

describe('DetailCateComponent', () => {
  let component: DetailCateComponent;
  let fixture: ComponentFixture<DetailCateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailCateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailCateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

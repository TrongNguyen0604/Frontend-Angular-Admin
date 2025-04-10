import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjectsComponent } from './list-projects.component';

describe('ListProjectsComponent', () => {
  let component: ListProjectsComponent;
  let fixture: ComponentFixture<ListProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

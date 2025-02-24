import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumViewerComponent } from './album-viewer.component';

describe('AlbumViewerComponent', () => {
  let component: AlbumViewerComponent;
  let fixture: ComponentFixture<AlbumViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

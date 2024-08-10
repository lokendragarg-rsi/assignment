import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { MatButtonHarness } from '@angular/material/button/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule, MaterialModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve story from the server', () => {
    const mockStories = [
      {position:1, title: 'test1', url:'test1.com' },
      { position: 2, title: 'test2', url: 'test2.com' },
    ];

    component.ngOnInit();
    const req = httpMock.expectOne('https://localhost:7069/api/Story/getstorydetails?takeRecord=200');
    expect(req.request.method).toEqual('GET');
    req.flush(mockStories);
    expect(mockStories.length).toEqual(2);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should return app title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    let result = app.getTitle();
    expect(result).toEqual('Story');
  });

  it('should render filter input title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.mat-mdc-input-element')?.attributes[2].textContent).toContain('title');
  });

});

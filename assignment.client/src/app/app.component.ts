import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { StoryService } from './_services/storyservice/story.service';
import { first } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MaterialModule } from './material.module';

export interface StoryTableElement {
  title: string;
  url: string;
  position: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {
  loading: boolean = true;
  public ELEMENT_DATA: StoryTableElement[] = [];
  displayedColumns: string[] = ['position', 'title', 'url'];
  dataSource = new MatTableDataSource<StoryTableElement>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient, private storyService: StoryService) {}

  ngOnInit() {
    this.getStoryDetails();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getStoryDetails() {
    this.loading = true;
    this.storyService.getDetail(200).pipe(first()).subscribe(result => {
      if (result.isSuccess) {
        result.data.forEach((currentData, index) => {
          this.ELEMENT_DATA.push({
            position: index + 1,
            title: currentData.title,
            url: currentData.url
          });
        });
        this.dataSource = new MatTableDataSource<StoryTableElement>(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      }
    }, (err) => {
      this.loading = false;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  title = 'Story';
}


import { Component, OnInit, ViewChild } from "@angular/core";
import { YoutubeService } from "src/app/services/youtube.service";
import { MatTableDataSource } from "@angular/material/table";
import { Video } from "src/app/models/video";
import { MatPaginator } from "@angular/material/paginator";
import { VideosDataSource } from "src/app/data/videos-data-source";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  maxResults = 8;
  currentPageIndex = 0;
  displayedColumns: string[] = ["thumbnail", "title", "publishedAt", "details"];
  dataSource: VideosDataSource;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private youtubeService: YoutubeService) {}

  ngOnInit(): void {
    this.paginator.pageSize = this.maxResults;
    this.dataSource = new VideosDataSource(this.youtubeService);
    this.dataSource.loadVideos("UCixD9UbKvDxzGNiPC_fgHyA", this.maxResults);
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit");
    this.dataSource.count$
      .pipe(
        tap(count => {
          this.paginator.length = count;
        })
      )
      .subscribe();

    this.paginator.page
      .pipe(
        tap(page => {
          const index = page.pageIndex;
          if (index > this.currentPageIndex) {
            // Next page
            this.currentPageIndex = index;
            this.dataSource.loadVideos(
              "UCixD9UbKvDxzGNiPC_fgHyA",
              this.maxResults,
              true,
              false
            );
          } else {
            // Previous page
            this.currentPageIndex = index;
            this.dataSource.loadVideos(
              "UCixD9UbKvDxzGNiPC_fgHyA",
              this.maxResults,
              false,
              true
            );
          }
        })
      )
      .subscribe();
  }
}

import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ChannelService } from "src/app/services/channel.service";
import { MatPaginator } from "@angular/material/paginator";
import { VideosDataSource } from "src/app/data/videos-data-source";
import { tap, debounceTime, distinctUntilChanged } from "rxjs/operators";
import { fromEvent } from "rxjs";

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
  @ViewChild("search") input: ElementRef;

  constructor(private channelService: ChannelService) {}

  ngOnInit(): void {
    this.paginator.pageSize = this.maxResults;
    this.dataSource = new VideosDataSource(this.channelService);
    this.dataSource.loadVideos("UCixD9UbKvDxzGNiPC_fgHyA", this.maxResults);
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit");

    // Listen on data count
    this.dataSource.count$
      .pipe(
        tap(count => {
          this.paginator.length = count;
        })
      )
      .subscribe();

    // Listen on pagination
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
              false,
              this.input.nativeElement.value
            );
          } else {
            // Previous page
            this.currentPageIndex = index;
            this.dataSource.loadVideos(
              "UCixD9UbKvDxzGNiPC_fgHyA",
              this.maxResults,
              false,
              true,
              this.input.nativeElement.value
            );
          }
        })
      )
      .subscribe();

    // Listen on search
    fromEvent(this.input.nativeElement, "keyup")
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          console.log("SEARCH", this.input.nativeElement.value);
          this.paginator.pageIndex = 0;
          this.dataSource.loadVideos(
            "UCixD9UbKvDxzGNiPC_fgHyA",
            this.maxResults,
            null,
            null,
            this.input.nativeElement.value
          );
        })
      )
      .subscribe();
  }
}

import { Component, OnInit, ViewChild } from "@angular/core";
import { YoutubeService } from "src/app/services/youtube.service";
import { MatTableDataSource } from "@angular/material/table";
import { Video } from "src/app/models/video";
import { MatPaginator } from "@angular/material/paginator";
import { VideosDataSource } from "src/app/data/videos-data-source";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  maxResults = 8;
  displayedColumns: string[] = ["thumbnail", "title", "publishedAt", "details"];
  dataSource: VideosDataSource;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private youtubeService: YoutubeService) {}

  ngOnInit(): void {
    this.dataSource = new VideosDataSource(this.youtubeService);
    this.dataSource.loadVideos("UCixD9UbKvDxzGNiPC_fgHyA", this.maxResults);
  }
}

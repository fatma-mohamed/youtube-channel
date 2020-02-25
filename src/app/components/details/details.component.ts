import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { VideoService } from "src/app/services/video/video.service";
import { Video } from "src/app/models/video";
import { FavoritesService } from "src/app/services/favorites/favorites.service";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit {
  video_id: string;
  video: Video;
  loading = false;
  isFavorite = false;

  constructor(
    private actRoute: ActivatedRoute,
    private videoService: VideoService,
    public favoritesService: FavoritesService
  ) {
    this.video_id = this.actRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getVideoInfo();
  }

  async getVideoInfo() {
    this.loading = true;
    this.videoService.getVideo(this.video_id).subscribe(res => {
      this.video = res;
      this.loading = false;
    });
    this.isFavorite = await this.favoritesService.isFavorite(this.video_id);
  }

  addFav() {
    this.favoritesService.addFav(this.video_id);
    this.isFavorite = true;
  }
  removeFav() {
    this.favoritesService.removeFav(this.video_id);
    this.isFavorite = false;
  }

  formatDuration(duration: string) {
    let hours = "00",
      mins = "00",
      secs = "00";
    let durationFormatted = "";
    for (let i = 0; i < duration.length; i++) {
      if (duration[i] == "H") {
        hours = duration[i - 2] + duration[i - 1];
      }
      if (duration[i] == "M") {
        mins = duration[i - 2] + duration[i - 1];
      }
      if (duration[i] == "S") {
        secs = duration[i - 2] + duration[i - 1];
      }
    }
    return hours + ":" + mins + ":" + secs;
  }
}

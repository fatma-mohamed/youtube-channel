import { Injectable } from "@angular/core";
import { HttpParams, HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { YOUTUBE_API_URL, GET_VIDEO_ENDPOINT } from "src/app/models/constants";
import { map } from "rxjs/operators";
import { Video } from "src/app/models/video";

@Injectable({
  providedIn: "root"
})
export class VideoService {
  constructor(private http: HttpClient) {}

  getVideo(videoId: string) {
    let parameters = new HttpParams()
      .set("id", videoId)
      .set("key", environment.youtube_api_key);

    return this.http
      .get(YOUTUBE_API_URL + GET_VIDEO_ENDPOINT, {
        params: parameters
      })
      .pipe(
        map(res => {
          return new Video(res["items"][0]);
        })
      );
  }
}

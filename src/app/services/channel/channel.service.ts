import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import {
  YOUTUBE_API_URL,
  GET_CHANNEL_VIDEOS_ENDPOINT
} from "../../models/constants";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Video } from "../../models/video";

@Injectable({
  providedIn: "root"
})
export class ChannelService {
  private nextPageToken;
  private prevPageToken;
  constructor(private http: HttpClient) {}

  getChannelVideos(
    channelId: string,
    maxResults: number,
    next?,
    prev?,
    query?
  ) {
    let parameters = new HttpParams()
      .set("channelId", channelId)
      .set("maxResults", maxResults.toString())
      .set("key", environment.youtube_api_key);

    if (query) {
      parameters = parameters.append("q", query);
    }

    let pageToken;
    if (next && this.nextPageToken) {
      pageToken = this.nextPageToken;
      parameters = parameters.append("pageToken", pageToken);
    } else if (prev && this.prevPageToken) {
      pageToken = this.prevPageToken;
      parameters = parameters.append("pageToken", pageToken);
    }

    console.log("parameters", parameters);
    return this.http
      .get(YOUTUBE_API_URL + GET_CHANNEL_VIDEOS_ENDPOINT, {
        params: parameters
      })
      .pipe(
        map(res => {
          const totalResults = res["pageInfo"]["totalResults"];
          this.nextPageToken = res["nextPageToken"];
          this.prevPageToken = res["prevPageToken"];
          const videos = [];
          for (const item of res["items"]) {
            videos.push(new Video(item));
          }
          return {
            data: videos,
            total: totalResults
          };
        })
      );
  }
}

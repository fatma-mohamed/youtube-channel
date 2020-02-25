import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Video } from "../models/video";
import { YoutubeService } from "../services/youtube.service";
import { Observable, BehaviorSubject, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";

export class VideosDataSource implements DataSource<Video> {
  private videosSubject = new BehaviorSubject<Video[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private youtubeService: YoutubeService) {}

  connect(collectionViewer: CollectionViewer): Observable<Video[]> {
    return this.videosSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.videosSubject.complete();
    this.loadingSubject.complete();
  }

  loadVideos(channelId: string, maxResults: number, pageToken?: string) {
    this.loadingSubject.next(true);

    this.youtubeService
      .getChannelVideos(channelId, maxResults, pageToken)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(videos => this.videosSubject.next(videos));
  }
}

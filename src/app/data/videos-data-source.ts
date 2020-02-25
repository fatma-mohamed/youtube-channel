import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Video } from "../models/video";
import { ChannelService } from "../services/channel.service";
import { Observable, BehaviorSubject, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";

export class VideosDataSource implements DataSource<Video> {
  private videosSubject = new BehaviorSubject<Video[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private countSubject = new BehaviorSubject<number>(0);
  public count$ = this.countSubject.asObservable();

  constructor(private channelService: ChannelService) {}

  connect(collectionViewer: CollectionViewer): Observable<Video[]> {
    return this.videosSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.videosSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }

  loadVideos(channelId: string, maxResults: number, next?, prev?, query?) {
    this.loadingSubject.next(true);
    this.channelService
      .getChannelVideos(channelId, maxResults, next, prev, query)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(res => {
        this.videosSubject.next((res as any).data);
        this.countSubject.next((res as any).total);
      });
  }
}

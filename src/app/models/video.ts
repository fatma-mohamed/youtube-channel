export class Video {
  id;
  title;
  thumbnailUrl;
  publishedAt;

  constructor(item: any) {
    this.id = item.id.videoId;
    this.title = item.snippet.title;
    this.thumbnailUrl = item.snippet.thumbnails.medium.url;
    this.publishedAt = item.snippet.publishedAt;
  }
}

export class Video {
  title;
  thumbnailUrl;
  publishedAt;

  constructor(item: any) {
    this.title = item.snippet.title;
    this.thumbnailUrl = item.snippet.thumbnails.medium.url;
    this.publishedAt = item.snippet.publishedAt;
  }
}

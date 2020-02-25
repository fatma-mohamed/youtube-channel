export class Video {
  id;
  title;
  thumbnailMedUrl;
  thumbnailMaxResUrl;
  publishedAt;
  description;
  duration;
  viewCount;
  likeCount;

  constructor(item: any) {
    this.id = item.id.videoId ? item.id.videoId : item.id;
    this.title = item.snippet.title;
    this.thumbnailMedUrl = item.snippet.thumbnails.medium.url;
    this.thumbnailMaxResUrl = item.snippet.thumbnails.maxres?.url;
    this.publishedAt = item.snippet.publishedAt;
    this.description = item.snippet.description;
    this.viewCount = item.statistics?.viewCount;
    this.likeCount = item.statistics?.likeCount;
    this.duration = item.contentDetails?.duration;
  }
}

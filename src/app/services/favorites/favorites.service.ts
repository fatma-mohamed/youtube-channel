import { Injectable } from "@angular/core";
import { LocalstorageService } from "../localstorage/localstorage.service";
import { KEY_FAV } from "src/app/models/constants";

@Injectable({
  providedIn: "root"
})
export class FavoritesService {
  constructor(private localStorage: LocalstorageService) {}

  async isFavorite(videoId) {
    const favs = (await this.localStorage.get(KEY_FAV)) as Set<string>;
    if (!favs || favs.size == 0) {
      return false;
    }
    if (favs.has(videoId)) {
      return true;
    } else {
      return false;
    }
  }

  async addFav(videoId) {
    return this.localStorage.appendToList(KEY_FAV, videoId);
  }

  async removeFav(videoId) {
    return this.localStorage.removeFromList(KEY_FAV, videoId);
  }
}

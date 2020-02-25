import { Injectable } from "@angular/core";
import { StorageMap, LocalStorage } from "@ngx-pwa/local-storage";

@Injectable({
  providedIn: "root"
})
export class LocalstorageService {
  constructor(private storage: LocalStorage) {}

  set(key: string, value: string) {
    this.storage.setItem(key, value);
  }

  async appendToList(key: string, value: string) {
    let set = (await this.storage.getItem(key).toPromise()) as Set<string>;
    if (set) {
      set.add(value);
      this.storage.setItem(key, set);
    } else {
      const newSet = new Set<string>();
      newSet.add(value);
      await this.storage.setItem(key, newSet).toPromise();
    }
    console.log("STORAGE", this.storage.length);
  }

  async removeFromList(key: string, value: string) {
    let set = (await this.storage.getItem(key).toPromise()) as Set<string>;
    if (set && set.has(value)) {
      set.delete(value);
      this.storage.setItem(key, set);
    }
  }

  get(key) {
    return this.storage.getItem(key).toPromise();
  }
}

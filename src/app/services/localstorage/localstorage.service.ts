import { Injectable } from "@angular/core";
import { StorageMap } from "@ngx-pwa/local-storage";

@Injectable({
  providedIn: "root"
})
export class LocalstorageService {
  constructor(private storage: StorageMap) {}

  set(key: string, value: string) {
    this.storage.set(key, value);
  }

  async appendToList(key: string, value: string) {
    let arr = (await this.storage.get(key).toPromise()) as string[];
    if (arr) {
      arr.push(value);
      this.storage.set(key, arr);
    } else {
      this.storage.set(key, value);
    }
  }

  async removeFromList(key: string, value: string) {
    let arr = (await this.storage.get(key).toPromise()) as string[];
    if (arr && arr.includes(value)) {
      arr.splice(arr.indexOf(value), 1);
      this.storage.set(key, arr);
    }
  }

  get(key) {
    return this.storage.get(key).toPromise();
  }
}

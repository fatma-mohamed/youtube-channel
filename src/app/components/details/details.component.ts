import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit {
  video_id: string;

  constructor(private actRoute: ActivatedRoute) {
    this.video_id = this.actRoute.snapshot.params.id;
  }

  ngOnInit(): void {}

  getVideoInfo() {
    
  }
}
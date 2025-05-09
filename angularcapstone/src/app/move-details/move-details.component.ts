import {Component, OnInit} from '@angular/core';
import {Movie} from '../movie';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-move-details',
  standalone: false,
  templateUrl: './move-details.component.html',
  styleUrl: './move-details.component.css'
})
export class MoveDetailsComponent implements OnInit {
  movie: Movie | null = null;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.api.getMovieDetails(id).subscribe({
        next: (data) => this.movie = data,
        error: (err) => console.error(err)
      });
    }
  }
}

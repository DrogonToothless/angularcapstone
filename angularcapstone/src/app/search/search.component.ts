import {Component, inject, OnInit} from '@angular/core';
import {Movie} from '../movie';
import {ApiService} from '../api.service';
import {HttpParams} from '@angular/common/http';
import {SearchResults} from '../search-results';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchResults: SearchResults | null = null;
  private api = inject(ApiService)
  private searchTerm: string = '';
  private sleep = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  ngOnInit() {
    this.api.getPopularMovies().subscribe((data) => {this.searchResults = data;});
  }

  goToMovieDetails(id: number) {

  }

  addToWatchlist(movie: Movie) {

  }

  addToFavorites(movie: Movie) {

  }

  onSearch($event: KeyboardEvent) {
    this.sleep(1000).then(() => {
      console.log('Search term:', this.searchTerm);
    });
    // @ts-ignore
    if ('target' in event) {
      // @ts-ignore
      this.searchTerm = event.target.value;
    }
    const params = new HttpParams()
      .set('query', this.searchTerm)
    this.api.searchMovies(params).subscribe((data) => {this.searchResults = data;});
    console.log('Search term:', this.searchTerm);
  }

  clearSearch() {
    this.searchTerm = '';
    // Implement logic to clear search results or reset the view
    console.log('Search cleared');
  }
}

import React, {Component} from 'react';
import {deleteMovie, getMovies} from "../services/movieService";
import Pagination from "./common/pagination";
import {paginate} from "../utils/paginate";
import ListGroup from "./common/listGroup";
import {getGenres} from "../services/genreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import {Link} from "react-router-dom";
import SearchBox from "./common/searchBox";
import {toast} from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: {path: 'title', order: 'asc'}
  };

  async componentDidMount() {
    const {data} = await getGenres();
    const genres = [{_id: '', name: 'All Genres'}, ...data]

    const {data: movies} = await getMovies()
    this.setState({movies, genres});
  }

  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== movie._id)
    this.setState({movies});

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error('This movie has already been deleted.');

      this.setState({movies: originalMovies});
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];  //clone array (still old references)
    const index = movies.indexOf(movie);    //get index
    movies[index] = {...movies[index]}; //copy reference at the index
    movies[index].liked = !movies[index].liked; //toggle attribute in the copy
    this.setState({movies});
  };

  handlePageChange = page => {
    this.setState({currentPage: page})
  }

  handleGenreSelect = (genre) => {
    this.setState({selectedGenre: genre, searchQuery: "", currentPage: 1});
  };

  handleSearch = query => {
    this.setState({searchQuery: query, selectedGenre: null, currentPage: 1});
  }

  handleSort = sortColumn => {
    this.setState({sortColumn});
  }

  getPagedData = () => {
    const {
      currentPage,
      pageSize,
      selectedGenre,
      searchQuery,
      sortColumn,
      movies: allMovies
    } = this.state;

    //Filter
    let filtered = allMovies;
    //if query exists
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    //else if genre exists
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id)

    //Sort (input, sort property, order)
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

    //Paginate
    const movies = paginate(sorted, currentPage, pageSize)

    return {totalCount: filtered.length, data: movies}
  }

  render() {
    const {length: count} = this.state.movies;
    const {
      currentPage,
      pageSize,
      sortColumn,
      searchQuery
    } = this.state;
    const {user} = this.props;

    if (count === 0) {
      return <p>No movies in the database.</p>;
    }

    const {totalCount, data: movies} = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {user && (<Link to="/movies/new"
                 className="btn btn-primary mb-2">
            New Movie
          </Link>)}
          <p>Showing {totalCount} movies in the database.</p>
          <SearchBox value={searchQuery}
                     onChange={this.handleSearch}/>
          <MoviesTable movies={movies}
                       sortColumn={sortColumn}
                       onDelete={this.handleDelete}
                       onLike={this.handleLike}
                       onSort={this.handleSort}/>
          <Pagination itemsCount={totalCount}
                      pageSize={pageSize}
                      currentPage={currentPage}
                      onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;

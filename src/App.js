import React, { Component } from 'react';
import BookService from './services/BookService'

import BookCard from './Card';
import EditBook from './EditBook'
import { Button } from 'reactstrap';
import swal from 'sweetalert2'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      modal: false,
      selectedBook: null
    }
  }

  componentDidMount() {
    BookService.getBooks()
      .then(books => {
        this.setState({ books })
      })
  }

  handleToggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
    if (!this.state.modal && this.state.selectedBook) this.setState({ selectedBook: null })
  }
  handleBookEdit = (book) => {
    this.setState({ selectedBook: book, modal: true })
  }
  isUniqueName = (name, id) => {
    var filtered = this.state.books.find(book => {
      return (
        book.title.toLowerCase() === name.toLowerCase() && book.id !== id
      )
    })
    return !!filtered
  }
  handleSave(bookToSave) {
    var books = [...this.state.books]
    if (bookToSave.id) {
      books.splice(books.findIndex(book => book.id === bookToSave.id), 1, bookToSave)
    }
    else {
      bookToSave.id = Date.now()
      books.push(bookToSave)
    }
    this.setState({ books })
  }

  handleDelete = (id, title) => {
    swal({
      title: `Are you sure you want to delete "${title}"?`,
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        swal(
          'Deleted!',
          '',
          'success'
        )
        var books = [...this.state.books]
        books = books.filter(book => book.id !== id);
        this.setState({ books })
      }
    })

  }

  filterBookTitle = (str) => {
    var pat = /[^\w\s]/g
    return (
      str.replace(pat, '')
        .replace(/\w\S*/g, (txt) => {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        })
    )
  }


  render() {
    var { books } = this.state;

    return (
      <div className="container">
        <section>
          <div className="jumbotron">
            <h1>Old Books Libary</h1>
          </div>
          <Button color="success" onClick={this.handleToggleModal}>Add New</Button>
          {this.state.modal ? <EditBook handleToggleModal={this.handleToggleModal}
            book={this.state.selectedBook}
            handleSave={(bookToSave) => { this.handleSave(bookToSave) }}
            isUniqueName={(name, id) => this.isUniqueName(name, id)}
          />
            : null}
          <div className="cards">
            {books.map(book => {
              book.title = this.filterBookTitle(book.title);
              return <BookCard key={book.id} book={book}
                handleEdit={(bookToEdit) => { this.handleBookEdit(bookToEdit) }}
                handleDelete={(bookId,title) => this.handleDelete(bookId,title)}
              />
            })}
          </div>
        </section>
      </div>
    )
  }
}

export default App;

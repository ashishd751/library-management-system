import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addBook, editBook, searchBook, clearSearchResults } from '../actions/tableAction';

class Actions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddBookView: false,
            showSearchBookView: false,
            bookAdded: false,
            newBook: {
                title: "",
                authors: [],
                availableQuantity: ""
            },
            searchKey: "",
            message: ""
        };
        this.input = React.createRef();
        this.addBook = this.addBook.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd= this.handleAdd.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {isEditClicked, bookOpenedForEdit} = nextProps;
        if ((isEditClicked && (isEditClicked !== this.props.isEditClicked)) && bookOpenedForEdit) {
            this.showEditView(bookOpenedForEdit);
        }
    }

    showEditView = (bookOpenedForEdit) => {
        this.setState({
            showAddBookView: true,
            newBook: bookOpenedForEdit,
            bookAdded: false,
            message: ""
        })
    }

    addBook() {
        // show add book view
        this.setState({
            showAddBookView: true,
            showSearchBookView: false,
            message: ""
        })
    }

    searchBook = () => {
        this.setState({
            showSearchBookView: true,
            showAddBookView: false,
            message: ""
        })
    }

    handleChange(event, key) {
        const {newBook} = this.state;
        key ? this.setState({[key]: event.target.value}): newBook[event.target.name] = Array.isArray(newBook[event.target.name]) ? [event.target.value] : event.target.value;
        this.setState({newBook});
    }

    handleAdd() {
        this.props.addBook({
            id: this.props.books.length + 1,
            ...this.state.newBook
        })
        this.setState({
            showAddBookView: false,
            newBook: {
                title: "",
                authors: [],
                availableQuantity: ""
            },
            bookAdded: true,
            message: "Book added successfully !"
        })
    }

    handleSearch = () => {
        const {searchKey} = this.state;
        this.props.searchBook(searchKey);
    }

    handleEdit = () => {
        const {newBook} = this.state;
        this.props.editBook(newBook);
        this.resetEditView();
    }

    resetEditView = () => {
        this.setState({
            showAddBookView: false,
            newBook: {
                title: "",
                authors: [],
                availableQuantity: ""
            },
            message: "Book edited successfully !"
        })
        this.props.resetEditView();
    }

    clearSearchResults = () => {
        this.props.clearSearchResults();
        this.setState({
            showSearchBookView: false,
            showAddBookView: false,
            message: "",
            searchKey: ""
        })
    }

    render() {
        return (
            <div className="actions-section">
                <div>
                    <button className="button button2" onClick={this.addBook}>Add a Book</button>
                    {(this.props.books.length > 0) && <button className="button button2" onClick={this.searchBook}>Search a Book</button>}
                </div>
                {this.state.showAddBookView && <div className="start-align add-book">
                        <div><label>Title: <input type="text" name="title" onChange={this.handleChange} value={this.state.newBook.title} /></label></div>
                        <div><label>Author: <input type="text" name="authors" onChange={this.handleChange} value={this.state.newBook.authors} /></label></div>
                        <div><label>Quantity: <input type="text" name="availableQuantity" onChange={this.handleChange} value={this.state.newBook.availableQuantity} /></label></div>
                        {!this.props.isEditClicked && <button className="button button2" onClick={this.handleAdd}>Add</button>}
                        {this.props.isEditClicked && <button className="button button2" onClick={this.handleEdit}>Edit</button>}
                </div>}
                {this.state.showSearchBookView && <div className="start-align add-book">
                    <div><label>Search Key: <input type="text" name="searchKey" onChange={(event) => this.handleChange(event, 'searchKey')} value={this.state.searchKey} /></label></div>
                    <button className="button button2" onClick={this.handleSearch}>Search</button>
                    <button className="button button2" onClick={this.clearSearchResults}>Clear Results</button>
                </div>}
                {this.state.message.length > 0 && <div>{this.state.message}</div>}
            </div>
            
        );
    }
}

const mapDispatchToProps = dispatch => ({
  addBook: (data) => dispatch(addBook(data)),
  editBook: (book) => dispatch(editBook(book)),
  searchBook: (bookTitle) => dispatch(searchBook(bookTitle)),
  clearSearchResults: () => dispatch(clearSearchResults())
})

const mapStateToProps = state => ({
  books: state.bookData.books || []
})

export default connect(mapStateToProps, mapDispatchToProps)(Actions);
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addBook } from '../actions/tableAction';

class Actions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddBookView: false,
            bookAdded: false,
            newBook: {
                title: "",
                authors: [],
                availableQuantity: ""
            }
        };
        this.input = React.createRef();
        this.addBook = this.addBook.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }

    addBook() {
        // show add book view
        this.setState({
            showAddBookView: true
        })
    }

    handleChange(event) {
        const {newBook} = this.state;
        newBook[event.target.name] = Array.isArray(newBook[event.target.name]) ? [...newBook[event.target.name], event.target.value] : event.target.value;
        this.setState({newBook});
    }

    handleSubmit() {
        this.props.addBook({
            id: this.props.books.length + 1,
            ...this.state.newBook
        })
        this.setState({
            showAddBookView: false,
            bookAdded: true
        })
    }

    render() {
        return (
            <div>
                <div>
                    <button onClick={this.addBook}>Add a Book</button>
                    <button>Search a Book</button>
                </div>
                {this.state.showAddBookView && <div className="start-align add-book">
                        <div><label>Title:<input type="text" name="title" onChange={this.handleChange} /></label></div>
                        <div><label>Author:<input type="text" name="authors" onChange={this.handleChange} /></label></div>
                        <div><label>Quantity:<input type="text" name="availableQuantity" onChange={this.handleChange}/></label></div>
                        <button onClick={this.handleSubmit}>Add</button>
                </div>}
                {this.state.bookAdded && <div>Book added successfully !</div>}
            </div>
            
        );
    }
}

const mapDispatchToProps = dispatch => ({
  addBook: (data) => dispatch(addBook(data))
})

const mapStateToProps = state => ({
  books: state.bookData.books || []
})

export default connect(mapStateToProps, mapDispatchToProps)(Actions);
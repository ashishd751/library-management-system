import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const {books = [], columns = [], onEditClick} = this.props;
        return (
            <div>
                {(books.length > 0 && columns.length > 0) && <table className="books">
                    <thead>
                        <tr>{
                                columns.map((column = {}, index) => {
                                    return column.display ? <th key={index}>{column.displayName}</th> : null
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            books.map((book = {}) => {
                                return (
                                    <tr key={book.id}>
                                        <td>{book.id}</td>
                                        <td>{book.title}</td>
                                        <td>{book.authors.length > 1 ? book.authors.join(', '): book.authors[0]}</td>
                                        <td>{book.availableQuantity}</td>
                                        <td className="center-align"><button className="button button2" onClick={() => onEditClick(book)}>Edit</button></td>
                                    </tr>);
                            })
                        }
                    </tbody>
                </table>}
                {(books.length === 0) && <div>No books found !</div>}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
  
})

const mapStateToProps = state => ({
  books: state.bookData.books || [],
  columns: state.bookData.columns || []
})

export default connect(mapStateToProps, mapDispatchToProps)(Table);
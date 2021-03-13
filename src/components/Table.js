import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <table id="books">
                <thead>
                    <tr>{
                            this.props.columns.map((column = {}, index) => {
                                return column.display ? <th key={index}>{column.displayName}</th> : null
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.books.map((book = {}) => {
                            return (
                                <tr key={book.id}>
                                    <td>{book.id}</td>
                                    <td>{book.title}</td>
                                    <td>{book.authors.length > 1 ? book.authors.join(', '): book.authors[0]}</td>
                                    <td>{book.availableQuantity}</td>
                                    <td><button>Lend</button> <button>Return</button> <button>Edit</button></td>
                                </tr>);
                        })
                    }
                </tbody>
            </table>
            
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
import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import { loadInitialBooks } from './actions/tableAction';
import Table from "./components/Table";
import Actions from "./components/Actions";

const books = require('./data/books.json');
const columns = require('./data/columns.json');

class App extends Component {
  constructor(props) {
        super(props);
        this.state = {
          isEditClicked: false,
          bookOpenedForEdit: null
        }
    }

  componentDidMount() {
    this.props.loadInitialBooks({books, columns});
  }

  onEditClick = (book) => {
    this.setState({
      isEditClicked: true,
      bookOpenedForEdit: book
    })
  }

  resetEditView = () => {
    this.setState({
      isEditClicked: false,
      bookOpenedForEdit: null
    })
  }

  getActionProps = () => {
    return {
      ...this.state,
      resetEditView: this.resetEditView
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2 className="App-title">Welcome to the Library</h2>
          <div className="Table-container">
            <Table onEditClick={this.onEditClick} />
            <Actions {...this.getActionProps()} />
          </div>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadInitialBooks: (data) => dispatch(loadInitialBooks(data))
})

const mapStateToProps = state => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
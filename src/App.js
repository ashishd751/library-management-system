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
        }
    }

  componentDidMount() {
    this.props.loadInitialBooks({books, columns});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2 className="App-title">Welcome to the Library</h2>
          <div className="Table-container">
            <Table />
            <Actions />
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
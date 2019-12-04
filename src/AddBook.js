import React from "react";
import { connect } from "react-redux";
import './AddBook.css'

class BookForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            imageUrl: '',
            books: [],
            bookTemp:''
        };
    
        this.onFieldChanged = this.onFieldChanged.bind(this);
        this.addBookButton = this.addBookButton.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onFieldChanged = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    addBookButton = (event) => {
        event.preventDefault();
        this.setState({
            books: this.state.books.concat([this.state.bookTemp])
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        if(this.props.authors.some((author) => author.name === this.state.name)){
            this.props.addBooknotAuthor(this.state.books, this.state.name);
        }else {
            this.props.addBookandAuthor(this.state);
        }
    }

    render(){
        return(
            <div className = "AddBookForm">
                <h3>Add Books</h3>
            <form onSubmit = {this.handleSubmit}>
                <div className = "AddAuthorForm_input">
                    <label htmlFor = "name">Author Name</label><br/>
                    <input type = "text" name = "name" value= {this.state.name} onChange = {this.onFieldChanged} />
                </div>
                <div className = "AddAuthorForm_input">
                    <label htmlFor = "imageUrl">image Url</label><br/>
                    <input type = "text" name = "imageUrl" value = {this.state.imageUrl} onChange = {this.onFieldChanged}/>
                </div>
                <div className = "AddAuthorForm_input">
                    <label htmlFor = "bookTemp">Books</label><br/>
                    <input type = "text" name = "bookTemp" value ={this.state.bookTemp} onChange = {this.onFieldChanged} />
                    <input type = "button" value="+" onClick = {this.addBookButton}/><br/>
                    {this.state.books.map((book) => <p key = {book}>{book}</p>)} 
                </div>
                <br/>
                <input type = "submit" value = "Add" />
            </form>
            
            </div>
        );
    }
} 
function mapStateToProps(state){
    return {
        authors: state.authors,
    };
  }
  
  function mapDispatchToProps(dispatch, props){
    return{
      addBookandAuthor: (author) =>{
          dispatch({
              type: 'ADD_BOOK_AND_AUTHOR',
              author: author,
          });
          props.history.push('/')
      },
      addBooknotAuthor: (book,author) => {
          dispatch({
              type: 'ADD_BOOK_NOT_AUTHOR',
              book: book,
              author: author,
          });
          props.history.push('/');
      }
    };
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(function AddBook({authors, addBooknotAuthor, addBookandAuthor}){
    return (
        <div>
            <BookForm authors = {authors} addBookandAuthor = {addBookandAuthor} addBooknotAuthor = {addBooknotAuthor}></BookForm>
        </div>
    );
})
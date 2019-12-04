import React from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import './BookList.css';
import { Link } from "react-router-dom";



class Book extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            book: '',
            authors: this.props.authors,
            isShow: false,
            bookAu: {},
        }
    }

    findAuthor = (title) => {
        const findBook = (book) => book === title;
        const author = author => author.books.some(findBook);
        return this.state.authors.find(author);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const au = this.findAuthor(this.state.book);
        this.setState({isShow: true, bookAu: au});
      };
    
      handleDelete = (event) => {
        event.preventDefault();
        const book = this.state.book;
        const au = this.findAuthor(book);
        this.props.onDeleteBook(book,au);
        this.setState({book: '',});
      };

    render(){
        return(
            <div>
                <form>
                    <input type = 'text' value = {this.state.name} placeholder = "Book's name" onChange = {event => this.setState({book: event.target.value})} required></input>
                    <button onClick = {this.handleSubmit}>搜索</button>
                    <button onClick = {this.handleDelete}>删除</button>
                    <button ><Link to='/addBook' className = 'link'>添加</Link></button>
                </form>
                <BookCard book = {this.state.book} isShow = {this.state.isShow} au = {this.state.bookAu}></BookCard>
                <div>
                    <p className = 'bookList'>书籍列表：</p>
                    {this.props.allBooks.map((title,index) => {
                        const au = this.findAuthor(title);
                        return (
                        <div className = 'bookCard'>
                            <p className = 'bookName'>bookName:</p>
                            <p key = {index} className = 'title'>&nbsp; &nbsp; {title}</p>
                            <div  className = 'authorName'>
                                <p className = 'bookName'>AuthorName：</p>
                                <p key = {index} >&nbsp; &nbsp; {au.name} {}</p>
                            </div>
                        </div>);
                    })}
                </div>
            </div>
        );
    }
}  

function BookCard(props) {
    const au = props.au;
    return(
        <div className = {props.isShow? "showCard":"notShowCard"}>
                <div className = 'bookCard'>
                    <p className = 'bookName'>bookName:</p>
                    <p className = 'title'>&nbsp; &nbsp; {props.book}</p>
                    <div  className = 'authorName'>
                        <p className = 'bookName'>AuthorName：</p>
                        <p>&nbsp; &nbsp; {au.name}</p>
                    </div>
                </div>)
        </div>
    );
}

function mapStateToProps(state){
    return {
      authors: state.authors,
      allBooks: state.authors.reduce(function(p, c, i) {
        return p.concat(c.books);}, []),
    };
  }
  
  function mapDispatchToProps(dispatch){
    return {
        onDeleteBook: (book,author) =>{
            dispatch({type: 'DELETE_BOOK',
            book: book,
            author: author
        })}
    };
  }

 const BookList = connect(mapStateToProps,mapDispatchToProps)(function BookList({authors, allBooks, onDeleteBook}){
    return(
        <div>
            <Book authors = {authors} onDeleteBook = {onDeleteBook} allBooks = {allBooks}></Book>
        </div>
    );
});

export default withRouter(BookList);
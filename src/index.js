import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import "./index.css";
import AuthorQuiz from "./AuthorQuiz";
import * as serviceWorker from "./serviceWorker";
import { shuffle, sample } from "underscore";
import AddAuthorForm from "./AddAuthorForm";
import AuthorList from "./AuthorList";
import BookList from './BookList'
import AddBook from './AddBook'




const authors = [
  {
    name: "Mark Twain",
    imageUrl: "images/Authors/marktwain.jpg",
    imageSource: "Wikimedia Comments",
    books: [
      "The Adventures of Huckleberry Finn",
      "Life on the Mississippi",
      "Roughing"
    ]
  },
  {
    name: "Joseph Conrad",
    imageUrl: "images/Authors/josephconrad.png",
    imageSource: "Wikimedia Comments",
    books: ["Heart of Darkness"]
  },
  {
    name: "J.K. Rowling",
    imageUrl: "images/Authors/jkrowling.jpg",
    imageSource: "Wikimedia Comments",
    imageAttribution: "Daniel Ogren",
    books: ["Harry Potter and the Sorcerers Stone"]
  },
  {
    name: "Stephen King",
    imageUrl: "images/Authors/stephenking.jpg",
    imageSource: "Wikimedia Comments",
    imageAttribution: "Pinguino",
    books: ["The Shining", "IT"]
  },
  {
    name: "Charles Dickens",
    imageUrl: "images/Authors/charlesdickens.jpg",
    imageSource: "Wikimedia Comments",
    books: ["David Copperfield", "A Tale of Two Cites"]
  },
  {
    name: "William Shakespeare",
    imageUrl: "images/Authors/williamshakespeare.jpg",
    imageSource: "Wikimedia Comments",
    books: ["Hamlet", "Macbeth", "Rpmeo and Juliet"]
  }
];

function getTurnData(authors) {  
  const allBooks = authors.reduce(function(p, c, i) {
    return p.concat(c.books);
  }, []);
  const fourRandomBooks = shuffle(allBooks).slice(0, 4);
  const answer = sample(fourRandomBooks);
  const howToFindBook = title => title === answer;
  const howToFindAuthor = author => author.books.some(howToFindBook);
  return {
    books: fourRandomBooks,
    author: authors.find(howToFindAuthor),
    allBooks:allBooks,
  };
}

//reducer是一个获取现有状态和操作的函数,并将该操作的应用于现有状态以生成新状态
function reducer(state = { authors, turnData: getTurnData(authors), highlight: ''}, action){
  switch(action.type){
    case 'ANSWER_SELECTED':
      const isCorrect =  state.turnData.author.books.some((book) => book === action.answer);
      return Object.assign({},
        state, {
          highlight: isCorrect? 'correct' : 'wrong'
        });
    case 'CONTINUE':
        return Object.assign({},state, {
          highlight: '',
          turnData: getTurnData(state.authors)
        });
    case 'ADD_AUTHOR':
      return Object.assign({}, state, {
        authors: state.authors.concat([action.author])
      });
    case 'DELETE_AUTHOR':
      return Object.assign({},state,{
        authors: state.authors.splice(state.authors.indexOf(action.author),1)
      });
    case 'DELETE_BOOK':
      const authorB = state.authors.map((author) => {
        if(author.books.some((book) => book === action.book)){
          author.books.splice(author.books.indexOf(action.book), 1)
         }
         return author;
      });
      return Object.assign({}, state, {
        authors: authorB
        });
      case 'ADD_BOOK_AND_AUTHOR':
        return Object.assign({}, state, {
          authors: state.authors.concat([action.author])
        });
      case "ADD_BOOK_NOR_AUTHOR":
        const authorNew = state.authors.map((author) => {
          if(author.name === action.author){
            author.books.push([action.book]);
          }
          return author;
        });
        return Object.assign({}, state, {
          authors: authorNew,
        });
      
    default: return state;
  }
}

let store = Redux.createStore(reducer )

ReactDOM.render(
  <BrowserRouter>      
    <ReactRedux.Provider store = {store}>
      <React.Fragment>
        <Route exact path="/" component={AuthorQuiz} ></Route>
        <Route path = "/add" component = {AddAuthorForm}></Route>
        <Route path = "/authors" component = {AuthorList}></Route>
        <Route path = "/books" component = {BookList}></Route>
        <Route path = "/addBook" component = {AddBook}></Route>
      </React.Fragment>
    </ReactRedux.Provider>
  </BrowserRouter>,document.getElementById("root"));

serviceWorker.unregister();

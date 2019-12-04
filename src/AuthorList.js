import React from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
import './AuthorList.css';

class AuthorForm extends React.Component{
  constructor(props){
    console.log("constructor");
    super(props);
    this.state = {
      name:'',
      authorSearch: {
        name: '',
        books: [],
      },
      isShow: false,
      authors: this.props.authors,
    }
  }

  handleSubmit = (event) => {
    console.log("handleSubmit");
    event.preventDefault();
    var au = this.state.authors.find(x => {
      if(x.name === this.state.name){
        return x;
      }})
    this.setState({
      authorSearch: au,
      isShow: true,
      });
    this.setState({
      name:'',
    });
  };

  handleDelete = (event) => {
    console.log("handleDelete");
    event.preventDefault();
    const authorDelete = this.state.authors.find((x,index) => {
      if(x.name === this.state.name){
        return x;
      } 
    });
    this.props.onDeleteAuthor(authorDelete);
    this.setState({name: '',});
  };

  render(){
    return (
      <div className = 'header'>
        <form>
          <input type = 'text' value = {this.state.name} placeholder = "Author's Name" onChange = {event => this.setState({name: event.target.value})} required></input>
          <button onClick = {this.handleSubmit}>搜索</button>
          <button onClick = {this.handleDelete}>删除</button>
          <button ><Link to='/add' className = 'link'>添加</Link></button>
        </form>
       <AuthorCard authors = {this.state.authors} profile = {this.state.authorSearch} isShow= {this.state.isShow} ></AuthorCard> 
       <AuthorCardList authors = {this.state.authors}/>    
      </div>
      );
  }
}

function AuthorCard(props){
  console.log("AuthorCard");
  const profile = props.profile;
  const auBook = props.profile.books;
  const isShow = props.isShow;
  
  return (
    <div className = {isShow? "authorCard1":"authorCard"} >
      <img className = 'image' src = {profile.imageUrl} alt = {profile.name}></img>
      <div className = "word1">
          <p className = 'books'>name: </p>
          <p className = 'name'>&nbsp; &nbsp; {profile.name}</p>
          <div className = 'books'>books:</div>
          <div >{auBook.map((book,index) => {return <div className = 'name' key = {index} > &nbsp; &nbsp; {book}</div>;})}
          </div>
      </div>    
    </div>
  );
}

function AuthorCardList(props){
  console.log("AuthorCardList");
  return <div>
  <p className = 'authorP'>作者列表：</p>
  {props.authors.map((a) => { 
    return (
    <div className = "card">
        <img className = 'image' src = {a.imageUrl} alt = {a.name}></img>
        <div className = "word">
          <p className = 'books'>name: </p>
          <p className = 'name'>&nbsp; &nbsp; {a.name}</p>
          <div className = 'books'>books:</div>
          <div >{a.books.map((book,index) => {return <div key = {index }className = 'name'> &nbsp; &nbsp; {book} </div>;})}</div>
        </div>
    </div>
    );
  })}
</div>;
}

function mapStateToProps(state){
  console.log("mapStateToProps");
  return {
    authors: state.authors,
  };
}

function mapDispatchToProps(dispatch){
  console.log("mapDispatchToProps");
  return{
    onDeleteAuthor: (author) => {
      dispatch({type:'DELETE_AUTHOR',author})
    }
  };
}

const AuthorList = connect(mapStateToProps, mapDispatchToProps)(function AuthorList({ authors, onDeleteAuthor}){
  return (
    <div>
      <AuthorForm authors = {authors} onDeleteAuthor = {onDeleteAuthor}/>  
    </div>
  );
});
export default withRouter(AuthorList);

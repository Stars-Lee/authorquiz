import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';
import Enzyme, {mount, shallow, render} from "enzyme";
import Adapter from "enzyme-adapter-react-16";


Enzyme.configure({ adapter: new Adapter()});

//添加一些虚拟应用程序数据
const state = {
  turnData: {
    books: ['The Shining', 'IT', 'David Copperfield', 'A Tale of Two Cities', 'Hamlet', "Macbeth", "Rpmeo and Juliet","David Copperfield", "A Tale of Two Cites"],
    author: {
      name: "Charles Dickens",
      imageUrl: "images/Authors/charlesdickens.jpg",
      imageSource: "Wikimedia Comments",
      books: ["David Copperfield", "A Tale of Two Cites"] 
    },
  },
  highlight: 'none'
}


//测试我们的组件可以渲染而不会崩溃
describe("Author Quiz",() => {
  it("renders without crashing",() =>{
    const div = document.createElement("div");
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected = {()=>{}}/>, div);
  });
});
describe("when no answer has been selected", ()=>{
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<AuthorQuiz{...state} onAnswerSelected = {() => {}} />);
  });
  it("should have no background color",() => {
    expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe("");
  });
});
describe("When the wrong answer has been selected", () =>{
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <AuthorQuiz {...(Object.assign({}, state, {highlight: 'wrong'}))} onAnswerSelected ={() => {}}/> )
  });
  it("should have red background color",() => {
    expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe("red");
  });
});

describe("When the correct answer has been selected", () =>{
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <AuthorQuiz {...(Object.assign({}, state, {highlight: 'correct'}))} onAnswerSelected ={() => {}}/> )
  });
  it("should have green background color",() => {
    expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe("green");
  });
});
describe("when the first answer has been selected", ()=>{
  let wrapper;
  const handleAnswerSelected = jest.fn();
  beforeAll(() => {
    wrapper = mount(<AuthorQuiz{...state} onAnswerSelected = {handleAnswerSelected} />);
    wrapper.find('.answer').first().simulate('click');
  });
  it("onAnswerSelected should be called",() => {
    expect(handleAnswerSelected).toHaveBeenCalled();
  
  });
  it("should receive The Shining", () =>{
    expect(handleAnswerSelected).toHaveBeenCalledWith("The Shining")
  });
});



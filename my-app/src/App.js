import React, { Component } from 'react';
import Movie from './Movie';
import './App.css';

const 

class App extends Component {
  state = {
    greeting: 'hello'  ,
    
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        movies: [
          {
            title: "Matrix",
            poster: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/The_Matrix_Poster.jpg/220px-The_Matrix_Poster.jpg"
          },
          {
            title: "Full Metal Jacket",
            poster: "https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Full_Metal_Jacket_poster.jpg/220px-Full_Metal_Jacket_poster.jpg"
          },
          {
            title: "Oldboy",
            poster: "https://upload.wikimedia.org/wikipedia/en/thumb/6/67/Oldboykoreanposter.jpg/220px-Oldboykoreanposter.jpg"
          },
          {
            title: "Start Wars",
            poster: "https://is4-ssl.mzstatic.com/image/thumb/Video69/v4/e4/3d/a1/e43da14b-0354-62fb-304c-ad53f8ba9fa6/pr_source.lsr/268x0w.png"
          },
          {
            title: "Trainspotting",
            poster: ""
          }
        ]
      })
    }, 5000)
  }
  render() {
    return (
      <div className="App">
        Loading
      </div>
    );
  }
}

export default App;

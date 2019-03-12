import React, { Component } from 'react';
import './App.css';
import vader from './darthvader.jpg';
import yoda from './yoda.jpg';
import stormtrooper from './stormtrooper.png';



class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      title: "Your Star Wars Doppelganger is...",
      possibilities: [],
      suggestions: [],
      count: 0,
      questions: ["What is your hair color?", "What is your eye color?", "height? (in cm)", "mass? (in kg)"],
      searchAttributes: ["hair_color", "eye_color", "height", "weight"],
      answer: "",
      films: [],
      next: null,
      failed: ""
    };

    this.search = this.search.bind(this);


  }

  search(event) {
    if (event.key == "Enter") {
      console.log("next is " + this.state.next);

      let i;
      let found = false;
      let numPoss = this.state.possibilities.length;
      let poss = this.state.possibilities;
      let filteredPoss = [];
      let att = this.state.searchAttributes[this.state.count];


      let j = 0;

      // this.setState({
      //   possibilities: []
      // })

      for (i = 0; i <numPoss; i ++) {
        console.log("LAST POS" + poss[i][att]);
        if (event.target.value === poss[i][att]) {
          found = true;
          filteredPoss[j] = poss[i];
          console.log("just added " + poss[i].name + " to possibilities and filtered now looks like " + filteredPoss.map(x => x.name));
          j = j+1
       
        }
      } 
      console.log("FINAL FILTERED " + filteredPoss.map(x => x.name));


    if(!found) {
      console.log("Could not find " + event.target.value);
      this.setState({
        failed: "Could not find " + event.target.value
      })
      
      return;
    }
    console.log("filtered possibilities: " + filteredPoss);

    this.setState({
      possibilities: filteredPoss,
      failed: "possiblilities: "+ filteredPoss.map(x => x.name),
      suggestions: (filteredPoss.filter(y => (y != "n/a"))).map(x => x[this.state.searchAttributes[this.state.count]])



    });
    if (filteredPoss.length == 1) {
      this.setState({
        title: "You are " + filteredPoss[0].name,
        questions: [] ,
        failed: "May the force be with you"
      });
    }

    this.setState({
      count: this.state.count + 1
    });
    console.log("poss should be filtered: " + this.state.possibilities);

   
    console.log("FINAL POSS " + this.state.possibilities);
    console.log(this.state.possibilities.length + " possibilites left: " + this.state.possibilities.map(x => x.name));


    if (this.state.possibilities.length == 1) {
      this.setState({
        title: this.state.possibilities[0].name
      })
      return;

    }
    if(this.state.count == this.state.questions.length-1) {
      this.setState({
        title: "You could be any of the following " + filteredPoss.map(x => x.name)
      })
      return;
    }


  }
}



  async componentDidMount() {
    const response = await fetch('https://swapi.co/api/people/');
    const json = await response.json();  
    this.setState({
       data: json.results,
       next: json.next,
       possibilities:json.results,
       suggestions: (json.results.filter(y => (y != "n/a"))).map(x => x[this.state.searchAttributes[this.state.count]])
      });
      // while (json.next != null) {
      //   const response = await fetch(json.results.next);
      //   const json = await response.json();  

      //   this.setState({
      //     possibilities: possibilities + json.results
      //   })
      // }
  }f

  render() {
    return (
      <div className="everything">
        {/* <div className = "title"> */}
          <h className = "title" >{this.state.title}</h>
        {/* </div> */}
        <div className = "pictures">
          <img className = "picture" src = {vader}></img>
          <img className = "pictureS" src = {stormtrooper}></img>


        </div>

        <p className = "question" >{this.state.questions[this.state.count]}</p>
        <p className = "failed" >{this.state.failed}</p>


        <input className = "input_field" placeholder= {"ex: " + this.state.suggestions} onKeyPress = {this.search}/>

      {console.log(this.state.possibilities)}

        
      </div>
    );
  }
}

export default App;

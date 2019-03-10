import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      title: "",
      possibilities: [],
      suggestions: [],
      count: 0,
      questions: ["What is your hair color?", "what is your eye color?", "height? (in cm)", "mass? (in kg)"],
      searchAttributes: ["hair_color", "eye_color", "height", "weight"],
      answer: "",
      films: [],
      next: null
    };

    this.search = this.search.bind(this);


  }

  search(event) {
    if (event.key == "Enter") {
      let i;
      let found = false;
      let numPoss = this.state.possibilities.length;
      let poss = this.state.possibilities;
      let filteredPoss = [];


      console.log("count is at " +this.state.count)
      console.log("ATTRIBUTES" + this.state.searchAttributes);
      console.log("numPoss" + numPoss);

      let att = this.state.searchAttributes[this.state.count];

      let j = 0;

      this.setState({
        possibilities: []
      })

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
      
      return;
    }
    console.log(filteredPoss);

    this.setState({
      possibilities: filteredPoss,


    });
    if (filteredPoss.length == 1) {
      this.setState({
        title: filteredPoss[0].name
      });
    }



    this.setState({
      
      count: this.state.count + 1

    });

    // let z;
    // for(z = 0; z <= filteredPoss.length; z ++) {
    //   this.state.possibilities[z] = filteredPoss[z];
    // }
    console.log("poss should be filtered: " + this.state.possibilities);

   
    console.log("FINAL POSS " + this.state.possibilities);
    console.log(this.state.possibilities.length + " possibilites left: " + this.state.possibilities.map(x => x.name));


    if (this.state.possibilities.length == 1) {
      this.setState({
        title: this.state.possibilities[0].name
      })
      return;

    }


  }
}



  async componentDidMount() {
    const response = await fetch('https://swapi.co/api/people/');
    const json = await response.json();  
    this.setState({
       title: "Your Star Wars Doppelganger is...",
       data: json.results,
       next: json.next,
       possibilities:json.results,
       suggestions: (json.results.filter(y => !(y == "n/a"))).map(x => x.hair_color)
      });
  }f

  render() {
    return (
      <div className="everything">
        {/* <div className = "title"> */}
          <h className = "title" >{this.state.title}</h>
        {/* </div> */}
        <p className = "question" >{this.state.questions[this.state.count]}</p>

        <input className = "input_field" placeholder= {this.state.suggestions} onKeyPress = {this.search}/>

      {console.log(this.state.possibilities)}

        
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react'

export class Main extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        isLoading: true,
        users: [],
      };
    }

  componentDidMount() {
    this.setState({ isLoading: true });
  
    fetch('/api/users')
      .then(response => response.json())
      .then(data => this.setState({ 
        users: data, 
        isLoading: false }))
      .catch(e => console.error(e));
  }

  render() {
    return (
      <div>
        This is main <br/>
        { this.state.isLoading ?
          <p>Loading...</p>
          :  <p>{ this.state.users }</p>
        }
      </div>
    )
  }
}

export default Main
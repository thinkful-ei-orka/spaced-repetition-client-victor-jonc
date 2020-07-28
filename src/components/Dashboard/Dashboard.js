import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import TokenService from '../../services/token-service';
import config from '../../config';

export default class Dashboard extends Component {
     state = {
          error: null
     }

  static contextType = UserContext;

     componentDidMount() {
          return fetch(`${config.API_ENDPOINT}/language`,
               {
                    headers: {
                         'authorization': `bearer ${TokenService.getAuthToken()}`
                    },
               })
               .then((res) => {
                    // const { language, words } = res.json();
                    console.log(res.json());
                    // this.context.setWords(words);
                    this.context.setLanguage(res.language);
               })
               .catch(error => this.setState({ error: error }));
     }
  
  render() {
    return (
      <div className='dashboard-container'>
        Total correct answers: {this.context.language.total_score}
        <h2 className='dashboard-header'>
          Dashboard {this.context.language.name}
          <Link to='/learn'>
            <button>Start practicing</button>
          </Link>
        </h2>
        <h3>Words to practice</h3>
        <ul>
          {this.context.words.map((word) => (
            <li key={word.id}>
              <h4>{word.original}</h4>
              {/* <span>correct answer count: {word.correct_count}</span>
              <span>incorrect answer count: {word.incorrect_count}</span> */}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

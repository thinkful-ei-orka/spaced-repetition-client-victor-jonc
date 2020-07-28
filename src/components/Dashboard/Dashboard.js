import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import TokenService from '../../services/token-service';
import config from '../../config';

export default class Dashboard extends Component {
  state = {
    error: null,
  };

  static contextType = UserContext;

  getData = () => {
    return fetch(`${config.API_ENDPOINT}/language`, {
      method: 'GET',
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.context.setWords(res.words);
        this.context.setLanguage(res.language);
        this.context.setIsLoading();
      })

      .catch((error) => this.setState({ error: error }));
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    if (this.context.isLoading) {
      return <div>Loading...</div>;
    }
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
              <span>correct answer count: {word.correct_count}</span>
              <span>incorrect answer count: {word.incorrect_count}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

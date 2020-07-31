import React from 'react';
import TokenService from '../services/token-service';
import config from '../config';
import UserContext from '../contexts/UserContext';
// import Button from '../components/Button/Button';
// import Feedback from '../components/Feedback/Feedback';

/*
set up a componentdidmount for language/head

set up a submit form (set current word, set guess, post guess, set next word, display feedback, set loading)

show, clear, and get feedback */

export default class Learn extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.guessinput = React.createRef();
  //   }

  static contextType = UserContext;

  getTheNextWord = () => {
    console.log('trying to get the next word');
    return fetch(`${config.API_ENDPOINT}/language/head`, {
      method: 'GET',
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('successfully got the next word');
        this.context.setNextWord(data);
      })
      .then(() => this.context.setIsLoading(false))
      .catch((err) => {
        console.log(err);
        this.context.setError(err);
      });
  };

  submitGuess = (e) => {
    e.preventDefault();
    this.context.setGuess(e.target['learn-guess-input'].value);
    this.context.setCurrentWord(this.context.nextWord.nextWord);
    let body = {
      guess: e.target['learn-guess-input'].value,
    };

    return fetch(`${config.API_ENDPOINT}/language/guess`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        this.context.setScore(data.totalScore);
        this.context.setAnswer(data.answer);
        this.context.setNextWord(data);
        this.context.setIsCorrect(data.isCorrect);
        this.context.setIsLoading(false);
      });
  };

  //   showFeedback = () => {
  //     if (this.context.nextWord.isCorrect === true) {
  //       return <div className='correct'>Correct!</div>;
  //     } else if (this.context.nextWord.isCorrect === false) {
  //       return;
  //     }
  //     return 'feedback hidden';
  //   };

  componentDidMount() {
    //     this.context.setIsLoading(true);
    if (!this.context.nextWord.totalScore) {
      this.getTheNextWord();
    }
  }

  render() {
    if (this.context.isLoading == true) {
      return <div>loading...</div>;
    }

    return (
      <div className='learn-container'>
        <section className='learn-data'>
          <p>Your total score is: {this.context.nextWord.totalScore}</p>
          <div>
            <h2>Translate the word:</h2>{' '}
            <span>{this.context.nextWord.nextWord}</span>
          </div>
          <div>
            <p>
              You have answered this word correctly{' '}
              {this.context.nextWord.wordCorrectCount} times.
            </p>
            <p>
              You have answered this word incorrectly{' '}
              {this.context.nextWord.wordIncorrectCount} times.
            </p>
          </div>
        </section>
        <section className='word-guess'>
          <form
            onSubmit={(e) => {
              this.submitGuess(e);
              e.target['learn-guess-input'].value = '';
            }}>
            <label htmlFor='learn-guess-input' className='guessinput'>
              What's the translation for this word?
            </label>
            <input
              type='text'
              id='learn-guess-input'
              name='learn-guess-input'
              required
            />
            <button type='submit'>Submit your answer</button>
          </form>
        </section>
      </div>
    );
  }
}

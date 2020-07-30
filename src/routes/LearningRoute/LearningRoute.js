import React, { Component } from 'react';
import Learn from '../../Learn/Learn';
import Feedback from '../../components/Feedback/Feedback';
import UserContext from '../../contexts/UserContext';

class LearningRoute extends Component {
  static contextType = UserContext;

  render() {
    if (this.context.isCorrect !== null) {
      return (
        <section>
          <Feedback />
        </section>
      );
    }

    return (
      <section>
        <Learn />
      </section>
    );
  }
}

export default LearningRoute;

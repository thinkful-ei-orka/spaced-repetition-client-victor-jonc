import React, { Component } from 'react';
import AuthApiService from '../services/auth-api-service';
import TokenService from '../services/token-service';
import IdleService from '../services/idle-service';

const UserContext = React.createContext({
  user: {},
  error: null,
  setError: () => {},
  clearError: () => {},
  setUser: () => {},
  processLogin: () => {},
  processLogout: () => {},
  language: null,
  words: [],
  score: null,
  nextWord: {},
  currentWord: {},
  attempt: null,
  setLanguage: () => {},
  setWords: () => {},
  setNextWord: () => {},
  setScore: () => {},
  setCurrentWord: () => {},
  setAttempt: () => {},
});

export default UserContext;

export class UserProvider extends Component {
  constructor(props) {
    super(props);
    const state = {
      user: {},
      error: null,
      language: null,
      words: [],
      score: null,
      nextWord: null,
      currentWord: null,
      attempt: null,
    };

    const jwtPayload = TokenService.parseAuthToken();

    if (jwtPayload)
      state.user = {
        id: jwtPayload.user_id,
        name: jwtPayload.name,
        username: jwtPayload.sub,
      };

    this.state = state;
    IdleService.setIdleCallback(this.logoutBecauseIdle);
  }

  componentDidMount() {
    if (TokenService.hasAuthToken()) {
      IdleService.regiserIdleTimerResets();
      TokenService.queueCallbackBeforeExpiry(() => {
        this.fetchRefreshToken();
      });
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets();
    TokenService.clearCallbackBeforeExpiry();
  }

  setIsLoading = () => {
    this.setState({ isLoading: false });
  };

  setLanguage = (language) => {
    this.setState({ language });
  };
  setWords = (words) => {
    this.setSate({ words });
  };
  setNextWord = (nextWord) => {
    this.setState({ nextWord });
  };
  setScore = (score) => {
    this.setState({ score });
  };
  setCurrentWord = (currentWord) => {
    this.setState({ currentWord });
  };
  setAttempt = (attempt) => {
    this.setState({ attempt });
  };

  setError = (error) => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  setUser = (user) => {
    this.setState({ user });
  };

  processLogin = (authToken) => {
    TokenService.saveAuthToken(authToken);
    const jwtPayload = TokenService.parseAuthToken();
    this.setUser({
      id: jwtPayload.user_id,
      name: jwtPayload.name,
      username: jwtPayload.sub,
    });
    IdleService.regiserIdleTimerResets();
    TokenService.queueCallbackBeforeExpiry(() => {
      this.fetchRefreshToken();
    });
  };

  processLogout = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.setUser({});
  };

  logoutBecauseIdle = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.setUser({ idle: true });
  };

  fetchRefreshToken = () => {
    AuthApiService.refreshToken()
      .then((res) => {
        TokenService.saveAuthToken(res.authToken);
        TokenService.queueCallbackBeforeExpiry(() => {
          this.fetchRefreshToken();
        });
      })
      .catch((err) => {
        this.setError(err);
      });
  };

  render() {
    const value = {
      user: this.state.user,
      error: this.state.error,
      language: { name: 'Spanish', total_score: 0 },
      words: this.state.words,
      score: this.state.score,
      nextWord: this.state.nextWord,
      currentWord: this.state.currentWord,
      attempt: this.state.attempt,
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
      processLogin: this.processLogin,
      processLogout: this.processLogout,
      setLanguage: this.setLanguage,
      setWords: this.setWords,
      setNextWord: this.setNextWord,
      setScore: this.setScore,
      setCurrentWord: this.setCurrentWord,
      setAttempt: this.setAttempt,
      isLoading: true,
      setIsLoading: this.setIsLoading,
    };
    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

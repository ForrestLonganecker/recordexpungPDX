import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/store';
import { setError } from '../../redux/errors/actions';
import { ErrorMessage } from '../../redux/errors/types';
import NotAuthorized from '../NotAuthorized';
import TechnicalDifficulties from '../TechnicalDifficulties';

interface Props {
  errors: ErrorMessage;
  setError: Function;
}

class Error extends React.Component<Props> {
  componentDidMount() {
    console.log('COMPONENT DID MOUNT!!!!', this.props.errors);
  }

  componentDidUpdate() {
    console.log('COMPONENT DID UPDATE!!!');
  }

  displayError = () => {
    return this.props.errors === 'unauthorized' ? (
      <NotAuthorized />
    ) : this.props.errors === 'technical' ? (
      <TechnicalDifficulties />
    ) : null;
  };

  render() {
    console.log('errors: ', this.props.errors);
    return this.displayError();
  }
}

const mapStateToProps = (state: AppState) => ({
  errors: state.errors.errorType
});

export default connect(
  mapStateToProps,
  { setError }
)(Error);

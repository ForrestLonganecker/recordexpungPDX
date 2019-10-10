import React from 'react';

class NoUsers extends React.Component {
  displayComponent = () => (
    <p className="bg-white mv4 pa4 br3 fw6">
      <span className="spinner mr2"></span>Loading Users...
    </p>
  );

  render() {
    return this.displayComponent();
  }
}

export default NoUsers;

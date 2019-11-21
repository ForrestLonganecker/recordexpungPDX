import React from 'react';

class NotAuthorized extends React.Component {
  render() {
    return (
      <p className="bg-white mv4 pa4 br3 fw6 tc">
        You are not authorized to view this content, contact system
        administraitor.
      </p>
    );
  }
}

export default NotAuthorized;

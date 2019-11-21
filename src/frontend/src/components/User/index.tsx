import React from 'react';
import { User as UserTypes } from '../../redux/users/types';

interface Props {
  user: UserTypes;
}

class User extends React.Component<Props> {
  public render() {
    return (
      <tr>
        <td className="pa3 bb b--black-20">
          <a href="/admin" className="underline">
            {this.props.user.name}
          </a>
        </td>
        <td className="pa3 bb b--black-20">
          {this.props.user.admin ? 'Admin' : 'Search'}
        </td>
        <td className="pa3 bb b--black-20">{this.props.user.group}</td>
        <button
          aria-label="edit group"
          className="navy hover-dark-blue bb b--black-20 pa3"
        >
          <i aria-hidden="true" className="fa fa-pen pr3"></i>
        </button>
        <button
          aria-label="delete group"
          className="navy hover-dark-blue bb b--black-20 pa3"
        >
          <i aria-hidden="true" className="fa fa-trash"></i>
        </button>
      </tr>
    );
  }
}

export default User;

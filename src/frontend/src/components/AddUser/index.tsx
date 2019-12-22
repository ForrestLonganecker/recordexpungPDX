import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/store';
import { UserState } from '../../redux/users/types';
import validateEmail from '../../service/email-validation';
import Logo from '../Logo';

interface Props {
  users: UserState;
}

interface State {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  group: string;
  role: string;
  invalidCredentials: boolean;
  invalidResponse: boolean;
  invalidEmail: boolean;
  missingPassword: boolean;
  passwordsDoNotMatch: boolean;
  missingGroup: boolean;
  missingRole: boolean;
}

class AddUser extends React.Component<Props, State> {
  public state: State = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    group: '',
    role: '',
    invalidCredentials: false,
    invalidResponse: false,
    invalidEmail: false,
    missingPassword: false,
    passwordsDoNotMatch: false,
    missingGroup: false,
    missingRole: false
  };

  public handleChange = (e: React.BaseSyntheticEvent) => {
    // See https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26635 for why we're
    // using the "any" type.
    this.setState<any>({
      [e.target.id]: e.target.value
    });
  };

  public handleSubmit = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();

    // Standardize email-lowerCase and trim both form inputs
    this.setState(
      {
        email: this.state.email.toLowerCase().trim(),
        password: this.state.password.trim(),
        confirmPassword: this.state.confirmPassword.trim(),
        group: this.state.group.trim(),
        role: this.state.role
      },
      () => {
        this.validateForm();
      }
    );
  };

  public validateForm() {
    // validate email returns true for email input of: "_@_._" empty returns false
    this.setState(
      {
        invalidEmail: !validateEmail(this.state.email),
        missingPassword: this.state.password.length === 0,
        missingGroup: this.state.group.length === 0,
        passwordsDoNotMatch: this.state.confirmPassword === this.state.password,
        missingRole: this.state.role.length === 0
      },
      () => {
        // If no errors are present, attempt to create user.
        if (
          !this.state.invalidEmail &&
          !this.state.missingPassword &&
          !this.state.missingGroup &&
          !this.state.passwordsDoNotMatch &&
          !this.state.missingRole
        ) {
          // TODO: submit to backend
          // CATCH: 422 === email is in use / password < 8 characters long
          // CATCH: 400 === missing fields
        }
      }
    );
  }

  public render() {
    return (
      <main className="mw6 ph2 center">
        <section className="cf mt4 mb3 pa3 pa4-l bg-white shadow br3">
          <Logo />
          <h1 className="mb4 f4 fw6">Add User</h1>
          <form onSubmit={this.handleSubmit} noValidate={true}>
            <legend className="visually-hidden">Sign Up</legend>
            <div className="mb4">
              <label htmlFor="username" className="db mb2 fw6">
                Name
              </label>
              <input
                id="username"
                name="username"
                type="text"
                className="w-100 pa3 br2 b--black-20"
                required={true}
                aria-describedby={
                  this.state.invalidCredentials ? 'no_match_msg' : undefined
                }
                aria-invalid={
                  this.state.invalidCredentials || this.state.missingPassword
                    ? true
                    : false
                }
                onChange={this.handleChange}
              />
            </div>
            <div className="mb4">
              <label htmlFor="email" className="db mb2 fw6">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-100 pa3 br2 b--black-20"
                required={true}
                aria-describedby={
                  this.state.invalidEmail
                    ? 'email_msg'
                    : this.state.invalidCredentials
                    ? 'no_match_msg'
                    : undefined
                }
                aria-invalid={
                  this.state.invalidEmail || this.state.invalidCredentials
                    ? true
                    : false
                }
                onChange={this.handleChange}
              />
            </div>
            <div className="mb4">
              <label htmlFor="password" className="db mb2 fw6">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="w-100 pa3 br2 b--black-20"
                required={true}
                aria-describedby={
                  this.state.invalidCredentials
                    ? 'no_match_msg'
                    : this.state.missingPassword
                    ? 'input_msg'
                    : undefined
                }
                aria-invalid={
                  this.state.invalidCredentials || this.state.missingPassword
                    ? true
                    : false
                }
                onChange={this.handleChange}
              />
            </div>
            <div className="mb4">
              <label htmlFor="password" className="db mb2 fw6">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                className="w-100 pa3 br2 b--black-20"
                required={true}
                aria-describedby={
                  this.state.passwordsDoNotMatch
                    ? 'password_mismatch_msg'
                    : undefined
                }
                aria-invalid={this.state.passwordsDoNotMatch ? true : false}
                onChange={this.handleChange}
              />
            </div>
            <div className="mb4">
              <label htmlFor="group" className="db mb2 fw6">
                Group
              </label>
              <input
                id="group"
                name="group"
                type="text"
                className="w-100 pa3 br2 b--black-20"
                required={true}
                aria-describedby={
                  this.state.missingGroup ? 'no_group_msg' : undefined
                }
                aria-invalid={this.state.missingGroup ? true : false}
                onChange={this.handleChange}
              />
            </div>
            <div className="mb4">
              <label htmlFor="role" className="db mb2 fw6">
                Role
              </label>
              <div className="pl0 ml0 center ba bw1 b--black-20 br2">
                {/* TODO: make radio buttons populate form */}
                <div className="ph3 bb bw1 b--black-20">
                  <div className="radio">
                    <input
                      type="radio"
                      id="search"
                      name="role"
                      value="search"
                      className="v-top"
                      checked
                    />
                    <label htmlFor="search" className="fw6">
                      Search
                    </label>
                  </div>
                  <div className="radio">
                    <p className="mt3 ml4 mb4">
                      &bull;&nbsp;Can search records
                    </p>
                  </div>
                </div>
                <div className="ph3">
                  <div className="radio">
                    <input
                      type="radio"
                      id="admin"
                      name="role"
                      value="admin"
                      className="v-top"
                    />
                    <label htmlFor="admin" className="fw6">
                      Admin
                    </label>
                  </div>
                  <ul className="list mt3 ml4 mb4">
                    <li className="mb1">&bull;&nbsp;Can search records</li>
                    <li className="mb1">
                      &bull;&nbsp;Can manage users and groups
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <button className="bg-blue white bg-animate hover-bg-dark-blue fw6 db w-100 br2 pv3 ph4 mb4 tc">
              Sign Up
            </button>
            <div role="alert" className="w-100">
              {this.state.invalidEmail === true ? (
                <p id="email_msg" className="bg-washed-red mv4 pa3 br3 fw6">
                  Invalid email address.
                </p>
              ) : null}
              {this.state.missingPassword ||
              this.state.missingGroup ||
              this.state.missingRole ? (
                <p id="input_msg" className="bg-washed-red mv4 pa3 br3 fw6">
                  All fields are required.
                </p>
              ) : null}
              {this.state.passwordsDoNotMatch === true ? (
                <p
                  id="password_mismatch_msg"
                  className="bg-washed-red mv4 pa3 br3 fw6"
                >
                  Passwords do not match.
                </p>
              ) : null}
              {this.state.invalidCredentials === true ? (
                <p id="no_match_msg" className="bg-washed-red mv4 pa3 br3 fw6">
                  Email is already in use or form is missing input information.
                </p>
              ) : null}
              {this.state.invalidResponse === true ? (
                <p id="no_match_msg" className="bg-washed-red mv4 pa3 br3 fw6">
                  Technical difficulties, please contact system administrator.
                </p>
              ) : null}
            </div>
          </form>
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  users: state.users
});

export default connect(mapStateToProps)(AddUser);

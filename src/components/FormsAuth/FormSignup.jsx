import React, { Component, Fragment } from 'react';
import { Link, Redirect } from "react-router-dom";
import apiHandler from '../../api/apiHandler';
import UserContext from '../Auth/UserContext';

export default class FormSignup extends Component {
	static contextType = UserContext;

	state = {
		firstName: 'Anita',
		lastName: 'LE',
		password: 'Tran123',
		email: 'lena@gmail.com',
		errors: {
			err_firstName: '',
			err_lastName: '',
			err_password: '',
			err_email: '',
			err_submit: ''
		},

	}

	handleChange = (event) => {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	}

	checkValidation = () => {
		const { lastName, firstName, email, password } = this.state;
		let isValid = true;
		let errors = {};

		//check email
		if (!email) {
			errors.err_email = 'Please enter your email correctly';
			isValid = false;
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
			errors.err_email = 'Email address is invalid';
			isValid = false;
		}

		//check password
		const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
		
		if (!password) {
			isValid = false;
			errors.err_password = 'Please enter your password';
		} else if (password.length < 6) {
			isValid = false;
			errors.err_password = "Enter a password, minimum of 6 characters, 1 uppercase, 1 lowercase and 1 number digit";
		} else if(!regex.test((password))){
			isValid = false;
			errors.err_password = "Enter a password, minimum of 6 characters, 1 uppercase, 1 lowercase and 1 number digit";
		}

		//check name
		if (!firstName) {
			isValid = false;
			errors.err_firstName = 'Please enter your first name';
		}

		if (!lastName) {
			isValid = false;
			errors.err_lastName = 'Please enter your last name';
		}

		this.setState({ errors });

		setTimeout(() => {
			this.setState({ errors: "" });
		}, 5000);

		return isValid;

	}

	handleSubmit = (event) => {
		event.preventDefault();
		if (this.checkValidation()) {
			const { errors, ...data } = this.state;
			console.log(errors)
			console.log(data)
			apiHandler.signup(data)
				.then(data => {
					this.context.setUser(data);
				})
				.catch(err => this.setState(prevState => ({
					errors: { ...prevState.errors, err_submit: err.message }
				})))

		} else {
			this.setState(prevState => ({
				errors: { ...prevState.errors, err_submit: "Try again!" }
			}));
		}
	}

	render() {
		if (this.context.isLoggedIn) return <Redirect to="/" />;

		const { lastName, firstName, email, password, errors } = this.state;
		const { err_lastName, err_firstName, err_email, err_password, err_submit } = errors;

		return (
			<Fragment>
				<header>
					<h1 className="flex-row-center">Sign up</h1>
				</header>

				<form onSubmit={this.handleSubmit} className="flex-column">
					<div className="form-group">
						<label className='label' htmlFor="firstName">First Name</label>
						<input
							className={err_firstName && "failure"}
							id="firstName"
							type="text"
							name="firstName"
							value={firstName}
							onChange={this.handleChange}
						/>
						{err_firstName && <p className="error-message">{err_firstName}</p>}


					</div>

					<div className="form-group">
						<label className='label' htmlFor="lastName">Last name</label>
						<input
							className={err_lastName && "failure"}
							id="lastName"
							type="text"
							name="lastName"
							value={lastName}
							onChange={this.handleChange}

						/>
						{err_lastName && <p className="error-message">{err_lastName}</p>}
					</div>

					<div className="form-group">
						<label className='label' htmlFor="email">Email</label>
						<input
							className={err_email && "failure"}
							id="email"
							type="text"
							name="email"
							value={email}
							onChange={this.handleChange}
						/>
						{err_email && <p className="error-message">{err_email}</p>}
					</div>

					<div className="form-group">
						<label className='label' htmlFor="password">Password</label>
						<input
							className={err_password && "failure"}
							id="password"
							type="password"
							name="password"
							value={password}
							onChange={this.handleChange}
						/>
						{err_password && <p className="error-message">{err_password}</p>}
					</div>

					<button className="btn btn-action btn__auth">Sign up</button>
					{err_submit && <p className="error-message">{err_submit}</p>}
				</form>

				<div>
					<p>Already have an account? <Link to="/login" className="btn"><strong>Log in</strong></Link> </p>
				</div>
			</Fragment>

		)
	}
}

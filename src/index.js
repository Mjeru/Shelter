import React from "react";
import ReactDom, { render } from "react-dom";
import {BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

function timeOnline(){
	let currentTime = new Date();
	currentTime = currentTime.getDate()*1440 + currentTime.getHours()*60 + currentTime.getMinutes() 
	currentTime = currentTime - localStorage.getItem("shelter");
	if (currentTime < 5) return true
	
}
function setStorTimer(){
	let currentTime = new Date();
	currentTime = currentTime.getDate()*1440 + currentTime.getHours()*60 + currentTime.getMinutes() 
	return currentTime
}

class RefApp extends React.Component {
	constructor(){
		super();
		
		this.state = {
			login: timeOnline()?true:false
		}
		this.authen = this.authen.bind(this)
	};
	
	authen(username,password){
		if (username == "Admin" && password == "Qwerty!123" ) {
			this.setState({login:true})
			localStorage.setItem("shelter", setStorTimer())
		} else {alert('Неверный логин или пароль')}
	};
	
	render() {
		return(
		<Router>

			<div>
				<header className="header">
					<div className="container">
						<div className="header__logo"></div>
						<nav className="header__nav">
						<ul className="nav__list">
							<li className="nav__item">
								<Link to="/animals">Animals</Link>
							</li>

							<li className="nav__item">
								<Link to="/today">Today</Link>
							</li>
						</ul>
						</nav>
					</div>
				</header>
				
		

			<Switch>
				<Route exact path="/">
					{!this.state.login ? <Redirect to="/login" /> : <Today />}
				</Route>
				<Route exact path="/animals">
					{!this.state.login ? <Redirect to="/login" /> :	<Animals />}
				</Route>
				
				<Route path="/today">
					{!this.state.login ? <Redirect to="/login" /> : <Today />}
				</Route>
				

				<Route path="/login">
					{this.state.login ? <Redirect to="/today" /> : <Login onSub={this.authen} />}
				</Route>
			</Switch>
			 
			</div>
		</Router>);
	}
	
}
class Animals extends React.Component {
	constructor(){
		super();
	}
	render(){
		return(
		<div className="page">
			<div className="container">
				<h1 className="page__header">Page Animals</h1>
					<div className="page__content">
						<img src="https://image.cnbcfm.com/api/v1/image/105992231-1561667465295gettyimages-521697453.jpeg?v=1561667497&w=740&h=416"/>
					</div>
			</div>
		</div>
		)
	}
}

class Today extends React.Component {
	constructor(){
		super();
	}
	render(){
		return(
		<div className="page">
			<div className="container">
				<h1 className="page__header">Page Today</h1>
					<div className="page__content">
						<img src="https://s0.rbk.ru/v6_top_pics/resized/1200xH/media/img/2/31/755913669534312.jpg"/>
					</div>
			</div>
		</div>
	)
	}
}
class Login extends React.Component {
	constructor(){
		super();
		
	}
	
	render(){
		let user = "";
		let pass = "";
		return(
				<div className="container">
						<h1 className="page__header">Login</h1>
						<div className="page__content">
							<form className="form" onSubmit={(event)=>{
								event.preventDefault()
								this.props.onSub(user,pass)
							}}>
								
								<input  className="form__item username" onChange={(event)=>{user = event.target.value;}} type="text"/>
								<input	 className="form__item password" onChange={(event)=>{pass = event.target.value;}} type="password"/>
								<button type="submit" className="form__item button">Войти</button>
							</form>
						</div>
				</div>
		)
	}
}


ReactDom.render (
	<RefApp />,
	document.querySelector('#app')
);
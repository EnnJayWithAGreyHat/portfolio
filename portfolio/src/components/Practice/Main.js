//Nathan Svoboda
//curly braces just means that there can be js that is written
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid";
import React, { Component } from "react";
import { createContext, useContext } from "react";
import Datalist from "./Datalist";
// import ReactDOM from 'react-dom';
//so for the class, it changes the scope of the "this" operator
//doing this for practice so that I do not have to pass by reference a lot
const Context = createContext(null);
const Main = () => {
	const [GlobalState, SetGlobalState] = useState([]);
	//console.log(GlobalState);
	//this is a way to log the state of everything anytime there is a rerender of that state, even if other states
	//do not rerender it is still output to the console
	useEffect(() => { console.log(GlobalState) }, [GlobalState])

	//this is the way that I delete, and it is in this component since I wanted to have the button inline, and it is
	//seemingly easier when that button is part of the list, essentially since then it can dissapear

	const handleDelete = (e) => {
		//access the key through the id variable

		const TheKey = e.target.id;
		//make a copy of the global state
		const tempstate = [...GlobalState];
		//store the modified array of the global state into a variable due to the way that js works		
		const tempstate2 = tempstate.filter(value => value.setkey !== TheKey);
		//set the global state to the new state, with the updated array of stuff
		SetGlobalState(tempstate2);
	}

	// const handleEdit = (e) => {

	// }

	return (
		<div>
			<Context.Provider value={{ GlobalState, SetGlobalState }}>
				<nav className="body">
					<Helper />
					<ul>{GlobalState.map((inValue) => (
						<li key={inValue.setkey} className="nameList">First name: {inValue.firstname} Last Name: {inValue.lastname}
							<button id={inValue.setkey} className="delButton" onClick={handleDelete}>DELETE</button>
						</li>
					))}</ul>
				</nav>
				<Datalist/>
			</Context.Provider>
		</div>
	);
}
//helper component to work with things outside of main app, and while this is not modularized good yet
//this will help

function Helper({

}) {
	//console.log(inputkey)
	//using the context from above to pass down access to that state
	const { GlobalState, SetGlobalState } = useContext(Context)
	const [FormState, SetFormState] = useState({
		firstname: "",
		lastname: "",
		setkey: uuidv4()
	});
	//this changes the last name in the formstate so that when the addbutton is pressed,
	//it can update the global state, which for this project is also displayed as a list

	useEffect(() => { console.log(FormState) }, [FormState])
	const handleLastChange = (e) => {
		SetFormState((old) => {

			//make a copy of the old state
			//change the lastname of the state to be the new one
			//update form state

			const temp = { ...old };
			temp.lastname = e.target.value;
			return temp;
		})
	}

	//this changes the first name in the formstate so that when the addbutton is pressed,
	//it can update the global state, which for this project is also displayed as a list

	const handleFirstChange = (e) => {
		SetFormState((old) => {

			//make a copy of the old state
			//change the firstname of the state to be the new one
			//update form state

			const temp = { ...old };
			temp.firstname = e.target.value;
			return temp;
		})
	}

	//this is how I add both the first and last name to the global state and update it

	const handleAddPerson = (e) => {
		SetFormState((old) => {
			//make a copy of the old state and change the key
			const temp = { ...old };
			temp.setkey = e.target.value;
			return temp;
		})

		//make a change to the old state to where all the differences between that and the 
		//form state are added into that state

		SetGlobalState((old) => [
			...old,
			FormState
		]);
	}

	return (
		//this is the JSX part where I have the input areas to input the first and last name for the list
		<div>
			<nav className="HelpNav">
				<form>
					<input placeholder="Enter your first name" id="first" type="text" value={FormState.firstname} onChange={(e) => handleFirstChange(e)} />
					<input placeholder="Enter your last name" id="last" type="text" value={FormState.lastname} onChange={(e) => handleLastChange(e)} />
				</form>
				<button className="addButton" value={uuidv4()} onClick={handleAddPerson}>ADD</button>
				{<p>Name List!!!!</p>
				}
			</nav>
		</div>
	);
}
//filter method for deletion
//write in an object to the global state using "handleAddPerson etc."
//again this is not needed when I am condensing into a single function, but it is good to have just in case
//const root = ReactDOM.createRoot(document.getElementById("root"));
// const company = {
//   name: "Hawkeye Energy Solutions",
//   phone: "(111)111-1111",
//   email: "test-email@hawkeye-es.com"
// }
//  const { name, phone, email } = company;
export default Main;
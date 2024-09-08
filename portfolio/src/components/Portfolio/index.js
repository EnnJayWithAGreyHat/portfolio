import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid";
import { React, createContext, useContext} from "react";
import './index.scss';
//import Datalist from "./Datalist";
const Context = createContext(null);
const Portfolio = () => {
const [GlobalState, SetGlobalState] = useState([]);
useEffect(() => { console.log(GlobalState) }, [GlobalState])
const handleDelete = (e) => {

    const TheKey = e.target.id;
    const tempstate = [...GlobalState];
    const tempstate2 = tempstate.filter(value => value.setkey !== TheKey);
    SetGlobalState(tempstate2);
}

    return (
        <div className="container portfolio">
		<h1 className="title1">Learning:</h1>
        <Context.Provider value={{ GlobalState, SetGlobalState }}>
            <nav className="body">
                <Helper />
                <ul className="elements">{GlobalState.map((inValue) => (
                    <li key={inValue.setkey} className="nameList">First name: {inValue.firstname} Last Name: {inValue.lastname}
                        <button id={inValue.setkey} className="delButton" onClick={handleDelete}>DELETE</button>
                    </li>
                ))}</ul>
            </nav>
        </Context.Provider>
    </div>
    );


}
function Helper() {
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
		<div className="listInputs">
			<nav className="HelpNav">
				<form className="movable1">
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





export default Portfolio
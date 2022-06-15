import React, { useState } from "react";
import "./App.css";

function App() {
  const [people, setPeople] = useState([
    {
      name: "John",
      lastName: "Doe",
      age: 30,
      favouriteFood: "Pizza",
      favouriteColour: "Red",
      counter: 0,
    },
  ]);

  const [name, setName] = useState("");
  const [lastName, setLastname] = useState("");

  const [calculation, setCalculation] = useState("");
  const [response, setRepsonse] = useState("");
  const operators = ["/", "*", "+", "-", "."];

  const generateDigits = () => {
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button
          onClick={() => updateCalculation(i.toString())}
          key={i}
          className="calculatorButton"
        >
          {i}
        </button>
      );
    }
    return digits;
  };

  const updateCalculation = (value) => {
    if (
      (operators.includes(value) && calculation === "") ||
      (operators.includes(value) && operators.includes(calculation.slice(-1)))
    ) {
      return;
    }
    setCalculation(calculation + value);

    if (!operators.includes(value)) {
      setRepsonse(eval(calculation + value).toString());
    }
  };
  const calculate = () => {
    if (calculation == "") {
      return;
    }
    setCalculation(eval(calculation).toString());
  };
  const deleteDigit = () => {
    if (calculation == "") {
      return;
    }
    const value = calculation.slice(0, -1);
    setCalculation(value);
  };

  return (
    <div className="App">
        <div className="form">
          <input
            className="input"
            placeholder="Name"
            type="text"
            name="name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <input
            className="input"
            placeholder="Last name"
            type="text"
            name="lastName"
            onChange={(event) => {
              setLastname(event.target.value);
            }}
          />
          <button
            className="user-submit-button"
            onClick={() => {
              setPeople((current) => [{ name, lastName }, ...current]);
            }}
          >
            Add user
          </button>
        <div className="user-list-container">
          <ul className="user-list">
            {people.map((person, idx) => (
              <li id={idx}>{`${person.name} ${person.lastName}`}</li>
            ))}
          </ul>
        </div>
        </div>
      <div className="calculator">
        <div className="display">{calculation || "0"}</div>
        <div className="calculatorButtons">
          {generateDigits()}
          <button
            className="calculatorButton calculatorButtonOperator"
            onClick={() => updateCalculation("/")}
          >
            /
          </button>
          <button
            className="calculatorButton calculatorButtonOperator"
            onClick={() => updateCalculation("*")}
          >
            *
          </button>
          <button
            className="calculatorButton"
            onClick={() => updateCalculation("0")}
          >
            0
          </button>
          <button
            className="calculatorButton calculatorButtonOperator"
            onClick={() => updateCalculation("+")}
          >
            +
          </button>
          <button
            className="calculatorButton calculatorButtonOperator"
            onClick={() => updateCalculation("-")}
          >
            -
          </button>
          <button
            className="calculatorButton calculatorButtonOperator"
            onClick={deleteDigit}
          >
            DEL
          </button>
          <button
            className="calculatorButton"
            onClick={() => updateCalculation(".")}
          >
            .
          </button>
          <button
            className="calculatorButton calculatorButtonEnter"
            onClick={calculate}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

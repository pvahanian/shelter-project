/*
A component meant to allow the user to select only one specific option
from a row of options (should de-select any other active option when
pressed).
*/

import React from "react";
import "../Assets/ExclusiveOption.scss";
import InvalidEntryMessage from "./InvalidEntryMessage";
import { ThemeContext } from "../ThemeContext";

// Child component of ExclusiveGroup
class ExclusiveButton extends React.Component {
  static contextType = ThemeContext;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //when button component is rendered check if its label is the same as the subservice value in localstorage
    //if so, call this.props.initiateSelected to change subservice buttons state to selected
    if (!JSON.parse(localStorage.getItem("fieldSelectorState"))) return;

    if (
      this.props.data.label ===
      JSON.parse(localStorage.getItem("fieldSelectorState")).subService
    ) {
      this.props.initiateSelected();
    }
  }

  render() {
    if (typeof this.props.data !== "string" && this.props.appendCategory) {
      // Assume object like {label, image} and build an SVG button
      return (
        <button
          className={
            "exclusive-button " +
            (this.props.selected ? "selected " : " ") +
            this.context
          } // changes CSS and appearance when an option is selected/deselected
          onClick={(e) => {
            this.props.onClick(e, this.props.data, this.props.id);
          }} // changes the name of the pick in ExGroup's state.
        >
          <img src={this.props.data.image}></img>
          {this.props.data.label}
        </button>
      );
    }
    // For buttons with SVG images
    if (typeof this.props.data !== "string") {
      // Assume object like {label, image} and build an SVG button
      return (
        <button
          className={
            "exclusive-button " +
            (this.props.selected ? "selected " : " ") +
            this.context
          } // changes CSS and appearance when an option is selected/deselected
          onClick={(e) => {
            this.props.onClick(e, this.props.data, this.props.id);
          }} // changes the name of the pick in ExGroup's state.
        >
          <img src={this.props.data.image}></img>
          {this.props.data.label}
        </button>
      );
    }

    return (
      <button
        className={
          "exclusive-button " +
          (this.props.selected ? "selected " : " ") +
          this.context
        } // changes CSS and appearance when an option is selected/deselected
        onClick={(e) => {
          this.props.onClick(e, this.props.data, this.props.id);
        }} // changes the name of the pick in ExGroup's state.
      >
        {this.props.data}
      </button>
    );
  }
}

class ExclusiveGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: this.props.default ? this.props.default : "" };
    this.handleClick = this.handleClick.bind(this);
  }

  valid = null;
  invalidEntryMessage = "";

  //sets subservice state to selected during exclusivebutton componentDidMount lifecycle
  initiateSelected = () => {
    this.setState({
      selected: {
        label: JSON.parse(localStorage.getItem("fieldSelectorState"))
          .subService,
      },
    });
  };

  handleClick(event, data, id) {
    this.setState({ selected: data });
    if (typeof data === "string" && this.props.appendCategory) {
      console.log("the weird output", data);
      this.props.onChange(data);
      this.props.appendCategory(this.props.row, id);
    } else if (typeof data === "string") {
      this.props.onChange(data);
    } else if (this.props.appendCategory) {
      //if category selected is not a top level service
      if (
        data.label !== "Crisis Hotlines" &&
        data.label !== "Shelter" &&
        data.label !== "Basics" &&
        data.label !== "Seasonal"
      ) {
        //set subservice category in state to clicked button
        this.props.subServiceChange(data.label);
        this.props.appendCategory(this.props.row, id);
      } else {
        //set service category in state to clicked button
        this.props.onChange(data.label);
        this.props.appendCategory(this.props.row, id);
      }
    } else {
      //if category selected is not a top level service
      if (
        data.label !== "Crisis Hotlines" &&
        data.label !== "Shelter" &&
        data.label !== "Basics" &&
        data.label !== "Seasonal"
      ) {
        //set subservice category in state to clicked button
        this.props.subServiceChange(data.label);
      } else {
        //set service category in state to clicked button
        this.props.onChange(data.label);
      }
    }
  }

  validate() {
    if (!this.props.validator) return { valid: true, message: "" };

    let value = this.state.selected;
    let validEntryClass = "";
    let invalidEntryMessage = "";

    // Check if given value is valid
    let validityObject = this.props.validator(value);

    // Note the results for reference in the render
    this.valid = validityObject.valid;

    if (validityObject.valid === false)
      this.invalidEntryMessage = validityObject.message;

    if (validityObject.valid === true) this.invalidEntryMessage = "";
  }

  componentWillMount() {
    //if a fieldSelectorState object exists in localStorage
    if (JSON.parse(localStorage.getItem("fieldSelectorState"))) {
      //if props.row is 0 we are rendering top level service categories
      if (this.props.row === 0) {
        //set selected state value to === service localstorage value
        this.setState({
          selected: {
            label: JSON.parse(localStorage.getItem("fieldSelectorState"))
              .service,
          },
        });
      } else {
        //we are rendering gender categories
        //set selected state to === gender in localstorage
        this.setState({
          selected: JSON.parse(localStorage.getItem("fieldSelectorState"))
            .gender,
        });
      }
    }
  }

  render() {
    if (this.props.shouldValidate) this.validate();
    if (typeof this.props.appendCategory == "function") {
      return (
        <div className="exclusive-group-container">
          <div className="exclusive-group">
            {this.props.items.map((item, i) => {
              return (
                <ExclusiveButton
                  selected={
                    typeof item === "string"
                      ? item === this.state.selected
                      : item.label === this.state.selected.label
                  }
                  key={i}
                  data={item}
                  onClick={this.handleClick}
                  initiateSelected={this.initiateSelected}
                  appendCategory={this.props.appendCategory}
                  subServiceChange={this.props.subServiceChange}
                  id={i}
                  row={this.props.row}
                />
              );
            })}
          </div>

          <InvalidEntryMessage message={this.invalidEntryMessage} />
        </div>
      );
    }
    return (
      <div className="exclusive-group-container">
        <div className="exclusive-group">
          {this.props.items.map((item, i) => {
            return (
              <ExclusiveButton
                selected={
                  typeof item === "string"
                    ? item === this.state.selected
                    : item.label === this.state.selected.label
                }
                key={i}
                data={item}
                onClick={this.handleClick}
                id={i}
                initiateSelected={this.initiateSelected}
                onChange={this.props.onChange}
                subServiceChange={this.props.subServiceChange}
                subService={this.props.subService}
              />
            );
          })}
        </div>

        <InvalidEntryMessage message={this.invalidEntryMessage} />
      </div>
    );
  }
}

export default ExclusiveGroup;

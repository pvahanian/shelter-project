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
    //if there is no fieldselectorstate object in localstorage, bail out.
    if (!JSON.parse(localStorage.getItem("fieldSelectorState"))) return;
    //if data.label equals selectedServices.service2 or selectedServices.service3, call setSelected() with appropriate input
    //this will ensure styles are applied to the correct buttons when navigating backwards.
    if (
      this.props.data.label ===
      JSON.parse(localStorage.getItem("fieldSelectorState")).selectedServices
        .service2
    ) {
      this.props.setSelected(2);
    } else if (
      this.props.data.label ===
      JSON.parse(localStorage.getItem("fieldSelectorState")).selectedServices
        .service3
    ) {
      this.props.setSelected(3);
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

  //sets service2 or service3 selected state during exclusivebutton componentDidMount lifecycle
  setSelected = (serviceLevel) => {
    if (serviceLevel === 2) {
      this.setState({
        selected: {
          label: JSON.parse(localStorage.getItem("fieldSelectorState"))
            .selectedServices.service2,
        },
      });
    } else if (serviceLevel === 3) {
      this.setState({
        selected: {
          label: JSON.parse(localStorage.getItem("fieldSelectorState"))
            .selectedServices.service3,
        },
      });
    }
  };

  handleClick(event, data, id) {
    this.setState({ selected: data });
    //if button clicked was from gender field, handle it .
    if (typeof data === "string" && this.props.appendCategory) {
      this.props.handleServiceChange(data);
      this.props.appendCategory(this.props.row, id);
    } else if (typeof data === "string") {
      this.props.handleServiceChange(data);
      //otherwise, button clicked was from service categories
    } else if (this.props.appendCategory) {
      //if category selected is not a top level service
      if (
        !["Crisis Hotlines", "Shelter", "Basics", "Seasonal"].includes(
          data.label
        )
      ) {
        //make an array of all our service2 category names
        let arrayOfCategories = [];
        this.props.apiCategories.forEach((object) => {
          arrayOfCategories.push(object.category);
        });
        //if data.label is in the array, then set service2 to equal data.label, otherwise set it to service3
        arrayOfCategories.includes(data.label)
          ? this.props.setSelectedServices({
              ...this.props.selectedServices,
              service2: data.label,
            })
          : this.props.setSelectedServices({
              ...this.props.selectedServices,
              service3: data.label,
            });

        this.props.appendCategory(this.props.row, id);
      } else {
        //set service1 category in state to clicked button
        this.props.setSelectedServices({
          ...this.props.selectedServices,
          service1: data.label,
        });
        this.props.appendCategory(this.props.row, id);
      }
    } else {
      //if category selected is not a top level service
      if (
        !["Crisis Hotlines", "Shelter", "Basics", "Seasonal"].includes(
          data.label
        )
      ) {
        //make an array of all our service2 category names
        let arrayOfCategories = [];
        this.props.apiCategories.forEach((object) => {
          arrayOfCategories.push(object.category);
        });
        //if data.label is in the array, then set service2 to equal data.label, otherwise set it to service3
        arrayOfCategories.includes(data.label)
          ? this.props.setSelectedServices({
              ...this.props.selectedServices,
              service2: data.label,
            })
          : this.props.setSelectedServices({
              ...this.props.selectedServices,
              service3: data.label,
            });
      } else {
        //set service1 to data.label
        this.props.setSelectedServices({
          ...this.props.selectedServices,
          service1: data.label,
        });
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
        //set selected state value to === service1 in localstorage
        this.setState({
          selected: {
            label: JSON.parse(localStorage.getItem("fieldSelectorState"))
              .selectedServices.service1,
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
                  setSelected={this.setSelected}
                  onClick={this.handleClick}
                  setSelectedServices={this.props.setSelectedServices}
                  appendCategory={this.props.appendCategory}
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
                setSelected={this.setSelected}
                onChange={this.props.onChange}
                setSelectedServices={this.props.setSelectedServices}
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

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

  // componentWillMount() {
  //   // console.log("this is this", this)
  //   if(this.props.data.label === JSON.parse(localStorage.getItem("fieldSelectorState")).subService) {
  //     console.log("now what smart guy", this.props)
  //     console.log("now what smart guy", this.props.subService)
  //     this.props.subServiceChange(JSON.parse(localStorage.getItem("fieldSelectorState")).subService )

  //   }
  //   console.log("label",this.props.data.label)
  //   console.log("selected",this.props.selected)
  // }

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

  handleClick(event, data, id) {
    this.setState({ selected: data });
    if (typeof data === "string" && this.props.appendCategory) {
      this.props.onChange(data);
      this.props.appendCategory(this.props.row, id);
    } else if (typeof data === "string") {
      this.props.onChange(data);
    } else if (this.props.appendCategory) {
      this.props.onChange(data.label);
      this.props.appendCategory(this.props.row, id);
      // this.props.subServiceChange(data.label)
    } else {
      this.props.onChange(data.label);
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
    // console.log("heres the items", this.props.items);
    // console.log("heres the selected item", this.state.selected);
    // console.log(
    //   "heres the localstorage",
    //   typeof JSON.parse(localStorage.getItem("fieldSelectorState")).service
    // );
      if(JSON.parse(localStorage.getItem("fieldSelectorState"))) {
        if (this.props.row === 0) {
          this.setState({
            selected: {
              label: JSON.parse(localStorage.getItem("fieldSelectorState")).service,
            },
          });
        } else {
          this.setState({
            selected: JSON.parse(localStorage.getItem("fieldSelectorState")).gender,
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
              {
                /* console.log("items label bitches: ",item.label)
              if (
                item.label ===
                JSON.parse(localStorage.getItem("fieldSelectorState")).service
              ) {
                console.log("Ding Ding Ding");
              } */
              }
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

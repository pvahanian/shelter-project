import React from 'react';
import ExclusiveOption from "./ExclusiveOption";
import NumberInput from './NumberInput';
import '../Assets/FieldSelector.scss';
import { ThemeContext } from '../ThemeContext';

class FieldSelector extends React.Component {
  static contextType = ThemeContext;

  constructor(props) {
    super(props)

    this.state = {
      age: 25,
      zip: 97205
    }

    this.handleAgeChange = this.handleAgeChange.bind(this)
    this.handleZIPChange = this.handleZIPChange.bind(this)
  }

  handleAgeChange(e) {
    let age = e.currentTarget.value
    this.setState({ age: age })
  }

  handleZIPChange(e) {
    let zip = e.currentTarget.value
    this.setState({ zip: zip })
  }


  render() {
    return(
      <>
      <div className={'field-selector-' + this.context}>
        text
        <ExclusiveOption items={['Male', 'Female', 'Transgender Male', 'Transgender Female']}/>
        <NumberInput name='Age' onChange={this.handleAgeChange} />
        <NumberInput name='ZIP' onChange={this.handleZIPChange} />

        <a href={"google.com"}>Your location</a>

        <div className={"Services"}>
        </div>
      </div>
      </>
    );
  }
}

export default FieldSelector;

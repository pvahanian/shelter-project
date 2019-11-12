import React from 'react';
import ExclusiveOption from "./ExclusiveOption";
import TextInput from './TextInput';
import '../Assets/FieldSelector.scss';
import { ThemeContext } from '../ThemeContext';
import Section from './Section';

class FieldSelector extends React.Component {
  static contextType = ThemeContext;

  constructor(props) {
    super(props)

    this.state = {
      age: null,
      zip: null,
      county: null
    }

    this.handleAgeChange = this.handleAgeChange.bind(this)
    this.handleZIPChange = this.handleZIPChange.bind(this)
    this.handleCountyChange = this.handleCountyChange.bind(this)
    this.findLocation = this.findLocation.bind(this)
  }

  handleAgeChange(e) {
    let age = e.currentTarget.value

    this.setState({ age: age })
  }

  validAge() {
    let isPositiveInteger = str => /^(0|[1-9]\d*)$/.test(str);
    return isPositiveInteger(this.state.age)
  }

  handleZIPChange(e) {
    let zip = e.currentTarget.value
    this.setState({ zip: zip })
  }

  validZIP() {
    let isPositiveInteger = str => /^(0|[1-9]\d*)$/.test(str);
    return this.state.zip.length === 5 && isPositiveInteger(this.state.zip)
  }

  handleCountyChange(e) {
    let county = e.currentTarget.value
    this.setState({ county: county })
  }

  validCounty() {
    return (
      this.state.county.toLowerCase() === 'multnomah' ||
      this.state.county.toLowerCase() === 'clackamas'
    )
  }

  findLocation() {
    console.log("Then we'd try to find their location using a Google API. For now...")

    this.setState({
      zip: '97086',
      county: 'Clackamas'
    })
  }

  render() {
    return(
      <>
      <div className={'field-selector ' + this.context}>
        <ExclusiveOption items={['Male', 'Female', 'Transgender Male', 'Transgender Female']}/>

        <TextInput
          name='Age'
          value={this.state.age}
          placeholder='32'
          onChange={this.handleAgeChange}
          validEntry={this.state.age ? (this.validAge(this.state.age) ? true : false) : null }
        />

        <Section name='Location'>
          <TextInput
            name='County'
            value={this.state.county}
            placeholder='Multnomah'
            onChange={this.handleCountyChange}
            validEntry={this.state.county ? (this.validCounty(this.state.county) ? true : false) : null }
          />

          <TextInput
            name='ZIP'
            value={this.state.zip}
            placeholder='97205'
            onChange={this.handleZIPChange}
            validEntry={this.state.zip ? (this.validZIP(this.state.zip) ? true : false) : null }
          />

          <button
            id='your-location-button'
            onClick={this.findLocation}
          >
            Your location
          </button>
        </Section>

      </div>
      </>
    );
  }
}

export default FieldSelector;

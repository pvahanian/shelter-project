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
      age: 25,
      zip: 97205,
      county: 'Multnomah'
    }

    this.handleAgeChange = this.handleAgeChange.bind(this)
    this.handleZIPChange = this.handleZIPChange.bind(this)
    this.handleCountyChange = this.handleCountyChange.bind(this)
  }

  handleAgeChange(e) {
    let age = e.currentTarget.value
    this.setState({ age: age })
  }

  handleZIPChange(e) {
    let zip = e.currentTarget.value
    this.setState({ zip: zip })
  }

  handleCountyChange(e) {
    let county = e.currentTarget.value
    this.setState({ county: county })
  }

  render() {
    return(
      <>
      <div className={'field-selector ' + this.context}>
        <ExclusiveOption items={['Male', 'Female', 'Transgender Male', 'Transgender Female']}/>

        <TextInput name='Age' onChange={this.handleAgeChange} />

        <Section name='Location'>
          <TextInput
            name='County'
            value={this.state.county}
            onChange={this.handleCountyChange}
          />
          <TextInput
            name='ZIP'
            value={this.state.zip}
            onChange={this.handleZIPChange}
          />

          <button
            id='your-location-button'
            onClick={e => console.log("Then we'd try to find their location using a Google API.")}
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

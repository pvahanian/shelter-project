import React from 'react';
import ExclusiveOption from "./ExclusiveOption";
import NumberInput from './NumberInput';
import '../Assets/FieldSelector.scss';
import { ThemeContext } from '../ThemeContext';
import Section from './Section';

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
      <div className={'field-selector ' + this.context}>
        <ExclusiveOption items={['Male', 'Female', 'Transgender Male', 'Transgender Female']}/>

        <NumberInput name='Age' onChange={this.handleAgeChange} />

        <Section name='Location'>
          <NumberInput name='ZIP' onChange={this.handleZIPChange} />

          <input>
          </input>

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

import React from 'react';
import ExclusiveOption from "./ExclusiveOption";
import TextInput from './TextInput';
import '../Assets/FieldSelector.scss';
import { ThemeContext } from '../ThemeContext';
import Section from './Section';
import APIWrapper from "../APIWrapper.js";


const APIKey = process.env.REACT_APP_211_API_KEY
const API = new APIWrapper(APIKey)

class FieldSelector extends React.Component {
  static contextType = ThemeContext;

  async componentDidMount() {
    await API.initialize()
  }

  constructor(props) {
    super(props)

    this.state = {
      age: '',
      zip: '',
      county: ''
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
    let age = this.onlyNumbers(this.state.age)
    let isPositiveInteger = str => /^[1-9](0|[1-9]*)$/.test(str);
    return isPositiveInteger(age)
  }

  async handleZIPChange(e) {
    let zip = e.currentTarget.value
    await this.setState({ zip: zip })

    if(this.validZIP())
      await API.getCountyByZipCode({
        zip: this.state.zip
      })
      .then(data => this.setState(
        {county: data[0]['county']}
      ))
      .catch(err => {
        console.log(err)
      })
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

  onlyNumbers(str) {
    let characterArray = str.split('')
    let numberArray = characterArray.filter(character => '0123456789'.indexOf(character) !== -1)
    return numberArray.join('')
  }

  render() {
    return(
      <>
      <div className={'field-selector ' + this.context}>
        <ExclusiveOption items={['Male', 'Female', 'Transgender Male', 'Transgender Female']}/>

        <TextInput
          name='Age'
          value={this.state.age}
          filter={this.onlyNumbers}
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
            filter={this.onlyNumbers}
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

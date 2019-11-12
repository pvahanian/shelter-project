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
      county: '',
      doValidation: false
    }

    // Bind all functions which are called from child inputs
    this.handleAgeChange = this.handleAgeChange.bind(this)
    this.handleZIPChange = this.handleZIPChange.bind(this)
    this.handleCountyChange = this.handleCountyChange.bind(this)

    this.validAge = this.validAge.bind(this)
    this.validZIP = this.validZIP.bind(this)
    this.validCounty = this.validCounty.bind(this)

    this.findLocation = this.findLocation.bind(this)
    this.goBehavior = this.goBehavior.bind(this)
  }


  handleAgeChange = age => this.setState({ age: age })

  validAge(age) {
    let message = ''

    if(!age)
      return { valid: false, message: 'Required entry.'}

    // Using a regex here to recognize positive non-leading zero integers
    let isPositiveInteger = /^[1-9](0|[1-9]*)$/.test(age)
    if(!isPositiveInteger)
      message = 'Please enter a positive round number like 18 or 56.'

    // TODO: Maybe remove this case.
    let isReallyOld = parseInt(age) >= 120
    if(isReallyOld)
      message = "It's unlikely this age is correct. Is this a typo?"

    let valid = isPositiveInteger && !isReallyOld

    return {valid, message}
  }




  async handleZIPChange(zip) {
    await this.setState({ zip: zip })

    if(this.validZIP(zip).valid)
      await API.getCountyByZipCode({
        zip: this.state.zip
      })
      .then(data => this.setState(
        {county: data[0]['county']}
      ))
      .catch(err => {
        // TODO: we'll probably want to take action here to resolve the error
        console.log(err)
      })
  }

  validZIP(zip) {
    let message = ''

    if(!zip)
      return { valid: false, message: 'Required entry.'}

    let isPositiveInteger = /^(0|[1-9]\d*)$/.test(zip);
    if(!isPositiveInteger)
      message = 'Please only use numbers in the ZIP code.'

    // TODO: Verify this assumption. ZIPs can be very weird
    let correctLength = zip.length === 5;
    if(!correctLength)
      message = 'ZIP codes are usually 5 digits long. Is this mistyped?'

    let valid = correctLength && isPositiveInteger

    return {valid, message}
  }



  handleCountyChange = county => this.setState({ county: county })

  validCounty(county) {
    let message = ''

    if(!county)
      return { valid: false, message: 'Required entry.'}

    // TODO: Add better county validation & add suggested correct spellings of counties
    let knownCounty = (county.toLowerCase() === 'multnomah' || county.toLowerCase() === 'clackamas')
    if(!knownCounty)
      message = "We don't know this county. Is this mistyped?"

    let valid = knownCounty

    return {valid, message}
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

  // FOR DEBUGGING ONLY, DELETE!!!
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async goBehavior() {
    await this.setState({ doValidation: true })

    await this.sleep(2000)

    console.log({
      age: this.state.age,
      zip: this.state.zip,
      county: this.state.county
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
          filter={this.onlyNumbers}
          validator={this.validAge}
          placeholder='32'
          onChange={this.handleAgeChange}
          shouldValidate={this.state.doValidation}
        />

        <Section name='Location'>

          <TextInput
            name='ZIP'
            value={this.state.zip}
            filter={this.onlyNumbers}
            validator={this.validZIP}
            placeholder='97205'
            onChange={this.handleZIPChange}
            shouldValidate={this.state.doValidation}
          />

          <TextInput
            name='County'
            value={this.state.county}
            validator={this.validCounty}
            placeholder='Multnomah'
            onChange={this.handleCountyChange}
            shouldValidate={this.state.doValidation}
          />

          <button
            id='your-location-button'
            onClick={this.findLocation}
          >
            Your location
          </button>
        </Section>

        <button
          onClick={this.goBehavior}
        >
          Go
        </button>
      </div>
      </>
    );
  }
}

export default FieldSelector;

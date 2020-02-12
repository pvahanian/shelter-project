import React from 'react';
import ExclusiveOption from "./ExclusiveOption";
import TextInput from './TextInput';
import '../Assets/FieldSelector.scss';
import { ThemeContext } from '../ThemeContext';
import Section from './Section';
import APIWrapper from "../APIWrapper.js";
import InputLabel from './InputLabel';

require('dotenv').config();


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
      service: '',
      gender: '',
      age: '',
      latitude: '',
      longitude: '',
      zip: '',
      county: '',
      doValidation: false
    }

    // Bind all functions which are called from child inputs
    this.handleServiceChange = this.handleServiceChange.bind(this)
    this.handleGenderChange = this.handleGenderChange.bind(this)
    this.handleAgeChange = this.handleAgeChange.bind(this)
    this.handleZIPChange = this.handleZIPChange.bind(this)
    this.handleCountyChange = this.handleCountyChange.bind(this)

    this.validGender = this.validGender.bind(this)
    this.validAge = this.validAge.bind(this)
    this.validZIP = this.validZIP.bind(this)
    this.validCounty = this.validCounty.bind(this)

    this.findLocation = this.findLocation.bind(this)
    this.findCoordinates = this.findCoordinates.bind(this)
    this.reverseGeocodeCoordinates = this.reverseGeocodeCoordinates.bind(this)
    this.goBehavior = this.goBehavior.bind(this)
  }

  handleServiceChange = service => this.setState({ service: service })

  validGender(gender) {
    let message = ''

    let empty = gender === ''
    if(empty)
      message = 'Required entry.'

    let valid = !empty

    return {valid, message}
  }

  handleGenderChange = gender => this.setState({ gender: gender })

  handleAgeChange = age => this.setState({ age: age })

  validAge(age) {
    let message = ''

    if(!age)
      return { valid: false, message: 'Required entry.'}

    // Using a regex here to recognize positive non-leading zero integers
    let isPositiveInteger = /^[1-9]([0-9]*)$/.test(age)
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
    /*console.log("Then we'd try to find their location using a Google API. For now...")

    this.setState({
      zip: '97086',
      county: 'Clackamas'
    })
    */
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.findCoordinates, this.handleLocationError);
    } else {
      alert("Geolocation not supported by this browser.");
    }
  }

  findCoordinates(position) {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    this.reverseGeocodeCoordinates();
  }

  reverseGeocodeCoordinates() {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&sensor=false&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
    .then(response => response.json())
    //.then(data => console.log(data)) //log for testing, needs to be commented out for split and set state to work.
    .then(data => data.results[4].formatted_address.split(','))
    .then(data => this.setState({
      county: data[0],
      zip: data[1].match(/\d+/)[0]
    }))
    .catch(error => alert(error))
  }

  handleLocationError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.")
        break;
      default:
        alert("An unknown error occurred.")
    }
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
    // TODO: This is not the smart way to do validation once and stop
    await this.setState({ doValidation: true })
    await this.setState({ doValidation: false })

    // REMOVE! JUST FOR DEBUG PURPOSES
    await this.sleep(2000)
    console.log({
      service: this.state.service,
      gender: this.state.gender,
      age: this.state.age,
      zip: this.state.zip,
      county: this.state.county
    })
  }

  render() {
    const svgPathEndings = this.context === 'light' ? '-black.svg' : '-white.svg'

    return(
      <div className={'field-selector ' + this.context}>
        <InputLabel label='Service'>
          <ExclusiveOption
            items={[
              {
                label: 'doggie',
                image: '../dog' + svgPathEndings
              },
              {
                label: 'kitty',
                image: '../cat' + svgPathEndings
              }
            ]}
            onChange={this.handleServiceChange}
          />
        </InputLabel>

        <InputLabel label='Gender'>
          <ExclusiveOption
            items={['Male', 'Female', 'Trans Male', 'Trans Female']}
            validator={this.validGender}
            shouldValidate={this.state.doValidation}
            onChange={this.handleGenderChange}
          />
        </InputLabel>

        <InputLabel label='Age'>
          <TextInput
            name='Age'
            value={this.state.age}
            filter={this.onlyNumbers}
            validator={this.validAge}
            placeholder='32'
            onChange={this.handleAgeChange}
            shouldValidate={this.state.doValidation}
          />
        </InputLabel>

        <div id='zip-and-county'>
          <InputLabel label='ZIP'>
            <TextInput
              name='ZIP'
              value={this.state.zip}
              filter={this.onlyNumbers}
              validator={this.validZIP}
              placeholder='97205'
              onChange={this.handleZIPChange}
              shouldValidate={this.state.doValidation}
            />
          </InputLabel>

          <InputLabel label='County'>
            <TextInput
              name='County'
              value={this.state.county}
              validator={this.validCounty}
              placeholder='Multnomah'
              onChange={this.handleCountyChange}
              shouldValidate={this.state.doValidation}
            />
          </InputLabel>
        </div>

        <button
          id='your-location-button'
          onClick={this.findLocation}
        >
          Your location
        </button>

        <button
          onClick={this.goBehavior}
        >
          Go
        </button>
      </div>
    );
  }
}

export default FieldSelector;

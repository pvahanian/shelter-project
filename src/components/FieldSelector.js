//changed lines so far 44, 182, 250
import React from 'react';
import ExclusiveOption from "./ExclusiveOption";
import TextInput from './TextInput';
import '../Assets/FieldSelector.scss';
import { ThemeContext } from '../ThemeContext';
import Section from './Section';
import APIWrapper from "../APIWrapper.js";
import InputLabel from './InputLabel';
import SubmitButton from './SubmitButton/SubmitButton.js'
import CountySelect from './CountySelect'
const CensusAPIKey = process.env.REACT_APP_CENSUS_API_KEY
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
      zip: '',
      doValidation: false,
      validCounty: 'null',
      possibleCounties: '',
      county: '',
      familySize: ''
    }

    // Bind all functions which are called from child inputs
    this.handleServiceChange = this.handleServiceChange.bind(this)
    this.handleGenderChange = this.handleGenderChange.bind(this)
    this.handleAgeChange = this.handleAgeChange.bind(this)
    this.handleZIPChange = this.handleZIPChange.bind(this)
    this.handleCountyChange = this.handleCountyChange.bind(this)
    this.handleFamilySizeChange = this.handleFamilySizeChange.bind(this)

    this.validGender = this.validGender.bind(this)
    this.validAge = this.validAge.bind(this)
    this.validZIP = this.validZIP.bind(this)
    this.validCounty = this.validCounty.bind(this)
    this.validFamilySize = this.validFamilySize.bind(this)
    this.findLocation = this.findLocation.bind(this)
    this.goBehavior = this.goBehavior.bind(this)
    this.isPageDataValid = this.isPageDataValid.bind(this)
  }

  handleServiceChange = service => this.setState({ service: service })

  handleFamilySizeChange = familysize => this.setState({familySize: familysize})

  handleGenderChange = gender => this.setState({ gender: gender })

  handleAgeChange = age => this.setState({ age: age })

  validFamilySize(familySize) {
    let message = ''
    let empty = familySize === ''

    if(empty)
      return { valid: false, message: 'Required entry.'}

    let valid = familySize >= 0 && familySize <= 16
    if(!valid)
      message = 'You don have that many chilren!'

    return {valid, message}
  }

  validGender(gender) {
    let message = ''

    let empty = gender === ''
    if(empty)
      message = 'Required entry.'

    let valid = !empty

    return {valid, message}
  }

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
    this.getAllPossibleCountiesByZip(zip);
  }

  async getAllPossibleCountiesByZip(zip) {
    await this.setState({zip : zip})
    if(this.validZIP(zip).valid){
      await API.getCountyByZipCode({
        zip: this.state.zip
      }).then(data => {
        this.setState({ possibleCounties: Object.values(data).map(value => { return value['county']})});
      })
    }

    if(this.state.zip.length < 6){
      this.state.possibleCounties = '';
    }
  }

  validZIP(zip) {
    let message = ''

    if(!zip)
      return { valid: false, message: 'Required entry.'}

    let isPositiveInteger = /^([0-9]\d*)$/.test(zip);
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


  validCounty = (county) => {
    let valid = null;
    let message = '';
    if(!county) {
      return { valid: false, message: 'Required entry.'};
    } else if (this.state.validCounty) {
      return {valid: true, message};
    } else if (!this.state.validCounty) {
      return {valid: false, message: "This is not an OR or WA county."};
    }
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

  async countyAPICall() {
    await fetch(
      /*https://cors-anywhere.herokuapp.com/ need to be removed for production. For testing purposes in localhost
      this proxy prevents cors errors from being thrown by chrome. When the project is hosted somewhere, these errors
      won't be an issue.*/
     `https://cors-anywhere.herokuapp.com/https://api.census.gov/data/timeseries/poverty/saipe?get=NAME&for=county:*&in=state:41,53&time=2018&key=${CensusAPIKey}`, {
   crossDomain: true,
   method: 'GET',
   headers: {'Content-Type': 'application/json'},
   })
   .then(result => {
     return result.json();
   }).then(data => {
     const countiesORWA = [];
     data.forEach(el => countiesORWA.push(el[0]
       .toLowerCase()
       .split('')
       .reverse()
       .slice(7)
       .reverse()
       .join('')));
     countiesORWA.shift();
     if (countiesORWA.includes(this.state.county.toLowerCase())){
       this.setState({validCounty: true})
     } else {
       this.setState({validCounty: false})
     }
   })
   //Hardcoding here is a backup list of all counties serviced in case api fails.
   .catch(err =>{
    const countiesORWA = ["baker", "benton", "clackamas", "clatsop", "columbia", "coos", "crook", "curry", "deschutes", "douglas", "gilliam", "grant", "harney", "hood river", "jackson", "jefferson", "josephine", "klamath", "lake", "lane", "lincoln", "linn", "malheur", "marion", "morrow", "multnomah", "polk", "sherman", "tillamook", "umatilla", "union", "wallowa", "wasco", "washington", "wheeler", "yamhill", "clark", "cowlitz", "skamania", "wahkiakum"]
    if (countiesORWA.includes(this.state.county.toLowerCase())){
      this.setState({validCounty: true})
    } else {
      this.setState({validCounty: false})
    }
   })
  }

  async goBehavior() {
    await this.countyAPICall();
    await this.setState({ doValidation: true })
    await this.setState({ doValidation: false })

    // REMOVE! JUST FOR DEBUG PURPOSES
    await this.sleep(2000)
    console.log({
      service: this.state.service,
      gender: this.state.gender,
      age: this.state.age,
      zip: this.state.zip,
      county: this.state.county,
      familySize: this.state.familySize,
    })
  }

  isPageDataValid(){
    return this.validCounty(this.state.county).valid &&  this.validGender(this.state.gender).valid
    && this.validAge(this.state.age).valid && this.validZIP(this.state.zip).valid
    && this.validFamilySize(this.state.familySize).valid
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
              placeholder='97333'
              onChange={this.handleZIPChange}
              shouldValidate={this.state.doValidation}
            />
          </InputLabel>


          {
            this.state.possibleCounties ?
              <InputLabel label = 'County'>
                <CountySelect
                  name = 'County'
                  value={this.state.county}
                  validator={this.validCounty}
                  onChange={this.handleCountyChange}
                  shouldValidate={this.state.doValidation}
                  counties = {this.state.possibleCounties}
                  >
                </CountySelect>
              </InputLabel>
            :
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
          }


          <InputLabel label ='Family Size'>
            <TextInput
              name='famliysize'
              value ={this.state.familySize}
              validator ={this.validFamilySize}
              placeholder='How many people are in your family?'
              onChange={this.handleFamilySizeChange}
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

        <SubmitButton goBehavior={this.goBehavior} changeAPIData={this.props.changeAPIData} isPageDataValid={this.isPageDataValid}
          fieldSelectorState={this.state}
        />
      </div>
    );
  }
}

export default FieldSelector;

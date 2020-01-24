import React from 'react';
import {ThemeContext} from '../ThemeContext';
import '../Assets/CountySelect.scss';

class CountySelect extends React.Component {
  constructor(props) {
    super(props)
  }

  static contextType = ThemeContext
  valid = null

  render () {
    let value = this.props.value

    return (

      <select
      value = {value}
      id= {this.props.name.toLowerCase()+'input'}
      className= {'text-input' + this.context + ' county-select'}
      onChange= {e => {
          let newValue = e.currentTarget.value
          if(this.props.filter)
            newValue = this.props.filter(newValue)
          this.props.onChange(newValue)
        }
      }
      counties = {this.props.counties}
      >
        <option value = '' disabled>Choose your county:</option>
        {this.props.counties.map((county,index) => {
          return (
            <option key = {index} value = {county}>{county}</option>
          )
        })}
      </select>
    )
  }
}

export default CountySelect;

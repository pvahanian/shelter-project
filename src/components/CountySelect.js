import React, {useContext} from 'react';
import {ThemeContext} from '../ThemeContext';
import FieldSelectorContext from './context/fieldSelectorContext/FieldSelectorContext'
import '../Assets/CountySelect.scss';


const CountySelect = (props) =>  {


  const fieldSelectorContext = useContext(FieldSelectorContext) 
  const contextType = useContext(ThemeContext)
  let valid = null

    let value = fieldSelectorContext.county

    console.log('countySelect Trigger', value)
    
    return (

      <select
        value = {value}
        id= {props.name.toLowerCase()+'input'}
        className= {'text-input' + contextType + ' county-select'}
        onChange= {e => {
            let newValue = e.currentTarget.value
            if(props.filter)
              newValue = props.filter(newValue)
            fieldSelectorContext.setCounty(newValue)
          }
        }
       counties = {fieldSelectorContext.counties}
      >
        <option value = '' disabled>Choose your county:</option>
        {/* {props.counties.map((county,index) => { */}
        {fieldSelectorContext.possibleCounties.map((county,index) => {
          return (
            <option key = {index} value = {county}>{county}</option>
          )
        })}
      </select>
    )
  
}

export default CountySelect;

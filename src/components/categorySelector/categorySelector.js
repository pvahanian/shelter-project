import React from 'react';
import ExclusiveOption from "../ExclusiveOption";
import { ThemeContext } from '../../ThemeContext';


class CategorySelector extends React.Component{
  static contextType = ThemeContext;

  constructor(props){
    super(props)


    this.state = {
      categories: [],
      keys: []
    }
    //look for categorySelector in localStorage. if its there, use it to determine which buttons should be styled when navigating backwards.
    // BUG categorySelectorState not in localstorage after user goes back and forward multiple times.......
    if(JSON.parse(localStorage.getItem('categorySelectorState'))) {
      this.state = {
        categories: JSON.parse(localStorage.getItem('categorySelectorState')).categories,
        keys: JSON.parse(localStorage.getItem('categorySelectorState')).keys
      }
      localStorage.removeItem('categorySelectorState')
    } else {
      this.state = {
        categories: [],
        keys: []
      }
    }
    this.appendCategory = this.appendCategory.bind(this)
    this.createLabelWithImage = this.createLabelWithImage.bind(this)
    this.setKey = this.setKey.bind(this)
    this.state.categories[0] = this.createLabelWithImage(this.props.apiCategories, 'category')
  }

  setKey(keyValue){
    this.state.keys.push(keyValue)
  }
   //categoryType needs to be 'category' or 'subcategory'
   createLabelWithImage(array, categoryType){
    const svgPathEndings = this.context === 'light' ? '-black.svg' : '-white.svg';
    let objArray = [];
      for(const item of array){
        let obj = {};
        obj['label'] = item[categoryType];
        obj['image'] = '../dog' + svgPathEndings;
        objArray.push(obj)
      }
    return objArray
  }

  appendCategory(row, id){
    let newCategory = this.state.categories.slice();
    console.log(row)
    //remove subCategories and keys if user clicks at a higher level of the tree
    for(let i = row; i < this.state.categories.length - 1; i++){
      newCategory.pop()
      this.state.keys.pop()
    }

    //keep options from growing
    if(row >= 2){
      localStorage.setItem('categorySelectorState', JSON.stringify(this.state))
      this.props.handleCatIDChange('')
      this.props.handleCategorySelected(3)
      return
    }

    //Category has been selected. Show subcategory
    if(row === 0){
      newCategory[row + 1] = this.createLabelWithImage(this.props.apiCategories[id]['subcat'], 'subcategory')
      this.setState({categories:newCategory})
      this.props.handleCatIDChange(this.props.apiCategories[id]['categoryID'])
      this.setKey(id)
      localStorage.setItem('categorySelectorState', JSON.stringify(this.state))
      this.props.handleCategorySelected(1)
      console.log(this.props.catID)
    }
    //subcategory has been selectd. Show subbestCategory.
    else{
      try{
        newCategory[row + 1] = this.createLabelWithImage(this.props.apiCategories[this.state.keys[0]]['subcat'][id]['subcatterm'], 'sterm')
        this.setState({categories:newCategory})
        this.props.handleCatIDChange(this.props.apiCategories[this.state.keys[0]]['subcat'][id]['subcategoryID'])
        this.setKey(id)
        localStorage.setItem('categorySelectorState', JSON.stringify(this.state))
        this.props.handleCategorySelected(2)
        console.log(this.props.catID)
        //this.props.handleButtonStateChange({...this.props.buttonState, subCat:[{...this.props.buttonState.subCat[0], subCatTerm: [{sterm: null}]}] })
        //console.log(this.props.buttonState)
      }
      catch(error){
        console.log(this.props.apiCategories[id]['subcat'] + "does not have subCategories" + error)
      }
    }

  }


  render(){
    // console.log(this.state)
    return(
      this.state.categories.map((categories, i) =>
        <ExclusiveOption
          buttonState={this.props.buttonState}
          handleButtonStateChange={this.props.handleButtonStateChange}
          items = {categories}
          onChange={this.props.onChange}
          appendCategory = {this.appendCategory}
          key = {i}
          row ={i}
        />
    ))
  }
}


export default CategorySelector;

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
    console.log(row)
    console.log(id)
    let newCategory = this.state.categories.slice();

    //remove subCategories if user clicks at a higher level of the tree
    for(let i = row; i < this.state.categories.length - 1; i++){
      newCategory.pop()
      this.state.keys.pop()
    }

    //keep options from growing
    if(row >= 2){
      this.props.handleCatIDChange(this.props.apiCategories[this.state.keys[0]][this.state.keys[1]]['subcategoryID'])
      return
    }

    //Category has been selected. Show subcategory
    if(row === 0){
      newCategory[row + 1] = this.createLabelWithImage(this.props.apiCategories[id]['subcat'], 'subcategory')
      this.setState({categories:newCategory})
      this.props.handleCatIDChange(this.props.apiCategories[id]['categoryID'])
      this.setKey(id)
    }
    //subcategory has been selectd. Show subbestCategory.
    else{
      try{
        newCategory[row + 1] = this.createLabelWithImage(this.props.apiCategories[this.state.keys[0]]['subcat'][id]['subcatterm'], 'sterm')
        this.setState({categories:newCategory})
        this.props.handleCatIDChange(this.props.apiCategories[this.state.keys[0]]['subcat'][id]['subcategoryID'])
        this.setKey(id)
      }
      catch(error){
        console.log(this.props.apiCategories[id]['subcat'] + "does not have subCategories" + error)
      }
    }

  }

  render(){
    console.log(this.state)
    return(
      this.state.categories.map((categories, i) =>
        <ExclusiveOption
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

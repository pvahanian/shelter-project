import React from 'react';
import ExclusiveOption from "../ExclusiveOption";
import { ThemeContext } from '../../ThemeContext';


class CategorySelector extends React.Component{
  static contextType = ThemeContext;

  componentDidMount(){
    /*let newCategory = []
    newCategory[0] = this.createLabelWithImage(this.props.apiCategories, 'category')
    this.setState({categories: newCategory})
    console.log(this.props.apiCategories)
    console.log(newCategory)
    console.log(this.state)*/
  }
  constructor(props){
    super(props)
    this.state = {
    categories: []
    }
    this.state.categories[0] = this.createLabelWithImage(this.props.apiCategories, 'category')
    this.appendCategory = this.appendCategory.bind(this)
    this.createLabelWithImage = this.createLabelWithImage.bind(this)
    console.log(this.state)
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
    //Remove buttons if user selects previous options
    if(this.state.categories.length > row + 1){
      for(let i = 0; i < this.state.categories.length - row - 2 ; i++){
        newCategory.pop()
      }
    }
    //if first for map to category
    if (row == 0) {
      newCategory[row + 1] = this.createLabelWithImage(this.props.apiCategories, 'category')
      this.setState({categories:newCategory})
      return
    }
    //to stop buttons from growing
    if(row >= 2){
      return
    }
    //else map to subCategory
    else{
      newCategory[row + 1] = this.createLabelWithImage(this.props.apiCategories[id]['subcat'], 'subcategory')
      this.setState({categories:newCategory})
      this.props.handleCatIDChange(this.props.apiCategories[id]['categoryID'])
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

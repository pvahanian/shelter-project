import React from 'react';
import ExclusiveOption from "../ExclusiveOption";
import { ThemeContext } from '../../ThemeContext';


class CategorySelector extends React.Component{
  static contextType = ThemeContext;

  componentWillMount(){
    const svgPathEndings = this.context === 'light' ? '-black.svg' : '-white.svg';
    let newCategory = this.state.category.slice();
    newCategory[0] = [
    {label: 'Crisis Hotlines',
    image: '../dog' + svgPathEndings},
    {label: 'Basics',
    image: '../dog' + svgPathEndings},
    {label: 'Shelter',
    image: '../dog' + svgPathEndings},
    {label: 'Seasonal',
    image: '../dog' + svgPathEndings}]
    this.setState({category: newCategory})
  }
  constructor(props){
    super(props)
    this.state = {
    category: []
    }
    this.appendCategory = this.appendCategory.bind(this)

  }

   async appendCategory(row, id){
    let newCategory = this.state.category.slice();
    console.log('appendCategory')
    //Remove buttons if user selects previous options
    if(this.state.category.length > row + 1){
      for(let i = 0; i < this.state.category.length - row - 2 ; i++){
        newCategory.pop()
      }
    }
    if (row == 0) {
      newCategory[row + 1] = await this.props.apiCategories.map((category) =>
        category['category'],
      )
      this.setState({category:newCategory})
      return
    }
    if(row >= 2){
      return
    }
    else{
      newCategory[row + 1] = await this.props.apiCategories[id]['subcat'].map((subcat) =>
        subcat['subcategory']
      )
      this.setState({category:newCategory})
      this.props.handleCatIDChange(this.props.apiCategories[id]['categoryID'])
    }

    }

  render(){
    return(
      this.state.category.map((category, i) =>
        <ExclusiveOption
          items = {category}
          onChange={this.props.onChange}
          appendCategory = {this.appendCategory}
          key = {i}
          row ={i}
        />
    ))
  }
}


export default CategorySelector;

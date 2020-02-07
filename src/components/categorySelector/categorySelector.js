import React from 'react';
import ExclusiveOption from "../ExclusiveOption";


class CategorySelector extends React.Component{
   constructor(props){
    super(props)
    this.state = {
      category: [['Crisis Hotlines', 'Basics', 'Shelter', 'Seasonal']],
      count : 0
    }
    this.increment = this.increment.bind(this)
    this.appendCategory = this.appendCategory.bind(this)
    console.log('category constructor')
  }

   async appendCategory(row, id){
    let newCategory = this.state.category.slice();
    let categories = []

    if (row == 0) {
      newCategory[row + 1] = await this.props.apiCategories.map((category) =>
        category['category']
      )
      this.setState({category:newCategory})
      console.log('pushed')
      return
    }
    if(this.state.category.length > row + 1){
      newCategory[row + 1] = await this.props.apiCategories[id]['subcat'].map((subcat) =>
        subcat['subcategory']
      )
      console.log(this.props.apiCategories)

      for(let i = 0; i < this.state.category.length - row - 2 ; i++){
        newCategory.pop()
      }
      this.setState({category:newCategory})
      console.log('greater')
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
      console.log('pushed')
    }

    }



  increment(){
    let i = this.state.count;
    this.setState({count: i+ 1})
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

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
    console.log(JSON.parse(localStorage.getItem("categorySelector")))
    // console.log(JSON.parse(localStorage.getItem('categorySelector')).categories)
    // // if(!JSON.parse(localStorage.getItem("categorySelector"))) return;
    // if(JSON.parse(localStorage.getItem("categorySelector")).categories) {
    //   this.state = {
    //     categories: JSON.parse(localStorage.getItem("categorySelector")).categories,
    //     keys: []
    //   }
    // } else {
    //   this.state = {
    //     categories: [],
    //     keys: []
    //   }
    // }
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
    // console.log('row',row)
    // console.log('id', id)
    let newCategory = this.state.categories.slice();

    //remove subCategories and keys if user clicks at a higher level of the tree
    for(let i = row; i < this.state.categories.length - 1; i++){
      newCategory.pop()
      this.state.keys.pop()
    }

    //keep options from growing
    if(row >= 2){
      //MARK ----------- Here is where you would set the service3
      localStorage.setItem('categorySelector', JSON.stringify(this.state.categories))

      return
    }

    //Category has been selected. Show subcategory
    if(row === 0){
      newCategory[row + 1] = this.createLabelWithImage(this.props.apiCategories[id]['subcat'], 'subcategory')
      this.setState({categories:newCategory})/////////////////
      this.props.handleCatIDChange(this.props.apiCategories[id]['categoryID'])
      //MARK ----------- Here is where you would set the service1
      this.setKey(id)
      localStorage.setItem('categorySelector', JSON.stringify(this.state.categories))
    }
    //subcategory has been selectd. Show subbestCategory.
    else{
      try{
        newCategory[row + 1] = this.createLabelWithImage(this.props.apiCategories[this.state.keys[0]]['subcat'][id]['subcatterm'], 'sterm')
        this.setState({categories:newCategory})
        this.props.handleCatIDChange(this.props.apiCategories[this.state.keys[0]]['subcat'][id]['subcategoryID'])
        //MARK ----------- Here is where you would set the service2
        this.setKey(id)
        localStorage.setItem('categorySelector', JSON.stringify(this.state.categories))
      }
      catch(error){
        console.log(this.props.apiCategories[id]['subcat'] + "does not have subCategories" + error)
      }
    }

  }

  componentWillMount() {
    //look for fieldSelectorState in localStorage. if its there, use it to determine which buttons should be styled when navigating backwards. 
    if(!JSON.parse(localStorage.getItem("categorySelector"))) return;
    if(JSON.parse(localStorage.getItem("categorySelector"))) {
      this.setState({categories: JSON.parse(localStorage.getItem("categorySelector"))})
    }
  }
  render(){
    console.log(this.state)
    return(
      this.state.categories.map((categories, i) =>
        <ExclusiveOption
          buttonState={this.props.buttonState}
          handleButtonStateChange={this.props.handleButtonStateChange}/////////////////////////////////////////
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

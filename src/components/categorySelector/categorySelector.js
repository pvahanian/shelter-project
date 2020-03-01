import React from 'react';
import ExclusiveOption from "../ExclusiveOption";
import { ThemeContext } from '../../ThemeContext';


class CategorySelector extends React.Component{
  static contextType = ThemeContext;

  async componentDidMount(){
    const svgPathEndings = this.context === 'light' ? '-black.svg' : '-white.svg';
    /*let newCategory = this.state.category.slice();
    newCategory[0] = [

    ]
    console.log(this.state.apiCategories)*/
    this.loadData()
  }
  constructor(props){
    super(props)
    this.state = {
    categories: [],
    showItems: 4,
    parentID: 0
    }
    this.appendCategory = this.appendCategory.bind(this)
    this.createLabelWithImage = this.createLabelWithImage.bind(this)
    this.setParentID = this.setParentID.bind(this)
    this.handleShowMore = this.handleShowMore.bind(this)
    this.handleShowLess = this.handleShowLess.bind(this)

  }

  setParentID = id => this.setState({parentID: id})
  //categoryType needs to be 'category' or 'subcategory'
  loadData(){
    let categorySlice = []
    categorySlice[0] = this.props.apiCategories.slice(0, this.state.showItems)
    this.setState({
      categories: this.createLabelWithImage(categorySlice[0], 'category')
    })
  }
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

  async handleShowMore(){
    console.log('showmore')
    await this.setState({
      showItems:
        this.state.showItems >= this.state.category ?
          this.state.showItems : this.state.showItems + 4
    })
    this.loadData()
  }

  async handleShowLess(){
    console.log('showmore')
    if(this.state.showItems != 4){
      await this.setState({
        showItems:
          this.state.showItems >= this.state.category ?
            this.state.showItems : this.state.showItems - 4
      })
        this.loadData()
    }
  }

  async appendCategory(row, id){
  let newCategory = this.state.category.slice();
  //Remove buttons if user selects previous options
  if(this.state.category.length > row + 1){
    for(let i = 0; i < this.state.category.length - row - 2 ; i++){
      newCategory.pop()
    }
  }
  //if first for map to category
  if (row == 0) {
    newCategory[row + 1] = this.createLabelWithImage(this.props.apiCategories, 'category')
    this.setState({category:newCategory})
    return
  }
  //to stop buttons from growing
  if(row == 2){
    this.props.handleCatIDChange(this.props.apiCategories[this.state.parentID]['subcat'][id]['subcategoryID'])

    console.log(this.props.apiCategories[this.state.parentID]['subcat'][id])
    return
  }
  //else map to subCategory
  else{
    newCategory[row + 1] = this.createLabelWithImage(this.props.apiCategories[id]['subcat'], 'subcategory')
    this.setState({category:newCategory})
    this.setParentID(id)
    this.props.handleCatIDChange(this.props.apiCategories[id]['categoryID'])
  }

  }

  render(){
    if(this.state.categories == 0){
      console.log("null category")
      return <div/>
    }
    return(
      <div className = 'category-selector-container'>
        <div className= 'category-exclusive-option'>
        {
          <ExclusiveOption
            items = {this.state.categories}
            onChange={this.props.onChange}
            appendCategory = {this.appendCategory}
          />
        }
        </div>
        <button onClick={this.handleShowMore}>More</button>
        <button onClick={this.handleShowLess}>Less</button>//need to hide this until needed
      </div>);

  }
}


export default CategorySelector;

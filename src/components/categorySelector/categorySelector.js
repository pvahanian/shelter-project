import React from "react";
import ExclusiveOption from "../ExclusiveOption";
import { ThemeContext } from "../../ThemeContext";

class CategorySelector extends React.Component {
  static contextType = ThemeContext;

  constructor(props) {
    super(props);
    this.state = {
      category: [],
    };
    this.appendCategory = this.appendCategory.bind(this);
    this.createLabelWithImage = this.createLabelWithImage.bind(this);
  }

  componentWillMount() {
    const svgPathEndings =
      this.context === "light" ? "-black.svg" : "-white.svg";
    let newCategory = this.state.category.slice();
    newCategory[0] = [
      { label: "Crisis Hotlines", image: "../dog" + svgPathEndings },
      { label: "Basics", image: "../dog" + svgPathEndings },
      { label: "Shelter", image: "../dog" + svgPathEndings },
      { label: "Seasonal", image: "../dog" + svgPathEndings },
    ];
    this.setState({ category: newCategory });
  }

  //categoryType needs to be 'category' or 'subcategory'
  createLabelWithImage(array, categoryType) {
    const svgPathEndings =
      this.context === "light" ? "-black.svg" : "-white.svg";
    let objArray = [];
    for (const item of array) {
      let obj = {};
      obj["label"] = item[categoryType];
      obj["image"] = "../dog" + svgPathEndings;
      objArray.push(obj);
    }
    return objArray;
  }

  async appendCategory(row, id) {
    let newCategory = this.state.category.slice();
    //Remove buttons if user selects previous options
    if (this.state.category.length > row + 1) {
      for (let i = 0; i < this.state.category.length - row - 2; i++) {
        newCategory.pop();
      }
    }
    //if first for map to category
    if (row == 0) {
      newCategory[row + 1] = this.createLabelWithImage(
        this.props.apiCategories,
        "category"
      );
      this.setState({ category: newCategory });
      return;
    }
    //to stop buttons from growing
    if (row >= 2) {
      return;
    }
    //else map to subCategory
    else {
      newCategory[row + 1] = this.createLabelWithImage(
        this.props.apiCategories[id]["subcat"],
        "subcategory"
      );
      this.setState({ category: newCategory });
      this.props.handleCatIDChange(this.props.apiCategories[id]["categoryID"]);
    }
  }
  render() {
    
    return this.state.category.map((category, i) => (
      <ExclusiveOption
        items={category}
        setSelectedServices={this.props.setSelectedServices}
        selectedServices={this.props.selectedServices}
        apiCategories={this.props.apiCategories}
        appendCategory={this.appendCategory}
        key={i}
        row={i}
      />
    ));
  }
}

export default CategorySelector;

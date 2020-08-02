/** @format */

// /** @format */

// import React from 'react';
// import ExclusiveOption from '../ExclusiveOption';
// import { ThemeContext } from '../../ThemeContext';

// class CategorySelector extends React.Component {
// 	static contextType = ThemeContext;

// 	constructor(props) {
// 		super(props);

// 		//move

// 		// console.log('categorySelector props: ', props)
// 		//look for categorySelector in localStorage. if its there, use it to determine which buttons should be styled when navigating backwards.
// 		// BUG categorySelectorState not in localstorage after user goes back and forward multiple times.......
// 		if (JSON.parse(localStorage.getItem('categorySelectorState'))) {
// 			this.state = {
// 				categories: JSON.parse(localStorage.getItem('categorySelectorState'))
// 					.categories,
// 				keys: JSON.parse(localStorage.getItem('categorySelectorState')).keys,
// 			};
// 			// localStorage.removeItem('categorySelectorState');// TODO why were we removing categorySelectorState here? commenting this out solved the button expansion problem
// 		} else {
// 			this.state = {
// 				categories: [],
// 				keys: [],
// 			};
// 		}
// 		this.appendCategory = this.appendCategory.bind(this);
// 		this.createLabelWithImage = this.createLabelWithImage.bind(this);
// 		this.setKey = this.setKey.bind(this);

// 		this.state.categories[0] = this.createLabelWithImage(
// 			this.props.apiCategories,
// 			'category'
// 		);
// 	}

// 	setKey(keyValue) {
// 		this.state.keys.push(keyValue);
// 	}

// 	//categoryType needs to be 'category' or 'subcategory'
// 	createLabelWithImage(array, categoryType) {
// 		const svgPathEndings =
// 			this.context === 'light' ? '-black.svg' : '-white.svg';
// 		let objArray = [];
// 		// console.log(array);
// 		for (const item of array) {
// 			let obj = {};
// 			obj['label'] = item[categoryType];
// 			obj['image'] = '../dog' + svgPathEndings;
// 			objArray.push(obj);
// 		}
// 		return objArray;
// 	}

// 	appendCategory(row, id) {
// 		let newCategory = this.state.categories.slice();
// 		// console.log('this is the button row: ', row)
// 		// console.log('this is the button id: ', id)
// 		//remove subCategories and keys if user clicks at a higher level of the tree
// 		for (let i = row; i < this.state.categories.length - 1; i++) {
// 			newCategory.pop();
// 			this.state.keys.pop();
// 		}

// 		//keep options from growing
// 		if (row >= 2) {
// 			localStorage.setItem('categorySelectorState', JSON.stringify(this.state));
// 			this.props.handleCatIDChange('');
// 			this.props.handleCategorySelected(3);
// 			return;
// 		}

// 		//Category has been selected. Show subcategory
// 		if (row === 0) {
// 			newCategory[row + 1] = this.createLabelWithImage(
// 				this.props.apiCategories[id]['subcat'],
// 				'subcategory'
// 			);
// 			this.setState({ categories: newCategory });
// 			this.props.handleCatIDChange(this.props.apiCategories[id]['categoryID']);
// 			this.setKey(id);
// 			this.props.handleCategorySelected(1);
// 			localStorage.setItem('categorySelectorState', JSON.stringify(this.state));
// 			// console.log('here is the categoryID from props in categorySelector: ', this.props.catID)
// 		}
// 		//subcategory has been selectd. Show subbestCategory.
// 		else {
// 			try {
// 				newCategory[row + 1] = this.createLabelWithImage(
// 					this.props.apiCategories[this.state.keys[0]]['subcat'][id][
// 						'subcatterm'
// 					],
// 					'sterm'
// 				);
// 				this.setState({ categories: newCategory });
// 				console.log(
// 					'this is the subcategory id: ',
// 					this.props.apiCategories[this.state.keys[0]]['subcat'][id][
// 						'subcategoryID'
// 					]
// 				);
// 				this.props.handleCatIDChange(
// 					this.props.apiCategories[this.state.keys[0]]['subcat'][id][
// 						'subcategoryID'
// 					]
// 				);
// 				this.setKey(id);
// 				this.props.handleCategorySelected(2);
// 				console.log('this is the categoryID: ', this.props.catID);
// 				this.props.handleButtonStateChange({
// 					...this.props.buttonState,
// 					subCat: [
// 						{
// 							...this.props.buttonState.subCat[0],
// 							subCatTerm: [{ sterm: null }],
// 						},
// 					],
// 				});
// 				localStorage.setItem(
// 					'categorySelectorState',
// 					JSON.stringify(this.state)
// 				);
// 				// console.log(this.props.buttonState)
// 			} catch (error) {
// 				// console.log(this.props.apiCategories[id]['subcat'] + "does not have subCategories" + error)
// 			}
// 		}
// 	}

// 	render() {
// 		return this.state.categories.map((categories, i) => (
// 			<ExclusiveOption
// 				buttonState={this.props.buttonState}
// 				handleButtonStateChange={this.props.handleButtonStateChange}
// 				items={categories}
// 				onChange={this.props.onChange}
// 				appendCategory={this.appendCategory}
// 				key={i}
// 				row={i}
// 			/>
// 		));
// 	}
// }

// export default CategorySelector;

import React, { useState, useContext, useEffect } from 'react';
import ExclusiveOption from '../ExclusiveOption';
import { ThemeContext } from '../../ThemeContext';

const CategorySelector = (props) => {
	const context = useContext(ThemeContext);

	// console.log('categorySelector props: ', props)

	const [categories, setCategories] = useState([]);
	const [keyz, setTheKeyz] = useState([]);

	useEffect(() => {
		//look for categorySelector in localStorage. if its there, use it to determine which buttons should be styled when navigating backwards.

		const labelsWithImages = createLabelWithImage(
			props.apiCategories,
			'category'
		);
		console.log(labelsWithImages);

		setCategories([labelsWithImages]);
		if (JSON.parse(localStorage.getItem('categories')))
			setCategories(JSON.parse(localStorage.getItem('categories')));

		if (JSON.parse(localStorage.getItem('keyz')))
			setTheKeyz(JSON.parse(localStorage.getItem('keyz')));
	}, []);

	const setKey = (keyValue) => {
		console.log(keyz, keyValue);
		setTheKeyz([...keyz, keyValue]);
	};

	//categoryType needs to be 'category' or 'subcategory'
	const createLabelWithImage = (array, categoryType) => {
		const svgPathEndings = context === 'light' ? '-black.svg' : '-white.svg';
		let objArray = [];
		console.log(array);
		for (const item of array) {
			let obj = {};
			obj['label'] = item[categoryType];
			obj['image'] = '../dog' + svgPathEndings;
			objArray.push(obj);
		}
		return objArray;
	};

	const appendCategory = (row, id) => {
		let newCategory = categories.slice();
		console.log(newCategory);
		console.log('this is the button row: ', row);
		console.log('this is the button id: ', id);

		//remove subCategories and keys if user clicks at a higher level of the tree
		for (let i = row; i < categories.length - 1; i++) {
			newCategory.pop();
			keyz.pop();
		}

		//keep options from growing
		if (row >= 2) {
			localStorage.setItem('categories', JSON.stringify(categories));
			localStorage.setItem('keyz', JSON.stringify(keyz));

			props.handleCatIDChange('');
			props.handleCategorySelected(3);
			return;
		}

		//Category has been selected. Show subcategory
		if (row === 0) {
			newCategory[row + 1] = createLabelWithImage(
				props.apiCategories[id]['subcat'],
				'subcategory'
			);
			console.log(newCategory[row + 1]);
			setCategories(newCategory);
			setKey(id);

			localStorage.setItem('categories', JSON.stringify(newCategory));
			localStorage.setItem('keyz', JSON.stringify(keyz));

			props.handleCatIDChange(props.apiCategories[id]['categoryID']);
			props.handleCategorySelected(1);
		}
		//subcategory has been selectd. Show subbestCategory.
		else {
			try {
				newCategory[row + 1] = createLabelWithImage(
					props.apiCategories[keyz[0]]['subcat'][id]['subcatterm'],
					'sterm'
				);
				setCategories(newCategory);
				localStorage.setItem('categories', JSON.stringify(newCategory));
				localStorage.setItem('keyz', JSON.stringify(keyz));

				console.log(
					'this is the subcategory id: ',
					props.apiCategories[keyz[0]]['subcat'][id]['subcategoryID']
				);
				props.handleCatIDChange(
					props.apiCategories[keyz[0]]['subcat'][id]['subcategoryID']
				);
				setKey(id);
				props.handleCategorySelected(2);
				console.log('this is the categoryID: ', props.catID);
				props.handleButtonStateChange({
					...props.buttonState,
					subCat: [
						{
							...props.buttonState.subCat[0],
							subCatTerm: [{ sterm: null }],
						},
					],
				});
			} catch (error) {
				console.log(
					this.props.apiCategories[id]['subcat'] +
						'does not have subCategories' +
						error
				);
			}
		}
	};

	useEffect(() => {
		console.log(categories);
		console.log(keyz);
	}, [categories, keyz]);

	return categories.map((categories, i) => (
		<ExclusiveOption
			buttonState={props.buttonState}
			handleButtonStateChange={props.handleButtonStateChange}
			items={categories}
			onChange={props.onChange}
			appendCategory={appendCategory}
			key={i}
			row={i}
		/>
	));
};

export default CategorySelector;

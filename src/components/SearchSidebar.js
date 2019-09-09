import React from 'react';
import './SearchSidebar.css';
import { Button, Wrapper, Menu, MenuItem, openMenu, closeMenu } from 'react-aria-menubutton';
import './AriaMenuButton.css';


// TODO: Replace with all useful genders from 211
const genders = ['male', 'female', 'transgender'];


class DropdownWithImages extends React.Component {
  constructor(props) {
    super(props);
    // Note the currently selected option
    this.state = { selected: '' };
  }

  handleSelection(data) {
    this.setState({ selected: data.label });
  }

  render() {
    const fancyMenuItems = this.props.options.map((label, i) => (
      <MenuItem
        value={{
          label: label
        }}
        text={label}
        key={i}
        // TODO: Make use of is-selected class here
        className={`dropdown-list-option`}
      >
        <img alt={label} src={`svg/${label}.svg`} className="dropdown-list-option-svg" />
        <span className="dropdown-list-option-text">
          I am
          <span className="dropdown-list-option-keyword">{label}</span>
        </span>
      </MenuItem>
    ));

    const menuInnards = menuState => {
      if (!menuState.isOpen) return null;
      return (
        <div className="dropdown-list" key="menu">
          {fancyMenuItems}
        </div>
      );
    };

    return (
      <div>
        <div style={{ marginBottom: 20 }}>
          <button onClick={() => openMenu('foo')}>open menu below</button>
          <button onClick={() => openMenu('foo', { focusMenu: false })}>
            open menu below without focus
          </button>
          <button onClick={() => closeMenu('foo')}>close menu below</button>
        </div>
        <div>
          <Wrapper
            onSelection={this.handleSelection.bind(this)}
            className="dropdown-list-option"
            id="foo"
          >
            <Button className="dropdown-list-trigger">
              <span className="dropdown-list-trigger-innards">
                <img
                  src="svg/all-genders.svg"
                  className="dropdown-list-trigger-icon"
                />
                <span className="dropdown-list-trigger-text">
                  What gender are you?<br />
                  <span className="dropdown-list-trigger-subtitle">
                    (click to select)
                  </span>
                </span>
              </span>
            </Button>
            <Menu>{menuInnards}</Menu>
          </Wrapper>
        </div>
      </div>
    );
  }
}


class SearchSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sex: 'Male',
      zipCode: ''
    }

    this.handleSexChange = this.handleSexChange.bind(this);
    this.handleZipChange = this.handleZipChange.bind(this);
  }

  handleZipChange(event) {
    this.setState({zipCode: event.target.value});
  }
  handleSexChange(event) {
    this.setState({sex: event.target.value});
  }
  handleSelection(data) {
    this.setState({ selected: data.activity });
  }

  render() {
    return (
      <div id="search-sidebar">
        {/* Form Fields */}
        <div>
          <DropdownWithImages options={genders}  />
        </div>

        <div>
          <div class="search-sidebar-category">
            <div class="search-sidebar-category-label">
              Zip
            </div>
            <input type="text" value={this.state.zipCode} onChange={this.handleZipChange} />
          </div>
        </div>

        {/* Display */}
        <h1>
          {this.state.zipCode}
        </h1>
      </div>
    );
  }
}


// Pre-load the initially hidden SVGs
genders.forEach(t => {
  const svg = new Image();
  svg.src = `svg/${t}.svg`;
});

export default SearchSidebar;

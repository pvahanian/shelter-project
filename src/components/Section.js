import React from 'react';
import '../Assets/Section.scss';

class Section extends React.Component {
  render() {
    return(
      <div className='section'>
        <div class='section-name'>
          {this.props.name.toUpperCase()}
        </div>

        {this.props.children}
      </div>
    );
  }
};


export default Section;

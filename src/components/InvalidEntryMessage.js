import React from 'react';
import '../Assets/InvalidEntryMessage.scss';


class InvalidEntryMessage extends React.Component {
  render() {
    return(
      <>
        {
          this.props.message !== '' ?

            <div className='invalid-entry-message'>
              {this.props.message}
            </div>

          :

            <>
            </>
        }
      </>
    );
  }
};

export default InvalidEntryMessage;

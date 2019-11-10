import React from 'react';
import { action } from '@storybook/addon-actions';
import ExOpt from '../components/ExOpt';

export default {
  title: 'ExOpt',
};

let def = 'Male';
let items = ['Male', 'Female', 'Transgender Male', 'Transgender Female']

export const Standard = () => <ExOpt default={def} items={items}/>;

import React from 'react';
import NewDontDo from '../components/NewDontDo';
import renderer from 'react-test-renderer';
import {Button} from 'react-native-elements';


it('renders correctly', () => {
  const tree = renderer.create(
      <NewDontDo/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

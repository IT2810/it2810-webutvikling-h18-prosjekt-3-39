import React from 'react';
import renderer from 'react-test-renderer';
import NewDontDo from '../components/NewDontDo';

test('renders correctly', () => {
  const tree = renderer.create(<NewDontDo />).toJSON();
  expect(tree).toMatchSnapshot();
});
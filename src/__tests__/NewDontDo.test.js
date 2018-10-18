import React from 'react';
import renderer from 'react-test-renderer';
import NewDontDo from '../components/NewDontDo';

// Test bygge et snapshot uten noe data
test('<NewDontDo /> renders correctly', () => {
  const tree = renderer.create(<NewDontDo/>).toJSON();
  expect(tree).toMatchSnapshot();
});

/*
* Test Lage et nytt dont do object når vi ikke har noen fra før
* Setter først statene vi skal teste for. Både med ingen previous tasks og med flere previous tasks
*/
const noPreviousTasksTestState = {
  title: 'Test Title',
  content: 'Test Content',
  tasks: {}
};
const multiplePreviosTaskTestState = {
  title: 'Test Title',
  content: 'Test Content',
  tasks: {
    0: {
      'title': 'previous title 1',
      'content': 'previous content 1',
      'done': false
    },
    1: {
      'title': 'previous title 1',
      'content': 'previous content 1',
      'done': false
    }
  }
};
describe('<NewDontDo /> method tests', () => {
  it('constructNewDonDo tests', () => {
    const wrapper = renderer.create(<NewDontDo/>);
    const instance = wrapper.getInstance();
    // Test med ingen previous tasks
    instance.state = noPreviousTasksTestState;
    expect(instance.constructNewDontDo()).toMatchSnapshot();
    // Test med flere previous tasks
    instance.state = multiplePreviosTaskTestState;
    expect(instance.constructNewDontDo()).toMatchSnapshot();
  });
});

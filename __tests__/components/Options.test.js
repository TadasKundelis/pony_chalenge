import React from 'react';
import { shallow } from 'enzyme';
import { Options } from '../../src/js/components/Options';
import { Select } from '../../src/js/components/Select';

// export const Options = (props) => {
//     const {
//       display, width, height, difficulty, setProp, fetchMazeID
//     } = props;

//     return display ? (
//       <div className="optionsContainer">
//         <button type="button" onClick={fetchMazeID}>Create maze!</button>
//         <div className="labelContainer">
//           <Select value={width} label="Width" setProp={value => setProp('width', value)} />
//           <Select value={height} label="Height" setProp={value => setProp('height', value)} />
//           <Select value={difficulty} label="Difficulty" setProp={value => setProp('difficulty', value)} />
//         </div>
//       </div>
//     )
//       : null;
//   };

describe('<Options />', () => {
  const mockFetchMazeID = jest.fn();
  const data = {
    width: 15,
    height: 15,
    display: true,
    difficulty: 5,
    fetchMazeID: mockFetchMazeID
  };
  const wrapper = shallow(<Options {...data} />);
  it('should contain 3 Select components', () => {
    expect(wrapper.find(Select)).toHaveLength(3);
  });
  it('should call fetchMazeID function on button click', () => {
    wrapper.find('button').simulate('click');
    expect(mockFetchMazeID.mock.calls.length).toBe(1);
  });
});

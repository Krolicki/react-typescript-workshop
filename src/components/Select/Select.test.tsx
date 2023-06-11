import {describe, expect, test, vi} from 'vitest'
import {fireEvent, render, screen} from '@testing-library/react';
import { Select } from './Select';

const options = [
    { label: "one", value: 1 },
    { label: "two", value: 2 },
  ]

describe("Select test", () => {
    // test('setup test', () => {
    //     const mockSetValue = vi.fn();
    //     const { getByTestId } = render(
    //       <Select
    //         options={options}
    //         value={options[0]}
    //         onChange={mockSetValue}
    //         data-testid="select-component"
    //       />
    //     );
    
    //     const selectComponent = getByTestId('select-component').textContent;
       
    //     expect(selectComponent).toEqual('one')
    //   });
    test('setup test2', () => {
        render(
          <Select
            options={options}
            value={options[0]}
            onChange={()=>{}}
            data-testid="select-component"
          />
        )
        const listItems = screen.getAllByRole("option-list-item")
        expect(listItems[0].textContent).toEqual(options[0].label)
      });
})
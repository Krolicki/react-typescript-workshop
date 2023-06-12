import {describe, expect, test, vi, it} from 'vitest'
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import { Select, SelectOption } from './Select';

const options = [
    { label: "one", value: 1 },
    { label: "two", value: 2 },
  ]

describe("Select tests", () => {
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
    it('setup test2', () => {
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
        expect(listItems[1].textContent).toEqual(options[1].label)
        cleanup()
      })
    it('value should change', () => {
      let value = "one"
      render(
        <Select
          options={options}
          value={options[0]}
          onChange={(item)=>{value = item? item.label : "null"}}
          data-testid="select-component"
        />
      )
    
      const listItems = screen.getAllByRole("option-list-item")
      const secondItem = listItems[1]

      fireEvent.click(secondItem)
     
      expect(value).toBe("two")
      cleanup()
      });
    it('multiple values setup test', () => {
      render(
        <Select
          multiple
          options={options}
          value={options}
          onChange={(item)=>{}}
          data-testid="select-component"
        />
      )
    
      const listItems = screen.getAllByRole("option-list-item")
      const secondItem = listItems[1]

      expect(listItems.length).toBe(2)
      expect(secondItem.textContent).toBe("two")

      cleanup()
      });
})
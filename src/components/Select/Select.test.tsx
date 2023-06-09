import {describe, expect, test, vi} from 'vitest'
import {fireEvent, render} from '@testing-library/react';
import { Select } from './Select';

const options = [
    { label: "one", value: 1 },
  ]

describe("Select test", () => {
    test('setup test', () => {
        const mockSetValue = vi.fn();
        const { getByTestId } = render(
          <Select
            options={options}
            value={options[0]}
            onChange={mockSetValue}
            data-testid="select-component"
          />
        );
    
        const selectComponent = getByTestId('select-component').textContent;
        
        expect(selectComponent).toEqual('one')
    
        // fireEvent.change(selectComponent, 
        //     { label: 'two', value: 2 },
        //   );
    
        //expect(mockSetValue).toHaveBeenCalledWith({ label: 'two', value: 2 });
      });
})
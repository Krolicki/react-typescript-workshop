import {describe, expect, test, vi, it} from 'vitest'
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import App from './App';

const options = [
    { label: "one", value: 1 },
    { label: "two", value: 2 },
  ]

describe("App tests", () => {
    it("setup app", () => {
        render(
            <App />
        )
        const selects = screen.getAllByRole("output")
        expect(selects.length).toBe(2)
        expect(selects[0].textContent).toBe("one×")
        const listItems = screen.getAllByRole("option-list-item")
        expect(listItems.length).toBe(10)
        expect(listItems[1].textContent).toBe("two")

        cleanup()
    })
    it("should delete element in multiple select", () => {
        render(
            <App />
        )
        const multipleSelect = screen.getByTestId("multipleSelect")
        const items = multipleSelect.querySelectorAll("[role='option-list-item']")
        expect(items.length).toBe(5)
        expect(items[0].className.includes("selected")).toBeTruthy()
        fireEvent.click(items[0])
        expect(items[0].className.includes("selected")).toBeFalsy()
        cleanup()
    })
})
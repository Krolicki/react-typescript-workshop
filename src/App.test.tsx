import {describe, expect, it} from 'vitest'
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import App from './App';
import { fetch } from 'cross-fetch'

global.fetch = fetch

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
    it("should delete element in multiple select from list", () => {
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
    it("should delete element in multiple select from selected", () => {
        render(
            <App />
        )
        const multipleSelect = screen.getByTestId("multipleSelect")
        const item = multipleSelect.querySelector("[role='output']")
        expect(item).toBeDefined()
        if(item){
            expect(item.children[0].textContent).toBe("one×")
            fireEvent.click(item.children[0])
            expect(item.textContent).toBe("")
        }
        cleanup()
    })
    it("should add and delete element in multiple select from list", () => {
        render(
            <App />
        )
        const multipleSelect = screen.getByTestId("multipleSelect")
        const itemsList = multipleSelect.querySelectorAll("[role='option-list-item']")
        const items = multipleSelect.querySelector("[role='output']")

        expect(items?.childNodes.length).toBe(1)
        fireEvent.click(itemsList[1])
        expect(items?.childNodes.length).toBe(2)
        fireEvent.click(itemsList[2])
        fireEvent.click(itemsList[3])
        expect(items?.childNodes.length).toBe(4)
        fireEvent.click(itemsList[3])
        expect(items?.childNodes.length).toBe(3)
        fireEvent.click(itemsList[2])
        fireEvent.click(itemsList[1])
        fireEvent.click(itemsList[0])
        expect(items?.childNodes.length).toBe(0)
        cleanup()
    })
    it("should change value in single select", () => {
        render(
            <App />
        )
        const singleSelect = screen.getByTestId("singleSelect")
        const itemsList = singleSelect.querySelectorAll("[role='option-list-item']")
        const value = singleSelect.querySelector("[role='output']")

        expect(value?.textContent).toBe("one")
        fireEvent.click(itemsList[1])
        expect(value?.textContent).toBe("two")
        cleanup()
    })
    it("should clear both inputs", () => {
        render(
            <App />
        )
        const multipleSelect = screen.getByTestId("multipleSelect")
        const items = multipleSelect.querySelector("[role='output']")
        const itemsList = multipleSelect.querySelectorAll("[role='option-list-item']")

        const singleSelect = screen.getByTestId("singleSelect")
        const value = singleSelect.querySelector("[role='output']")

        const clearButton = screen.getAllByTestId("clearButton")
        
        fireEvent.click(itemsList[1])       
        expect(items?.childNodes.length).toBe(2)
        fireEvent.click(clearButton[0])
        expect(items?.childNodes.length).toBe(0)

        expect(value?.textContent).toBe("one")
        fireEvent.click(clearButton[1])
        expect(value?.textContent).toBe("")
        cleanup()
    })
    it("should check all keyboard events", () => {
        render(
            <App />
        )
        const multipleSelect = screen.getByTestId("multipleSelect")
        const items = multipleSelect.querySelector("[role='output']")
        const itemsList = multipleSelect.querySelectorAll("[role='option-list-item']")

        const itemsWindow = screen.getAllByTestId('select-component')

        fireEvent.click(multipleSelect)

        fireEvent.keyDown(multipleSelect, {key: 'Enter', code: 'Enter', charCode: 13})    
        expect(items?.childNodes.length).toBe(0)

        fireEvent.keyDown(multipleSelect, {key: 'ArrowDown', code: 'ArrowDown', charCode: 40})   
        fireEvent.keyDown(multipleSelect, {key: 'Enter', code: 'Enter', charCode: 13})  
        expect(items?.childNodes.length).toBe(1)

        fireEvent.keyDown(multipleSelect, {key: 'ArrowUp', code: 'ArrowUp', charCode: 38})  
        expect(itemsWindow[0].className.includes("show")).toBeTruthy()
        fireEvent.keyDown(multipleSelect, {key: 'Escape', code: 'Escape', charCode: 27})
        expect(itemsWindow[0].className.includes("show")).toBeFalsy()

        expect(itemsList[1].className.includes("highlighted")).toBeFalsy()
        fireEvent.keyDown(multipleSelect, {key: 'ArrowDown', code: 'ArrowDown', charCode: 40}) 
        fireEvent.keyDown(multipleSelect, {key: 'ArrowDown', code: 'ArrowDown', charCode: 40})
        expect(itemsList[1].className.includes("highlighted")).toBeTruthy()

        cleanup()
    })
})
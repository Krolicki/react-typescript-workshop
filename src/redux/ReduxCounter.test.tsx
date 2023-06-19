import { fireEvent, render, screen } from "@testing-library/react"
import { describe, it } from "vitest"
import { ReduxCounter } from "./ReduxCounter"
import { Provider } from "react-redux"
import { store } from "./store"


describe("redux tests", () => {
    it("should increment", () => {
        render(
            <Provider store={store}>
                <ReduxCounter />
            </Provider>
        )

        const counter = screen.getByRole("storeValue")
        expect(counter.textContent).toBe("0")

        const incrementButton = screen.getByText("Increment")
        fireEvent.click(incrementButton)

        expect(counter.textContent).toBe("1")
    })
    it("should increment again", () => {
        render(
            <Provider store={store}>
                <ReduxCounter />
            </Provider>
        )

        const counter = screen.getByRole("storeValue")
        expect(counter.textContent).toBe("1")

        const incrementButton = screen.getByText("Increment")
        fireEvent.click(incrementButton)

        expect(counter.textContent).toBe("2")
    })
    it("should decrement", () => {
        render(
            <Provider store={store}>
                <ReduxCounter />
            </Provider>
        )

        const counter = screen.getByRole("storeValue")
        expect(counter.textContent).toBe("2")

        const decrementButton = screen.getByText("Decrement")
        fireEvent.click(decrementButton)

        expect(counter.textContent).toBe("1")
    })
})
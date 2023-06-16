import {describe, expect, it} from 'vitest'
import {cleanup, render, screen, waitFor} from '@testing-library/react';
import {FetchData} from './FetchData'
import { fetch } from 'cross-fetch'

global.fetch = fetch

describe("fetch data tests", async () => {
    it("get the data", async () => {
        
        render(
            <FetchData />
        )

        const output = await waitFor(() => screen.getByRole("fetchDataOutput"))
        
        expect(output.textContent).toBe("1:delectus aut autem")
        cleanup()
    })
})
import {describe, expect, it} from 'vitest'
import {act, cleanup, render, renderHook, screen, waitFor} from '@testing-library/react';
import { fetch } from 'cross-fetch'
import { useGetData } from './useGetData';

global.fetch = fetch

describe("get data hook tests", async () => {
    it("should get the data from hook", async () => {
        const { result } = renderHook(() => useGetData())

        await waitFor(() => {
            expect(result.current.data?.title).toBe("delectus aut autem")
            expect(result.current.data?.id).toBe(1)
        })
    })
})
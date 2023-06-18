import {describe, expect, it} from 'vitest'
import {act, cleanup, renderHook} from '@testing-library/react';
import { useCounter } from './useCouner';


describe("useCounter tests", () => {
    it("shoud increment", () => {
        const { result } = renderHook(() => useCounter())

        act(()=>{
            result.current.increment()
        })

        expect(result.current.count).toBe(1)
    })
    it("shoud decrement", () => {
        const { result } = renderHook(() => useCounter())

        act(()=>{
            result.current.decrement()
        })

        expect(result.current.count).toBe(-1)
    })
    it("shoud increment and decrement", () => {
        const { result } = renderHook(() => useCounter())

        act(()=>{
            result.current.increment()
            result.current.increment()
            result.current.decrement()
        })

        expect(result.current.count).toBe(1)
    })
})
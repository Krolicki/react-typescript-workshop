import { useSelector, useDispatch } from "react-redux"
import { RootState, decrement, increment } from "./store"


export function ReduxCounter() {
    const count = useSelector((state : RootState) => state.counter)
    const dispatch = useDispatch()

    return(
        <div>
            <button
                onClick={() => dispatch(increment())}
            >
                Increment
            </button>
            <button
                onClick={() => dispatch(decrement())}
            >
                Decrement
            </button>
            <span role="storeValue">{count.value}</span>
        </div>
    )
}
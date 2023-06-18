import { useEffect, useState } from 'react'

type dataType = {
    "userId": number,
    "id": number,
    "title": string,
    "completed": boolean   
} 

export function useGetData () {
    const [data, setData] = useState<dataType>()

    useEffect(()=>{
        let mounted = true

        fetch("https://jsonplaceholder.typicode.com/todos/1")
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                if(mounted)
                    setData(res)
            })

        return () => {
            mounted = false
        }
    }, [])


    return { data }
}
import { useEffect, useState } from 'react'
import './FetchData.css'


type dataType = {
    "userId": number,
    "id": number,
    "title": string,
    "completed": boolean   
} 
| null

export function FetchData () {
    const [data, setData] = useState<dataType>(null)

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


    return (
        <div className='fetch-wraper'>
            {data && <p role="fetchDataOutput">{data.userId + ":" + data.title}</p>}
        </div>
    )
}
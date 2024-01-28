"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Profile(){

    const [data, setData] = useState('nothing')

    const router = useRouter()
    async function onLogout(){
        try {
            const res = await axios.get('api/users/log-out')
            router.push('/login')
        } catch (error:any ) {
            console.log(error.message)
        }
    }
    const getUserDetails = async()=>{
        const res = await axios.get('/api/users/me')
        console.log('response from me', res.data.data._id)
        setData(res.data.data._id)

    }
    return(
        <div>
            Profile


            <button onClick={onLogout} className="px-3 py-3 bg-blue-400 rounded-lg">Log Out</button>
            <button onClick={getUserDetails} className="px-3 py-3 bg-blue-400 rounded-lg">Get User</button>
            <h2 className='text-center font-semibold '>{data ==='nothing'?"Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
        </div>
    )
}
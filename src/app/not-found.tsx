import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex justify-center items-center flex-col h-screen w-full'>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className='bg-blue-500 px-3 py-2 text-white font-semibold rounded-sm'>Return Home</Link>
    </div>
  )
}
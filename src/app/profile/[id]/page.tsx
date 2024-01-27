export default function UserProfile({params}:any){
    const {id}= params
    return(

        // params syntex space = %20, = ->%
        <div>
            <h1 className="text-center font-semibold"> User Profile</h1>
            <hr />
            <p className="text-4xl">Profile Page : 
            <span className="text-blue-500">{params.id}</span></p>
        </div>
    )
}
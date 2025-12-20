export const userQuery = (userId)=>{
    const query = `*[_type == "user" && _id == "${userId}"] `;
    return query
}

export const searchQuery = (searchTerm)=>{
    const query = `*[type == "pin" && title match '${searchTerm}*' || categoery match '${searchTerm}*' || about match '${searchTerm}*']{
     image{
        asset->{
            url
        }
     },
     _id,
     destination,
     postedBy->{
        _id,
        userName,
        image
     },
        save[]{
        _key,
        postedBy->{
            _id,
            userName,
            image
            },
        },
    } `
}

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc){
    image{
        asset->{
            url
        }
     },
     _id,
     destination,
     postedBy->{
        _id,
        userName,
        image
     },
        save[]{
        _key,
        postedBy->{
            _id,
            userName,
            image
            },
        },
}`


export const categories = [
    {
        name:'cars',
        image:'https://i.pinimg.com/750x/eb/3d/1c/eb3d1c4676f2ed9640a1b4d8d2bcae18.jpg'
    },
    {
        name:'fitness',
        image:'https://i.pinimg.com/750x/eb/3d/1c/eb3d1c4676f2ed9640a1b4d8d2bcae18.jpg'
    },
    {
        name:'wallpaper',
        image:'https://i.pinimg.com/750x/eb/3d/1c/eb3d1c4676f2ed9640a1b4d8d2bcae18.jpg'
    },
    {
        name:'websites',
        image:'https://i.pinimg.com/750x/eb/3d/1c/eb3d1c4676f2ed9640a1b4d8d2bcae18.jpg'
    },
    {
        name:'photo',
        image:'https://i.pinimg.com/750x/eb/3d/1c/eb3d1c4676f2ed9640a1b4d8d2bcae18.jpg'
    },
    {
        name:'food',    
        image:'https://i.pinimg.com/750x/eb/3d/1c/eb3d1c4676f2ed9640a1b4d8d2bcae18.jpg'
    },
    {
        name:'nature',
        image:'https://i.pinimg.com/750x/eb/3d/1c/eb3d1c4676f2ed9640a1b4d8d2bcae18.jpg'
    },
    {
        name:'art',
        image:'https://i.pinimg.com/750x/eb/3d/1c/eb3d1c4676f2ed9640a1b4d8d2bcae18.jpg'
    },
    {

        name:'travel',
        image:'https://i.pinimg.com/750x/eb/3d/1c/eb3d1c4676f2ed9640a1b4d8d2bcae18.jpg'
    },
    {
        name:'quotes',
        image:'https://i.pinimg.com/750x/eb/3d/1c/eb3d1c4676f2ed9640a1b4d8d2bcae18.jpg'
    },
]
    


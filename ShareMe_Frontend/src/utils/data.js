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
    


export const userQuery = (userId)=>{
    const query = `*[_type == "user" && _id == "${userId}"] `;
    return query
}

export const searchQuery = (searchTerm) => {
    const query = `*[_type == "pin" && (
        category == "${searchTerm}" ||
        title match "${searchTerm}*" ||
        about match "${searchTerm}*"
    )]{
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
            }
        },
        title,
        about,
        category
    }`;
    return query;
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
        image:'https://images.unsplash.com/photo-1517940310602-5f75c8f4c88a?auto=format&fit=crop&w=800&q=60'
    },
    {
        name:'fitness',
        image:'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=60'
    },
    {
        name:'wallpaper',
        image:'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60'
    },
    {
        name:'websites',
        image:'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=800&q=60'
    },
    {
        name:'photo',
        image:'https://images.unsplash.com/photo-1483728632953-1d1a7f1a5b22?auto=format&fit=crop&w=800&q=60'
    },
    {
        name:'food',    
        image:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=60'
    },
    {
        name:'nature',
        image:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60'
    },
    {
        name:'art',
        image:'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=60'
    },
    {

        name:'travel',
        image:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60'
    },
    {
        name:'quotes',
        image:'https://images.unsplash.com/photo-1517249361623-1f0a56a9a46c?auto=format&fit=crop&w=800&q=60'
    },
]
    

export const pinDetailQuery = (pinId)=>{
    const query = `*[_type == "pin" && _id == "${pinId}"]{
        image{
            asset->{
                url
            }
         },
         _id,
            title, 
            about,
            category,
            destination,
            postedBy->{
                _id,
                userName,       
                image
            },
            save[]{
                postedBy->{
                    _id,        
                    userName,
                    image
                },
            },
            comments[]{
                comment,
                _key,   
                postedBy->{
                    _id,
                    userName,
                    image   
                },
            }
    }`
    return query

}


export const pinDetailMorePinQuery = (pinId)=>{
    const query = `*[_type == "pin" && category == "${pinId.category}" && _id != "${pinId._id}" ]{
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
    return query
}

export const userCreatedPinsQuery = (userId) => {
    const query = `*[_type == "pin" && (userId == "${userId}" || postedBy._ref == "${userId}")] | order(_createdAt desc){
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
            userId
        },
        title,
        about,
        category
    }`;
    return query;
}

export const userSavedPinsQuery = (userId) => {
    const query = `*[_type == "pin" && "${userId}" in save[].userId] | order(_createdAt desc){
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
            userId
        },
        title,
        about,
        category
    }`;
    return query;
}



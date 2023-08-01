export type PostType = {
    id: number
    message: string
    like: number
}
type DialogType = {
    id: number
    name: string
}
type MessageObjectType = {
    id: number
    message: string
}

export type profilePageType = {
    posts: PostType[]
}
export type dialogsPageType = {
    dialogs: DialogType[]
    messages: MessageObjectType[]
}

export type StateType = {
    profilePage: profilePageType
    dialogsPage: dialogsPageType
}

export let State: StateType = {
    profilePage: {
        posts: [
            {id: 1, message: 'hello world', like: 15},
            {id: 2, message: 'It is my first post', like: 20}
        ]
    },
    dialogsPage: {
        dialogs: [
            {id: 1, name: 'Adam'},
            {id: 2, name: 'Rustam'},
            {id: 3, name: 'Aslan'}
        ],
        messages: [
            {id: 1, message: 'hi world'},
            {id: 2, message: 'do you speak english'},
            {id: 3, message: 'I am from Grozny'}
        ]
    }

}

export const addPost = (message: string) => {
    debugger
    const newPost: PostType = {
        id: State.profilePage.posts.length + 1,
        message,
        like: 0
    }
    State.profilePage.posts.push(newPost)
    // State = {
    //     ...State,
    //     profilePage: {...State.profilePage, posts: [...State.profilePage.posts, newPost]}
    // }
}
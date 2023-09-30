const NEW_MESSAGE_BODY = "NEW-MESSAGE-BODY"
const SEND_MESSAGE = "SEND-MESSAGE"

export type NewMessageBodyAT = {
    type: "NEW-MESSAGE-BODY"
    text: string
}
export type SendMessageAT = {
    type: "SEND-MESSAGE"
}


type DialogType = {
    id: number
    name: string
}
type MessageObjectType = {
    id: number
    message: string
}

export type DialogsPageType = {
    dialogs: DialogType[]
    messages: MessageObjectType[]
    newMessageBody: string
}

export type DialogsActionsType = NewMessageBodyAT | SendMessageAT

const initialState: DialogsPageType = {
    dialogs: [
        {id: 1, name: 'Adam'},
        {id: 2, name: 'Rustam'},
        {id: 3, name: 'Aslan'}
    ],
    messages: [
        {id: 1, message: 'hi world'},
        {id: 2, message: 'do you speak english'},
        {id: 3, message: 'I am from Grozny'}
    ],
    newMessageBody: ''
}

export const DialogsReducer = (state: DialogsPageType = initialState, action: DialogsActionsType): DialogsPageType => {
    switch (action.type) {
        case NEW_MESSAGE_BODY:
            state.newMessageBody = action.text
            return state
        case SEND_MESSAGE:
            state.messages.push({id: 4, message: state.newMessageBody})
            state.newMessageBody = ''
            return state
        default:
            return state
    }
}

export const NewMessageBodyAC = (text: string): NewMessageBodyAT => ({
    type: NEW_MESSAGE_BODY,
    text
})
export const SendMessageAC = (): SendMessageAT => ({
    type: SEND_MESSAGE
})
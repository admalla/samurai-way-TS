const SEND_MESSAGE = "SEND-MESSAGE";

export type NewMessageBodyAT = {
  type: "NEW-MESSAGE-BODY";
  text: string;
};
export type SendMessageAT = {
  type: "SEND-MESSAGE";
  message: string;
};

type DialogType = {
  id: number;
  name: string;
};
type MessageObjectType = {
  id: number;
  message: string;
};

export type DialogsPageType = {
  dialogs: DialogType[];
  messages: MessageObjectType[];
};

export type DialogsActionsType = NewMessageBodyAT | SendMessageAT;

const initialState: DialogsPageType = {
  dialogs: [
    { id: 1, name: "Adam" },
    { id: 2, name: "Rustam" },
    { id: 3, name: "Aslan" },
  ],
  messages: [
    { id: 1, message: "hi world" },
    { id: 2, message: "do you speak english" },
    { id: 3, message: "I am from Grozny" },
  ],
};

export const DialogsReducer = (
  state: DialogsPageType = initialState,
  action: DialogsActionsType,
): DialogsPageType => {
  switch (action.type) {
    case SEND_MESSAGE:
      state.messages.push({ id: 4, message: action.message });
      return state;
    default:
      return state;
  }
};

export const SendMessageAC = (message: string): SendMessageAT => ({
  type: SEND_MESSAGE,
  message,
});

import { InitialMessage } from "./initial.message";

import {
    SetActions,
    SetMessageType,
    SetPushNotificationTheme,
    AuthWebSocketMessage
} from "../../type.decorator";

import { MessageActionTypes, MessageActionDataTypes } from "../../message.action.types";
import { ROUTES } from "../../../../router/index";
import { WebSocketTypes } from "../../web.socket.types";

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.EventDeleted)
@SetPushNotificationTheme('error')
@SetActions([
    {
        type: MessageActionTypes.ActionClose,
        text: 'Понятно'
    },
    {
        type: MessageActionTypes.Action,
        text: 'Найти ивенты',
        action: ROUTES.APPLICATION.EVENTS.absolute,
        actionType: MessageActionDataTypes.Url,
        buttonType: 'stroked'
    }
])
export class EventDeletedMessage extends InitialMessage {
    createTexts(data) {
        return [
            `Событие было удалено. Для того что бы подобрать другое событие нажмите кнопку "${this.actions[1].text}."`
        ]
    };

    createTitle() {
        return 'Событие удалено!';
    }
}
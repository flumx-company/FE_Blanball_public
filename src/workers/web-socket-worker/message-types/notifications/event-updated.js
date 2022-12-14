import { InitialMessage } from "./initial.message";

import {
    SetActions,
    SetMessageType,
    AuthWebSocketMessage
} from "../../type.decorator";

import { MessageActionTypes, MessageActionDataTypes } from "../../message.action.types";
import { WebSocketTypes } from "../../web.socket.types";
import { ROUTES } from "../../../../router";

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.EventUpdated)
@SetActions([
    {
        type: MessageActionTypes.ActionClose,
        text: 'Понятно'
    },
    {
        type: MessageActionTypes.Action,
        text: 'Просмотреть ивент',
        action: ({ notificationInstance }) => ROUTES.APPLICATION.EVENTS.GET_ONE.absolute(notificationInstance.data.event.id),
        actionType: MessageActionDataTypes.UrlCallback,
        buttonType: 'stroked'
    },
])
export class EventUpdatedMessage extends InitialMessage {
    createTexts(data) {
        return [
            `${data.recipient.name} - событие обновилось. Для того что бы просмотреть подробности обновления нажмите кнопку "${this.actions[1].text}"`
        ]
    };

    createTitle() {
        return 'Ивент был обновлен!';
    }
}

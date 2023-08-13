import EventEmitter2, { ListenerFn } from 'eventemitter2'

const event = new EventEmitter2()

export const eventBus = {
    subscribeToEvent,
    emitEvent,
    unsubscribeFromEvent
}

function subscribeToEvent(evName: string, cb: ListenerFn) {
    event.on(evName, cb)
}

function unsubscribeFromEvent(evName: string, cb: ListenerFn) {
    event.removeListener(evName, cb)
}

function emitEvent(evName: string, ...args: any[]) {
    event.emit(evName, args)
}

import { TEventSkillMap } from '@event-emmitter/modules/skill/skill-event'

type TEventMap = TEventSkillMap

type TEventCallback<T = any> = (data: T) => void

class EventEmitter {
  private events: Record<string, TEventCallback[]>

  constructor() {
    this.events = {}
  }

  on<T extends keyof TEventMap>(event: T, callback: TEventCallback<TEventMap[T]>) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback as TEventCallback)
  }

  off<T extends keyof TEventMap>(event: T, callback: TEventCallback<TEventMap[T]>) {
    if (!this.events[event]) return

    this.events[event] = this.events[event].filter((cb) => cb !== callback)
  }

  emit<T extends keyof TEventMap>(event: T, data: TEventMap[T]) {
    if (!this.events[event]) return

    this.events[event].forEach((callback) => callback(data))
  }
}

export const eventEmitter = new EventEmitter()

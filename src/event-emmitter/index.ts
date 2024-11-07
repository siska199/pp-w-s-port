import { TEventMapEducation } from "@event-emmitter/modules/education-event"
import { TEventMapExperiance } from "@event-emmitter/modules/experiance-event"
import { TEventMapSkill } from "@event-emmitter/modules/skill-event"

export type TEventMap = TEventMapSkill & TEventMapEducation & TEventMapExperiance

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

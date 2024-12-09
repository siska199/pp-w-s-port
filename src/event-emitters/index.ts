import { TEventMapEducation } from '@features/education/event-emitters/education-event'
import { TEventMapExperiance } from '@features/experiance/event-emitters/experiance-event'
import { TEventMapPersonalInfo } from '@features/personal-information/event-emitters/personal-info-event'
import { TEventMapProject } from '@features/project/event-emitters/project-event'
import { TEventMapSkill } from '@features/skill/event-emitters/skill-event'

export type TEventMap = TEventMapSkill &
  TEventMapEducation &
  TEventMapExperiance &
  TEventMapProject &
  TEventMapPersonalInfo

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

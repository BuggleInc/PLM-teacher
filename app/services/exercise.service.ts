import { Injectable } from '@angular/core'

import { Exercise } from '../models/exercise'
import { EXERCISES } from '../mocks/mock-exercises'

@Injectable()
export class ExerciseService {

  exercises: Exercise[] = []

  constructor() {
    this.init()
  }

  init(): void {
    this.retrieveExercises()
      .then(exercises => {
        this.exercises = exercises
      })
      .catch(err => console.error(err))
  }

  retrieveExercises(): Promise<Exercise[]> {
    return Promise.resolve(EXERCISES)
  }

  getExercises(): Exercise[] {
    return this.exercises
  }

  getExercise(id: string): Exercise {
    return this.getExercises().find(exercise => exercise.id === id)
  }
}

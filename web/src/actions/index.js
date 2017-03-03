export const SAMPLE_ACTION = 'SAMPLE_ACTION'

export const sampleAction = (sampleInput) => {
  return {
    type: SAMPLE_ACTION,
    payload: {
      sample: sampleInput
    }
  }
}

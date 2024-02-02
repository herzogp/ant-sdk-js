import { libvstar } from '../internal'

export const GetRandom = () => {
    return libvstar.Get_random()
}

export const RandomChoice = (things: unknown[]) => {
    const num_things = things.length
    if (num_things < 1) {
        return undefined
    }

    const uval = GetRandom()
    const index = uval % num_things
    return things[index]
}

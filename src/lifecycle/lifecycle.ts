import { libvstar, JSONValue } from '../internal'

export const LogEvent = (name: string, event: JSONValue) => {
    libvstar.Json_data(name, event)
}

export const SetupComplete = () => {
    LogEvent('setup_status', 'complete')
}

export const SetSourceName = (name: string) => {
    libvstar.Set_source_name(name)
}

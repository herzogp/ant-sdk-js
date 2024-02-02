import http from 'http'
import { libvstar } from './internal'
import { SetupComplete } from './lifecycle'
import { GetRandom } from './random'

const PORT = process.env.PORT || 3000

export const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-type': 'application/json' })
    res.write(JSON.stringify({ data: 'ant-sdk-js works!' }))
    libvstar.Json_data('date', Date())
    res.end()
})

const get_fingerprint = (n: number) => {
    const all_chars: string[] = []
    for (let i = 0; i < n; i++) {
        const one_byte = libvstar.Get_random() & 0x000000ff
        const text = one_byte.toString(16)
        const s = text.length < 2 ? '0' + text : text
        all_chars.push(s)
    }
    const fingerprint = all_chars.join(' ')
    return fingerprint
}

server.listen(PORT, () => {
    const msg = `Server is running on http://localhost:${PORT}/`

    const fingerprint = get_fingerprint(10)
    console.log(fingerprint)

    SetupComplete()

    if (libvstar.No_emit()) {
        console.log(msg)
    } else {
        libvstar.Set_source_name("tomato")
        libvstar.Json_data("message", msg)
        libvstar.Json_data("message", 'Have some more')
    }
})

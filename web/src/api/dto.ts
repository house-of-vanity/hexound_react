export interface TrackDTO {
    author: string
    hash: string
    id: number
    mimetype: string,
    real_name: string,
    secure_name: string,
    str_time: string
    time: string
    title: string
}

export type TrackDictDTO = Record<TrackDTO['id'], TrackDTO>

export interface TrackDictRequestDTO {
    limit: number,
    offset: number
}
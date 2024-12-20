export interface Event {
    id: string,
    creatorId: string,
    name: string
    title: string,
    description: string
    location: string
    eventDate: Date
}

export interface FullEvent {
    id: string,
    creatorId?: string,
    name: string
    title: string,
    description: string
    location: string
    eventDate: Date
    creator: Creator;
    attendees: Attendees[];
}

export interface Creator{
    firstName: string,
    lastName: string,
    email: string
}

export interface Attendees {
    firstName: string,
    lastName: string,
    email: string
}
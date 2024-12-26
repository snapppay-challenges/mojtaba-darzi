import { ContactType } from "./ContactType"
import { MetaType } from "./MetaType"

export type ContactResponseType = {
    items: ContactType[]
    meta: MetaType
}
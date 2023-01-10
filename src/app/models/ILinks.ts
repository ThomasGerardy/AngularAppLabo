export interface ILink{
    title : string
    url : string
    children? : ILink[]
    isVisible? : boolean
}
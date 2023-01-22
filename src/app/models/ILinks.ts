export interface ILink{
    title : string
    url : string
    children? : ILink[]
    selected? : string
}
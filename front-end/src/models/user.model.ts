export interface User{
  id:string
  name ?:string
  image ?:string
  stade ?:string
  withRecap ?:boolean
  deleteFalseAnswer ?:boolean
  hint ?:boolean
  vocal ?:boolean
  password ?: string;
  role ?: number

}

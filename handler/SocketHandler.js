import * as Handler from './ClientHandler'
export default class ClientHandler{
    constructor(socket){
        console.log("Socket ["+socket.id+"] Connected")
        this.socket = socket

        let context = this
        this.socket.on("register",(data)=>{
            context.clientInfo = {
                id:context.socket.id,
                type:data.type,
                username:data.username,
                socket:context.socket
            }
            console.log("Socket ["+context.socket.id+"] Registered as "+context.clientInfo.username)
            Handler.addClient(context.clientInfo)
            
            context.handleEvents()
        })

        this.socket.on("disconnect",()=>{
            if(typeof context.clientInfo === "undefined"){
                console.log("Socket ["+socket.id+"] Disconnected")
            }else{
                Handler.removeClient(this.clientInfo)
                console.log("Socket ["+context.socket.id+"] Registered as "+context.clientInfo.username + " Disconnected")
            }
        })
    }

    handleEvents(){
        console.log("Catching events")
        let context = this
        this.socket.on("send",(data)=>{
            console.log(context.socket.id + " Emit Send")
            let target = data.target
            let id = data.id
            let payload = data.payload
            let broadcast = data.broadcast

            if(broadcast){
                Handler.broadcast(payload,context.clientInfo)
            }else{
                if(typeof target !== "undefined"){
                    Handler.notifyUsername(target,payload,context.clientInfo)
                }else if(typeof id !== "undefined"){
                    Handler.notifyId(id,payload,context.clientInfo)
                }
            }
        })
    }
}
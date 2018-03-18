import Enumerable from 'linq'
let clientList = []
export function addClient(client){
    clientList.push(client)
}
export function removeClient(client){
    for(let i = 0;i < clientList.length;i++){
        if(clientList[i].id === client.id){
            clientList.splice(i,1)
            break
        }
    }
}
export function notifyId(clientid,data,sender){
    let client = Enumerable.from(clientList).where((e,i)=>e.id === clientid).first()
    if(client !== null){
        data.sender = sender.username
        client.socket.emit("notify",data)
    }else{
        sender.socket.emit("fail",{msg:"Clientid not found!"})
    }
}
export function notifyUsername(username,data,sender){
    console.log("Notifying " + username)
    let client = Enumerable.from(clientList).where((e,i)=>e.username === username).first()
    if(client !== null){
        data.sender = sender.username
        client.socket.emit("notify",data)
    }else{
        sender.socket.emit("fail",{msg:"Clientid not found!"})
    }
}
export function broadcast(data,sender){
    data.sender = sender.username
    for(let u of clientList){        
        u.socket.emit("notify",data)
    }
}
const net = require('net')
class tcp{
    constructor(args){
        this.client=new net.Socket(),
        this.host=args.host || "127.0.0.1",
        this.port=args.port || 502
        this.init()
    }
    init(){
        this.client.on('connect',()=>{
            console.log('connect')
        })
        
        this.client.on('error',(err)=>{
            console.log(err)
        })
        
        this.client.on('close',()=>{
            console.log("close,reconnect again!")
            setTimeout(() => {
                this.client.end()
                this.connectServer()
            }, 10000);
        })
        this.connectServer() 
    }
    connectServer(){
        this.client.connect({
            host:this.host,
            port:this.port
        })
    }
    readHoldRegs(arr){
        return new Promise((resolve,reject)=>{
            //console.log(Buffer.from(arr))
            this.client.write(Buffer.from(arr))
            this.client.once('data',(data)=>{
                resolve(data)
            })
        })
    }
    writeHoldRegs(arr){
        return new Promise((resolve,reject)=>{
            //console.log(Buffer.from(arr))
            this.client.write(Buffer.from(arr))
            this.client.once('data',(data)=>{
                resolve(data)
            })
        })
    }
    close(){
        this.client.unref()
    }

}
module.exports=tcp
const zymodbus = require('./index')

const socket=new zymodbus({
    host:"192.168.50.7",
    port:20108
})

const demo = async()=>{
    await socket.writeRegisters(0,0)
    socket.close()
}
demo();
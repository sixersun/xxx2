const zymodbus = require('./index')

const socket=new zymodbus({
    host:"192.168.155.201",
    port:502
})

const demo = async()=>{
    await socket.writeRegisters(30,1)
    socket.close()
}
demo();
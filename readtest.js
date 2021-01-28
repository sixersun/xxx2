const zymodbus = require('./index')

const socket=new zymodbus({
    host:"192.168.155.201",
    port:502
})

const demo = async()=>{
    const r = await socket.readInputRegisters(0,32)
    console.log(r)
    socket.close()
}
demo();
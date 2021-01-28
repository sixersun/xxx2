const tcp = require('./lib/tcp')
const map = require('./lib/map');

// const data=await socket.readHoldRegs(bit)
// var json = JSON.stringify(data)
// var arr  = JSON.parse(json);
// console.log(arr)
class zymodbus{
    constructor(args){
        this.host=args.host || "127.0.0.1",
        this.port=args.port || 502
        this.init()
    }
    init(){
        this.socket=new tcp({
            host:this.host,
            port:this.port
        })
    }
    //读DO继电器状态
    readInputRegisters = async(addr=0,len=32)=>{
        //这个设备比较特殊，直接读取所有的32位数据
        const bit = [0x01,0x01,0x00,0x00,0x00,0x20,0x3D,0xD2]
        const buf = await this.socket.readHoldRegs(bit)
        const hex_array =  this.bytesToBinary(buf.slice(3,7));
        const arr = hex_array.split('')
        const _arr = []
        for(let i=0;i<rmap.length;i++){
            _arr.push(Number(arr[rmap[i]]));
        }
        const r = _arr.splice(addr,len)
        return r;
    }
    //读DI继电器状态
    readHoldingRegisters = async(addr=0,len=32)=>{
        //这个设备比较特殊，直接读取所有的32位数据
        const bit = [0x01,0x04,0x00,0x00,0x00,0x20,0xF1,0xD2]
        const buf = await this.socket.readHoldRegs(bit)
        const json = JSON.stringify(buf)
        const arr  = JSON.parse(json);
        const data = arr.data.slice(3,67);//第三位开始位寄存器状态，有64位
        //取偶数位作为最终的状态
        let _arr = []
        for(let i=0;i<data.length;i++) {
          if(i%2!=0) {
            _arr.push(data[i])
          }
        }
        _arr = _arr.slice(addr,len)
        return _arr;
        //
        //console.log('data:'+data.length)
        //第0位的寄存器从返回data的第
    }
    //直接写入对应的命令
    writeRegisters = async(addr,status)=>{
       // const bit = [0x01,0x05,0x00,0x00,0xFF,0x00,0x8C,0x3A]
        const arr =map[addr][status]
        const buf = await this.socket.writeHoldRegs(arr)
    }
    bytesToBinary(bytes) {
        const length = bytes.length;
        let result = '';
        for (let i = 0; i < length; i++) {
            const binStr = Number(bytes[i]).toString(2)
            result +=  '0'.repeat(8 - binStr.length) + binStr; // 不足八位前置补0
        }
        return result.toString();
    }
    close = async()=>{
        this.socket.close()
    }
}
module.exports=zymodbus
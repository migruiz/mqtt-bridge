// Output array
input.onButtonPressed(Button.A, function () {
    counter = counter - 1
    reportStatus();
})
input.onButtonPressed(Button.B, function () {
    counter = counter + 1
    reportStatus();
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    serial.writeLine("" + (JSON.stringify({ type: 'mqtt', topic: 'tts', message: `My name is Ale` })))
    basic.showIcon(IconNames.Heart)
    basic.clearScreen()
})
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    serialData = serial.readUntil(serial.delimiters(Delimiters.NewLine))
    if (serialData == "CONNECTED") {
        basic.showIcon(IconNames.Yes)
        basic.clearScreen()
    } else {
        switch (serialData) {
            case "MOVE_CAR":
                basic.showString(serialData)
                break;
            case "STOP_CAR":
                basic.showString(serialData)
                break;
            case "CAR_GO_FASTER":
                basic.showString(serialData)
                break;
            case "CAR_GO_SLOWER":
                basic.showString(serialData)
                break;
            default:
                break;
        }       
        basic.clearScreen()
    }
})
let serialData = ""
let counter = 0
const reportStatus = () =>{
    serial.writeLine("" + (JSON.stringify({ type: 'mqtt', topic: 'tts', message: `${counter}` })))
    basic.showString(`${counter}`)
    basic.clearScreen()
}
serial.redirect(
SerialPin.P12,
SerialPin.P8,
BaudRate.BaudRate115200
)

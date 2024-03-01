def on_data_received():
    global name
    name = serial.read_until(serial.delimiters(Delimiters.NEW_LINE))
    basic.show_string(name)
    basic.show_icon(IconNames.YES)
    basic.pause(200)
    basic.clear_screen()
    serial.write_string("Hello " + name)
    music.play(music.builtin_playable_sound_effect(soundExpression.twinkle),
        music.PlaybackMode.UNTIL_DONE)
serial.on_data_received(serial.delimiters(Delimiters.NEW_LINE), on_data_received)

name = ""
serial.redirect(SerialPin.P12, SerialPin.P8, BaudRate.BAUD_RATE115200)
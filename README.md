# homebridge-rgb-ledstrip

[![verified-by-homebridge](https://badgen.net/badge/homebridge/verified/purple)](https://github.com/homebridge/homebridge/wiki/Verified-Plugins)
[![npm version](https://badge.fury.io/js/homebridge-rgb-ledstrip.svg)](https://badge.fury.io/js/homebridge-rgb-ledstrip)
![npm](https://img.shields.io/npm/dw/homebridge-rgb-ledstrip)
[![Donate](https://img.shields.io/badge/Donate-Buy_Me_a_Coffee-green.svg)](https://www.buymeacoffee.com/misi)

[Raspberry Pi](https://www.raspberrypi.org) GPIO based LED Strip plugin for [Homebridge](https://github.com/nfarina/homebridge)

Originally inspired by [GiniaE/homebridge-gpio-ledstrip](https://github.com/GiniaE/homebridge-gpio-ledstrip) and [manfredipist/homebridge-gpio-rgb-ledstrip](https://github.com/manfredipist/homebridge-gpio-rgb-ledstrip)

# Installation

1.	Install Homebridge using `npm install -g homebridge`
2.	Install this plugin `npm install -g homebridge-rgb-ledstrip`
3.	Run `sudo pigpiod` after installing [the pigpio library](https://abyz.me.uk/rpi/pigpio/) and Python
4. Optionally install [Homebridge Config UI X](https://github.com/oznu/homebridge-config-ui-x)

# Hardware

Follow [David Ordnung's tutorial](https://dordnung.de/raspberrypi-ledstrip/) on how to connect your LED Strip to the Rapsberry Pi's GPIO pins.

# Configuration

Configuration sample:

 ```
    "accessories": [
      {
        "accessory": "RgbLedStrip",
        "name": "Bedroom LED Strip",
        "rPin": 17,
        "gPin": 22,
        "bPin": 24
      }
    ]
```

Fields:

* "accessory": Must always be "RgbLedStrip" (required)
* "name": Can be anything (required)
* "rPin": GPIO pin that is used to set red value (required)
* "gPin": GPIO pin that is used to set green value (required)
* "bPin": GPIO pin that is used to set blue value (required)

## Contributing

Feel free to open an issue (or even better, send a Pull Request) to contribute. Contributions are always welcomed! 😄

<a href="https://www.buymeacoffee.com/misi" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

Please consider donating. 🙏

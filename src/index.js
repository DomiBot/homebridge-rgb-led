"use strict";

var Service, Characteristic;

const child_process = require('child_process');
const converter = require('color-convert');
const path = require('path');
const fs = require('fs');
const fetch = require("node-fetch");

module.exports = function(homebridge) {
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;

	homebridge.registerAccessory('homebridge-rgb-led', 'rgb-led-system', RgbLedAccessory);
}

function RgbLedAccessory(log, config) {
	this.log      = log;
	this.name     = config['name'];


	this.ip     = config['ip'];
	this.token     = config['token'];
	this.vpin     = config['vpin'];

	this.enabled = true ;

	try {
		if (!this.ip)
			throw new Error("ip not set!")
		if (!this.token)
			throw new Error("token not set!")
		if (!this.vpin)
			throw new Error("vpin not set!")
	} catch (err) {
		this.log("An error has been thrown! " + err);
		this.log("homebridge-rgb-ledstrip won't work until you fix this problem");
		this.enabled = false;
	}

}

RgbLedAccessory.prototype = {

	getServices : function(){

		if(this.enabled){
			this.on = 0
			this.brightness = 0
			this.hue = 0
			this.saturation = 0
		
			let informationService = new Service.AccessoryInformation();

			informationService
				.setCharacteristic(Characteristic.Manufacturer, 'misi')
				.setCharacteristic(Characteristic.Model, 'RGB-LedStrip')
				.setCharacteristic(Characteristic.SerialNumber, '06-06-00');

			let rgbLedStripService = new Service.Lightbulb(this.name);

			rgbLedStripService
				.getCharacteristic(Characteristic.On)
				.onGet(this.getToggleState.bind(this, "on"))
				.onSet(this.setToggleState.bind(this, "on"))

			rgbLedStripService
				.addCharacteristic(new Characteristic.Brightness())
				.onGet(this.getToggleState.bind(this, "brightness"))
				.onSet(this.setToggleState.bind(this, "brightness"))

			rgbLedStripService
				.addCharacteristic(new Characteristic.Hue())
				.onGet(this.getToggleState.bind(this, "hue"))
				.onSet(this.setToggleState.bind(this, "hue"))

			rgbLedStripService
				.addCharacteristic(new Characteristic.Saturation())
				.onGet(this.getToggleState.bind(this, "saturation"))
				.onSet(this.setToggleState.bind(this, "saturation"))

			this.informationService = informationService;
			this.rgbLedStripService = rgbLedStripService;

			this.log("RgbLedStrip has been successfully initialized!");

			return [informationService, rgbLedStripService];
		}else{
			this.log("RgbLedStrip has not been initialized, please check your logs.");
			return [];
		}

  },
  
	getToggleState : function(characteristicName){
		switch(characteristicName){
			case "on":
				return this.on
			case "brightness":
				return this.brightness
			case "hue":
				return this.hue
			case "saturation":
				return this.saturation
		}
	},
	
	setToggleState : function(characteristicName, value){
		switch(characteristicName){
			case "on":
				this.on = value
				break
			case "brightness":
				this.brightness = value
				break
			case "hue":
				this.hue = value
				break
			case "saturation":
				this.saturation = value
				break
		}
		this.log(characteristicName)
		if(!this.on){
			this.updateRGB(0,0,0)
			return
		}
		var rgb = converter.hsv.rgb([this.hue, this.saturation, this.brightness])
		this.updateRGB(rgb[0], rgb[1], rgb[2])
	},

	updateRGB : function(red, green, blue){

		var dataValue = blue + "\",\"" + green + "\",\"" + red;
		fetch("http://" + this.ip + ":8080/" + this.token + "/update/V" + this.vpin + "?value=" + dataValue)
			.then((response) => {  
				if (response.ok === false) {
					throw new Error(`Status code (${response.status})`)
				}
			})
				.catch((error) => {
					this.log.error(`Request to webhook failed. (${path})`)
					this.log.error(error);
			});

		this.log("Setting RGB values to: Red: "+red + " Green: "+green+ " Blue: "+blue)

	}
}

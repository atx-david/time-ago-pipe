var expect = require('chai').expect;
var sinon = require('sinon');
import {NgZone} from '@angular/core';
import {TimeAgoPipe} from "../time-ago.pipe";

class NgZoneMock {
	runOutsideAngular (fn: Function) {
		return fn();
	}
	run(fn: Function) {
		return fn();
	}
};

describe('time-ago-pipe', () => {
	const now:Date = new Date();
	var clock:any;
	const oneSec = 1000;
	const oneMin = oneSec * 60;
	const oneHour = oneMin * 60;
	const oneDay = oneHour * 24;
	const oneMonth = oneDay * 30.416; // approximation 365/12
	beforeEach(() => {
		clock = sinon.useFakeTimers(now.getTime());
	});
	afterEach(() => {
		clock.restore();
	});
	describe('output tests', function () {
		let pipe = new TimeAgoPipe(null, new NgZoneMock() as NgZone);
		it('\'a few seconds ago\' tests', () => {
			var pastDate = new Date();
			for (let i =0; i < 45; i++){
				clock.tick(oneSec);
				if (i < 44) {
					expect(pipe.transform(pastDate.toString())).to.equal('1m');
				}
			}
		});
		it('\'a minute ago\' tests', () => {
			var pastDate = new Date();
			clock.tick(oneSec * 45);
			for (let i =45; i < 89; i++){
				clock.tick(oneSec);
				if (i < 89){
					expect(pipe.transform(pastDate.toString())).to.equal('1m');
				} else {
					expect(pipe.transform(pastDate.toString())).not.to.equal('1m');
				}
			}
		});
		it('\'x minutes ago\' tests', () => {
			var pastDate = new Date();
			clock.tick(oneSec * 50);
			for (let i =1; i < 44; i++){
				clock.tick(oneMin);
				if (i < 44){
					expect(pipe.transform(pastDate.toString())).to.equal(i+1 + 'm');
				} else {
					expect(pipe.transform(pastDate.toString())).not.to.equal(i+1 + 'm');
				}
			}
		});
		it('\'an hour ago\' tests', () => {
			var pastDate = new Date();
			//set the time forward 45 mins
			clock.tick(oneMin * 45);
			for (let i =45; i < 120; i++){
				clock.tick(oneMin);
				if (i < 90){
					expect(pipe.transform(pastDate.toString())).to.equal('1h');
				} else {
					expect(pipe.transform(pastDate.toString())).not.to.equal('1h');
				}
			}
		});
		it('\'x hours ago\' tests', () => {
			var pastDate = new Date();
			//set the time forward 50 mins
			clock.tick(oneMin * 50);
			for (let i = 1; i < 25; i++){
				clock.tick(oneHour);
				if (i < 22){
					expect(pipe.transform(pastDate.toString())).to.equal(i+1 + 'h');
				} else {
					expect(pipe.transform(pastDate.toString())).not.to.equal(i+1 + 'h');
				}
			}
		});
		it('\'a day ago\' tests', () => {
			var pastDate = new Date();
			clock.tick(oneHour * 22);
			for (let i = 22; i < 40; i++){
				clock.tick(oneHour);
				if (i < 36){
					expect(pipe.transform(pastDate.toString())).to.equal('1d');
				} else {
					expect(pipe.transform(pastDate.toString())).not.to.equal('1d');
				}
			}
		});
		it('\'x days ago\' tests', () => {
			var pastDate = new Date();
			clock.tick(oneHour * 35);
			for (let i = 1; i < 30; i++){
				clock.tick(oneDay);
				if (i < 25){
					expect(pipe.transform(pastDate.toString())).to.equal(i+1 + 'd');
				} else {
					expect(pipe.transform(pastDate.toString())).not.to.equal(i+1 + 'd');
				}
			}
		});
		it('\'a month ago\' tests', () => {
			var pastDate = new Date();
			clock.tick(oneDay * 25);
			for (let i = 25; i < 50; i++){
				clock.tick(oneDay);
				if (i < 45){
					expect(pipe.transform(pastDate.toString())).to.equal('1M');
				} else {
					expect(pipe.transform(pastDate.toString())).not.to.equal('1M');
				}
			}
		});
		it('\'x month ago\' tests', () => {
			var pastDate = new Date();
			clock.tick(oneDay * 43);
			for (let i = 1; i < 13; i++){
				clock.tick(oneMonth);
				if (i < 10){
					expect(pipe.transform(pastDate.toString())).to.equal(i +1 + 'M');
				} else {
					expect(pipe.transform(pastDate.toString())).not.to.equal(i +1 + 'M');
				}
			}
		});
		it('\'a year ago\' tests', () => {
			var pastDate = new Date();
			clock.tick(oneDay * 345);
			for (let i = 345; i < 545; i++){
				clock.tick(oneDay);
				if (i < 545){
					expect(pipe.transform(pastDate.toString())).to.equal('1j');
				} else {
					expect(pipe.transform(pastDate.toString())).not.to.equal('1j');
				}
			}
		});
		it('\'a year ago\' tests', () => {
			var pastDate = new Date();
			clock.tick(oneMonth * 22);
			expect(pipe.transform(pastDate.toString())).to.equal(2 + 'j');
			clock.tick(oneMonth * 12);
			expect(pipe.transform(pastDate.toString())).to.equal(3 + 'j');
			clock.tick(oneMonth * 36);
			expect(pipe.transform(pastDate.toString())).to.equal(6 + 'j');
		});
	});
});

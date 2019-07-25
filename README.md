# time-ago-pipe

[![Build Status](https://travis-ci.org/AndrewPoyntz/time-ago-pipe.svg?branch=master)](https://travis-ci.org/AndrewPoyntz/time-ago-pipe) [![npm](https://img.shields.io/npm/v/time-ago-pipe.svg)](https://www.npmjs.com/package/time-ago-pipe) [![npm](https://img.shields.io/npm/dt/time-ago-pipe.svg?maxAge=25920)](https://www.npmjs.com/package/time-ago-pipe) [![GitHub issues](https://img.shields.io/github/issues/AndrewPoyntz/time-ago-pipe.svg?maxAge=25920?style=plastic)](https://github.com/AndrewPoyntz/time-ago-pipe/issues) [![npm](https://img.shields.io/npm/l/time-ago-pipe.svg?maxAge=25920?style=plastic)](https://github.com/AndrewPoyntz/time-ago-pipe/blob/master/LICENSE)

A really simple, lightweight Angular pipe for converting a date string into
a time ago

|Time Range|Output|
|---|---|
|0 - 45 seconds             | 1m      |
|45 - 90 seconds            | 1m           |
|90 seconds - 45 minutes    | Xm          |
|45 - 90 minutes            | 1h            |
|90 minutes - 22 hours      | Xh            |
|22 - 36 hours              | 1d              |
|36 hours - 25 days         | Xd             |
|25 - 45 days               | 1M            |
|45 - 345 days              | XM           |
|345 - 545 days (1.5 years) | 1j             |
|546 days+                  | Xj            |

## Installation

```
npm install time-ago-pipe --save
```

_For Angular versions < 6 you need to choose a 1.x version of this module._

## Usage

It can be imported into your angular project, as you would for any other library.

In the @NgModule you want to use it in

```
import {TimeAgoPipe} from 'time-ago-pipe';
```

add "TimeAgoPipe" to your declarations

```
@NgModule({
   imports: [... etc ...],
   declarations: [..., TimeAgoPipe, ... ]
})
```

---

In your component templates you can just do:

```
<span>{{your_date | timeAgo}}</span>
```

where "your_date" is a local date string, which could be parsed by the standard
Js Date()

If this value is null or not parsable as a date, then the pipe will display nothing

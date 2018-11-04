import {fromEvent, interval, merge} from 'rxjs'
import {audit, auditTime, mapTo, scan, startWith, switchMapTo, takeUntil, tap} from "rxjs/operators";


const startBtn = document.getElementById('start')
const stopBtn = document.getElementById('stop')
const resetBtn = document.getElementById('reset')

const stopClick = fromEvent(stopBtn, 'click');
const startClick = fromEvent(startBtn, 'click');
const resetClick = fromEvent(resetBtn, 'click');

const inc = (n: number): number => n + 1
const reset = () => 0


startClick
  .pipe(
    switchMapTo(
      merge(
        interval(200).pipe(takeUntil(stopClick), tap(console.log), mapTo(inc)),
        resetClick.pipe(mapTo(reset))
      )
    ),
    startWith(0),
    scan((s: number, func: (n: number) => number) => func(s))
  )

  .subscribe(console.log)


startClick.pipe(auditTime(2000))
  .subscribe(()=>console.log(Date.now()))

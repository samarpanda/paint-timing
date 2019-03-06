const LOAD_COMPLETE = 'complete';
let callbacks = [];
let listenerAdded = false;
let pTimingArr = [];
let fp = 0, fcp = 0;

export function onPaintCaptured(callback){
  callbacks.push(callback);
  reportPaintTimings();
}

function initCalculate(){
  if(paintTimingIsSupported()){
    pTimingArr = p.getEntriesByType('paint');
    fp = pTimingArr[0].startTime;
    fcp = pTimingArr[0].startTime;
  }

  if(listenerAdded){
    w.removeEventListener('load', initCalculate);
  }
  reportPaintTimings();
}

function paintTimingIsSupported(){
  return 'performance' in w
      && 'PerformancePaintTiming' in w 
      && p.getEntriesByType('paint').length > 0;
}

function reportPaintTimings(){
  if(pTimingArr.length > 0){
    callbacks.forEach((callback) => {
      callback(fp, fcp, pTimingArr);
    });
    callbacks = [];
  }
}

if(d.readyState !== undefined && d.readyState === LOAD_COMPLETE){
  initCalculate();
}else{
  listenerAdded = true
  w.addEventListener('load', initCalculate)
}

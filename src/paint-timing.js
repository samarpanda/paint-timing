(function(){
  var LOAD_COMPLETE = 'complete';
  var callbacks = [];
  var listenerAdded = false;

  var pTimingArr = [];
  var fp = 0;
  var fcp = 0;

  function onPtCaptured(callback){
    callbacks.push(callback);
    reportPaintTimings()
  }

  function initCalculate(){
    if(paintTimingIsSupported()){
      pTimingArr = performance.getEntriesByType('paint');
      fp = pTimingArr[0].startTime;
      fcp = pTimingArr[0].startTime;
    }

    if(listenerAdded)
      window.removeEventListener('load', initCalculate)

    reportPaintTimings();
  }

  function paintTimingIsSupported(){
    return 'performance' in window 
      && 'PerformancePaintTiming' in window 
      && performance.getEntriesByType('paint').length > 0;
  }

  function reportPaintTimings(){
    if(pTimingArr.length > 0){
      callbacks.forEach(function(callback){
        callback(fp, fcp, pTimingArr)
      });
      callbacks = []
    }
  }

  if(document.readyState !== undefined && document.readyState === LOAD_COMPLETE){
    initCalculate();
  }else{
    listenerAdded = true
    window.addEventListener('load', initCalculate)
  }

  self['perfMetrics'] = self['perfMetrics'] || {};
  self['perfMetrics']['onPtCaptured'] = onPtCaptured;
}())

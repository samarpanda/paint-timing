# Browser Performance Paint Timing
JavaScript library for measuring Paint Timings in the browser that supports.

## Usage 

```js
perfMetrics.onPtCaptured(function(fp, fcp, tArr){
  console.log(`FP: ${fp}, FCP: ${fcp}`)
  console.log(tArr)
})
```
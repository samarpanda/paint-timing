# Paint Timing API

## Usage 

```js
perfMetrics.onPtCaptured(function(fp, fcp, tArr){
  console.log(`FP: ${fp}, FCP: ${fcp}`)
  console.log(tArr)
})
```
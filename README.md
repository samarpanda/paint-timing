# Browser Performance Paint Timing
JavaScript library for measuring Paint Timings in the browser that supports.

## Usage 

1. Using import

```html
<script type="module" src="./src/paint-timing.js"></script>
<script>
import {onPaintCaptured} from './src/paint-timing';
onPaintCaptured((fp, fcp, pta) => {
  console.log(fp, fcp, pta);
});
</script>
```

2. With global variable

```html
<script type="text/javascript" src="src/pt.js" /><script>
<script>
perfMetrics.onPtCaptured(function(fp, fcp, tArr){
  console.log(`FP: ${fp}, FCP: ${fcp}`)
  console.log(tArr)
})
</script>
```

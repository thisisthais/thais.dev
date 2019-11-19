this gives a pretty nice reflective lighting

```
float lightDirection = acos(dot(lightVector, Normal)/length(viewVector)*length(Normal));
```

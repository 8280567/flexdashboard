---
title: "Text Annotations"
output: 
  flexdashboard::flex_dashboard:
    fill_page: true
    orientation: rows
---

Monthly deaths from bronchitis, emphysema and asthma in the UK, 1974–1979.
    
```{r setup, include=FALSE}
library(dygraphs)
```

Row
-------------------------------------

### All Lung Deaths
    
```{r, fig.width=10, fig.height=6}
dygraph(ldeaths)
```
    
Source: P. J. Diggle (1990) Time Series: A Biostatistical Introduction. Oxford, table A.3    
 
Row
-------------------------------------

### Male Deaths

```{r}
dygraph(mdeaths)
```
   
Note: Includes only male deaths
   
### Female Deaths

```{r}
dygraph(mdeaths)
```
   
Note: Includes only female deaths

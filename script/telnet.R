library(vroom)
library(dplyr)
library(purrr)

hex2string <- function(s) {
if (is.na(s)) {return(NA)}
h <- sapply(seq(1, nchar(s), by=2), function(x) substr(s, x, x+1))
rawToChar(as.raw(strtoi(h, 16L)))
}

df <- "capture/df.csv" %>%
vroom() %>%
mutate(data = map_chr(data, hex2string))
